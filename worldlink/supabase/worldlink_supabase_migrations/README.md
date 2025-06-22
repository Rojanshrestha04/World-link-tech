# Worldlink Website - Supabase Database Setup

This package contains organized SQL files for setting up the Worldlink Technical Training Institute database in Supabase.

## 📁 File Structure

### Core Migration Files (Run in Order):
1. **01_create_and_alter_tables.sql** - Creates all database tables and structures
2. **02_insert_values.sql** - Inserts initial data and sample content
3. **03_indexes_and_triggers.sql** - Creates indexes for performance and triggers for automation
4. **04_rls_policies.sql** - Sets up Row Level Security policies for data protection
5. **05_additional_functions_views.sql** - Creates utility functions and views

## 🚀 Installation Instructions

### Step 1: Prepare Your Supabase Project
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Make sure you have admin access

### Step 2: Run Migration Files in Order
Execute the files in the following sequence:

```sql
-- 1. First, create all tables
-- Run: 01_create_and_alter_tables.sql

-- 2. Insert initial data
-- Run: 02_insert_values.sql

-- 3. Create indexes and triggers
-- Run: 03_indexes_and_triggers.sql

-- 4. Set up security policies
-- Run: 04_rls_policies.sql

-- 5. Add utility functions and views
-- Run: 05_additional_functions_views.sql
```

### Step 3: Create Admin User
After running all migrations, create your admin user:

1. Sign up a user through your app's authentication
2. Get the user's UUID from the `auth.users` table
3. Run this SQL to make them admin:

```sql
UPDATE public.users 
SET role = 'admin', full_name = 'Your Name'
WHERE email = 'your-admin-email@example.com';
```

## 📊 Database Schema Overview

### Core Tables:
- **users** - User accounts and roles
- **courses** - Training courses and programs
- **news_articles** - News and announcements
- **gallery_images** - Photo gallery
- **testimonials** - Student testimonials
- **contact_submissions** - Contact form submissions
- **application_submissions** - Course applications
- **careers** - Job postings
- **inquiries** - General inquiries
- **general_settings** - Site configuration

### Resource Management:
- **resources** - Parent table for documents
- **publications** - Academic publications
- **policies** - Institutional policies
- **reports** - Annual reports
- **curriculums** - Course curriculums

## 🔒 Security Features

### Row Level Security (RLS):
- ✅ Public users can read published content
- ✅ Authenticated users can manage their own data
- ✅ Admin users have full access to all data
- ✅ Anonymous users can submit forms (contact, applications)

### Key Security Policies:
- Users can only read/update their own profile
- Only admins can manage courses, news, and settings
- Public content is readable by everyone
- Form submissions are protected but allow anonymous access

## 🔧 Key Features

### Automated Functions:
- **Slug Generation** - Automatic URL-friendly slugs for courses and news
- **Timestamp Updates** - Auto-updating `updated_at` fields
- **Published Date** - Auto-set when content is published

### Performance Optimizations:
- Comprehensive indexing on frequently queried columns
- Optimized queries for public-facing content
- Efficient foreign key relationships

### Utility Functions:
- `is_admin()` - Check if user is admin
- `get_user_role()` - Get user's role
- `create_slug()` - Generate URL-friendly slugs
- `count_courses_by_category()` - Course statistics
- `get_featured_content()` - Get all featured content

## 📈 Views Available:
- `active_courses_view` - Active courses with enrollment info
- `published_news_view` - Published news with author details
- `contact_submissions_summary` - Contact form statistics
- `applications_with_course_info` - Applications with course details
- `resources_detailed_view` - Resources with type information

## ⚠️ Important Notes

### Before Running:
1. **Backup** your existing database if you have one
2. **Review** each SQL file to understand what it does
3. **Test** in a development environment first

### After Running:
1. **Verify** all tables are created correctly
2. **Test** the RLS policies with different user roles
3. **Check** that sample data is inserted properly

### Security Considerations:
- The RLS policies are designed to be secure by default
- Admin users have full access - be careful who you grant admin role
- Form submissions allow anonymous access for public forms
- All sensitive operations require authentication

## 🐛 Troubleshooting

### Common Issues:
1. **Permission Denied**: Make sure you're running as a superuser in Supabase
2. **Table Already Exists**: The scripts use `IF NOT EXISTS` to prevent conflicts
3. **Foreign Key Errors**: Run the files in the correct order
4. **RLS Policy Conflicts**: The scripts drop existing policies before creating new ones

### Getting Help:
- Check the Supabase logs for detailed error messages
- Verify your user has the correct permissions
- Make sure all dependencies are installed

## 📝 Customization

### Adding New Tables:
1. Add CREATE TABLE statement to `01_create_and_alter_tables.sql`
2. Add indexes to `03_indexes_and_triggers.sql`
3. Add RLS policies to `04_rls_policies.sql`
4. Add sample data to `02_insert_values.sql` if needed

### Modifying Policies:
- Edit `04_rls_policies.sql` to change access permissions
- Test thoroughly with different user roles
- Consider the security implications of any changes

## 🎯 Next Steps

After successful installation:
1. Configure your application to use these tables
2. Set up your authentication flow
3. Test all CRUD operations with different user roles
4. Customize the sample data for your needs
5. Set up regular backups

---

**Created for Worldlink Technical Training Institute**
*Database schema optimized for educational institution management*
