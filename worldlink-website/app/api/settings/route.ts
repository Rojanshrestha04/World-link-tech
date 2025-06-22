import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function GET() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('general_settings')
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerClient();
  const body = await req.json();

  // Assume only one row in general_settings, update by id=1
  const { data, error } = await supabase
    .from('general_settings')
    .update({
      site_name: body.site_name,
      site_description: body.site_description,
      contact_email: body.contact_email,
      contact_phone: body.contact_phone,
      address: body.address,
    })
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
