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
    // Fetch reports and join with the resources table to get title, description, and file_url
    const { data: reports, error } = await supabase
      .from('reports')
      .select(
        `
        *,
        resources(title, description, file, created_at)
        `
      )
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reports:', error)
      return NextResponse.json({ error: `Failed to fetch reports: ${error.message}` }, { status: 500 })
    }

    if (!reports || reports.length === 0) {
      return NextResponse.json({ error: 'No reports found' }, { status: 404 })
    }

    // Map the data to a flattened structure expected by the frontend
    const formattedReports = reports.map(report => ({
      ...report,
      title: report.resources?.title || '',
      description: report.resources?.description || '',
      file: report.resources?.file || '',
      created_at: report.resources?.created_at || '',
    }));

    return NextResponse.json(formattedReports)
  } catch (error) {
    console.error('Unexpected error in reports API:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 