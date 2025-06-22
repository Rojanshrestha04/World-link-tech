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
    const { data: resources, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching resources:', error)
      return NextResponse.json({ error: error.message ? `Failed to fetch resources: ${error.message}` : 'Failed to fetch resources.' }, { status: 500 })
    }

    return NextResponse.json(resources)
  } catch (error) {
    console.error('Error in resources API:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('resources')
      .insert([body])
      .select()
      .single();
    if (error) {
      console.error('Error adding resource:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Resource created successfully', data });
  } catch (error) {
    console.error('Error in POST /resources:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Missing resource id' }, { status: 400 });
    }
    const { id, ...updateData } = body;
    const { data, error } = await supabase
      .from('resources')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      console.error('Error updating resource:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Resource updated successfully', data });
  } catch (error) {
    console.error('Error in PUT /resources:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Missing resource id' }, { status: 400 });
    }
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', body.id);
    if (error) {
      console.error('Error deleting resource:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /resources:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
} 