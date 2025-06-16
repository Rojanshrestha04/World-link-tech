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
    // Fetch policies and join with the resources table to get title, description, and file_url
    const { data: policies, error } = await supabase
      .from('policies')
      .select(
        `
        *,
        resources(title, description, file, created_at)
        `
      )
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching policies:', error)
      return NextResponse.json({ error: `Failed to fetch policies: ${error.message}` }, { status: 500 })
    }

    if (!policies || policies.length === 0) {
      return NextResponse.json({ error: 'No policies found' }, { status: 404 })
    }

    // Map the data to a flattened structure expected by the frontend
    const formattedPolicies = policies.map(policy => ({
      ...policy,
      title: policy.resources?.title || '',
      description: policy.resources?.description || '',
      file: policy.resources?.file || '',
      created_at: policy.resources?.created_at || '',
    }));

    return NextResponse.json(formattedPolicies)
  } catch (error) {
    console.error('Unexpected error in policy API:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 