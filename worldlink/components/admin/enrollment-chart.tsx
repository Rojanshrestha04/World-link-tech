"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { getSupabaseBrowserClient } from "@/lib/supabase"

interface EnrollmentData {
  name: string;
  total: number;
}

export default function EnrollmentChart() {
  const [data, setData] = useState<EnrollmentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEnrollmentData() {
      const supabase = getSupabaseBrowserClient()
      
      try {
        // Get the last 6 months of enrollment data
        const { data: enrollments, error } = await supabase
          .from('application_submissions') // Changed from 'applications' to 'application_submissions'
          .select('created_at')
          .gte('created_at', new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString())
          .order('created_at', { ascending: true })

        if (error) throw error

        // Process the data to group by month
        const monthlyData = new Map<string, number>()
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        enrollments?.forEach(enrollment => {
          const date = new Date(enrollment.created_at)
          const monthKey = months[date.getMonth()]
          monthlyData.set(monthKey, (monthlyData.get(monthKey) || 0) + 1)
        })

        // Convert to array format for the chart
        const chartData = Array.from(monthlyData.entries()).map(([name, total]) => ({
          name,
          total
        }))

        setData(chartData)
      } catch (error) {
        console.error('Error fetching enrollment data:', error)
        // Set empty data if there's an error
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollmentData()
  }, [])

  if (loading) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        <p className="text-muted-foreground">No enrollment data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
