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
    // First check if we can connect to Supabase
    const { data: testData, error: testError } = await supabase
      .from('news_articles')
      .select('count')
      .limit(1)
      .maybeSingle()

    if (testError) {
      console.error('Supabase connection error:', testError)
      return NextResponse.json(
        { error: `Database connection error: ${testError.message}` },
        { status: 500 }
      )
    }

    // If connection is successful, fetch the news
    const { data: news, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching news:', error)
      return NextResponse.json(
        { error: `Failed to fetch news from database: ${error.message}` },
        { status: 500 }
      )
    }

    if (!news || news.length === 0) {
      return NextResponse.json(
        { error: 'No news articles found' },
        { status: 404 }
      )
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error('Unexpected error in news API:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 