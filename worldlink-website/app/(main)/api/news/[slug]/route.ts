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

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { data: news, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('slug', params.slug)
      .single()

    if (error) {
      console.error('Error fetching news:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch news' }, { status: 500 })
    }

    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error in news API:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 })
  }
} 