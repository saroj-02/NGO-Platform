'use client'

import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <Button
      onClick={() => window.print()}
      className="bg-brand text-brand-foreground hover:bg-brand/90 font-bold text-xs"
    >
      <Printer className="mr-1.5 size-4" /> Print / Save PDF
    </Button>
  )
}
