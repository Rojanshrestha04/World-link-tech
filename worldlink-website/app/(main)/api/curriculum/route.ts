import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Check if environment variables are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false
    }
  }
)

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch curriculums and join with the resources table to get title, description, and file_url
    const { data: curriculums, error } = await supabase
      .from('curriculums')
      .select(
        `
        *,
        resources(title, description, file, created_at)
        `
      )
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching curriculums:', error)
      return NextResponse.json({ error: `Failed to fetch curriculums: ${error.message}` }, { status: 500 })
    }

    if (!curriculums || curriculums.length === 0) {
      return NextResponse.json({ error: 'No curriculums found' }, { status: 404 })
    }

    // Map the data to a flattened structure expected by the frontend
    const formattedCurriculums = curriculums.map(curriculum => ({
      ...curriculum,
      title: curriculum.resources?.title || '',
      description: curriculum.resources?.description || '',
      file: curriculum.resources?.file || '',
      created_at: curriculum.resources?.created_at || '',
    }));

    return NextResponse.json(formattedCurriculums)
  } catch (error) {
    console.error('Unexpected error in curriculums API:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 