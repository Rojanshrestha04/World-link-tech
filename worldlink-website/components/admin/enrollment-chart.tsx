"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Nov",
    total: 45,
  },
  {
    name: "Dec",
    total: 38,
  },
  {
    name: "Jan",
    total: 52,
  },
  {
    name: "Feb",
    total: 61,
  },
  {
    name: "Mar",
    total: 48,
  },
  {
    name: "Apr",
    total: 68,
  },
]

export default function EnrollmentChart() {
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
