# WorldLink Website

A modern web application built with Next.js 15, featuring a robust UI component library and Supabase integration.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15 and React 19
- **UI Components**: Comprehensive set of accessible components using Radix UI
- **Authentication**: Secure authentication system powered by Supabase
- **Styling**: Tailwind CSS for modern, responsive design
- **Form Handling**: React Hook Form with Zod validation
- **Theme Support**: Dark/Light mode support with next-themes
- **Type Safety**: Full TypeScript support

## 📦 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Supabase account and project

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd worldlink-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_role_key
```

## 🚀 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

The project uses a modern Next.js structure with the following key features:

- `/app` - Next.js 13+ app directory for routing and pages
- `/components` - Reusable UI components
- `/lib` - Utility functions and shared logic
- `/public` - Static assets

## 🔧 Key Dependencies

- **Framework**: Next.js 15.2.4
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

For support, please open an issue in the repository or contact the maintainers. 