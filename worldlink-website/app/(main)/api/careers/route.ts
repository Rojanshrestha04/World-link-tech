import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Check if environment variables are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
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
);

export const dynamic = 'force-dynamic'

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function GET() {
  try {
    // Test connection
    const { data: testData, error: testError } = await supabase
      .from('careers')
      .select('id')
      .limit(1)
      .maybeSingle();
    if (testError) {
      console.error('Supabase connection error:', testError);
      return NextResponse.json(
        { error: `Database connection error: ${testError.message}` },
        { status: 500 }
      );
    }
    // Fetch all careers
    const { data: careers, error } = await supabase
      .from('careers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching careers:', error);
      return NextResponse.json(
        { error: `Failed to fetch careers from database: ${error.message}` },
        { status: 500 }
      );
    }
    if (!careers || careers.length === 0) {
      return NextResponse.json(
        { error: 'No careers found' },
        { status: 404 }
      );
    }
    return NextResponse.json(careers);
  } catch (error) {
    console.error('Unexpected error in careers API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      company,
      location,
      employment_type,
      experience_level,
      salary_range,
      description,
      requirements,
      responsibilities,
      benefits,
      application_deadline,
      contact_email,
      status = 'active',
      featured = false,
      remote_work = false,
      posted_date,
      contact_phone,
      skills_required = [],
    } = body;

    if (!title || !company || !location || !employment_type || !experience_level || !description || !contact_email) {
      return NextResponse.json({ error: 'Missing required fields: title, company, location, employment_type, experience_level, description, contact_email are required.' }, { status: 400 });
    }

    const slug = slugify(title);
    const job_type = employment_type;
    const now = new Date();
    const created_at = now.toISOString();
    const updated_at = created_at;
    const post_date = posted_date || now.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('careers')
      .insert([
        {
          title,
          slug,
          company,
          location,
          job_type,
          experience_level,
          salary_range,
          description,
          requirements: requirements || [],
          responsibilities: responsibilities || [],
          benefits: benefits || [],
          skills_required,
          application_deadline: application_deadline || null,
          contact_email,
          contact_phone: contact_phone || null,
          status,
          featured,
          remote_work,
          posted_date: post_date,
          created_at,
          updated_at,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Career created successfully',
      data
    }, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      company,
      location,
      employment_type,
      experience_level,
      salary_range,
      description,
      requirements,
      responsibilities,
      benefits,
      application_deadline,
      contact_email,
      status,
      featured,
      remote_work,
      posted_date,
      contact_phone,
      skills_required,
      is_active
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing career id' }, { status: 400 });
    }

    // Fetch existing career
    const { data: existing, error: fetchError } = await supabase
      .from('careers')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: 'Career not found' }, { status: 404 });
    }

    // Prepare update data by merging existing data with updates
    const updateData = {
      ...existing,
      title: title || existing.title,
      company: company || existing.company,
      location: location || existing.location,
      job_type: employment_type || existing.job_type,
      experience_level: experience_level || existing.experience_level,
      salary_range: salary_range || existing.salary_range,
      description: description || existing.description,
      requirements: requirements || existing.requirements,
      responsibilities: responsibilities || existing.responsibilities,
      benefits: benefits || existing.benefits,
      application_deadline: application_deadline || existing.application_deadline,
      contact_email: contact_email || existing.contact_email,
      contact_phone: contact_phone || existing.contact_phone,
      status: status || existing.status,
      featured: featured !== undefined ? featured : existing.featured,
      remote_work: remote_work !== undefined ? remote_work : existing.remote_work,
      posted_date: posted_date || existing.posted_date,
      skills_required: skills_required || existing.skills_required,
      is_active: is_active !== undefined ? is_active : existing.is_active,
      updated_at: new Date().toISOString()
    };

    // Update slug only if title changed
    if (title && title !== existing.title) {
      updateData.slug = slugify(title);
    }

    const { data, error } = await supabase
      .from('careers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Career updated successfully',
      data
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing career id' }, { status: 400 });
    }
    const { error } = await supabase
      .from('careers')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Career deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
} 