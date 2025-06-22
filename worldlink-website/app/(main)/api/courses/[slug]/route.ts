import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { data: course, error } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', params.slug)
      .eq('is_active', true)
      .maybeSingle()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch course' }, { status: 500 })
    }

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 