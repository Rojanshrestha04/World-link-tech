"use client"

import { Button } from "@/components/ui/button"

interface ActionButtonProps {
  label: string
  onClick: () => void
}

export default function ActionButton({ label, onClick }: ActionButtonProps) {
  return (
    <Button onClick={onClick} className="mt-0">
      {label}
    </Button>
  )
} 