export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDonation } from '@/lib/db'
import { formatCurrency } from '@/lib/data'
import { Award, ArrowLeft, ShieldCheck } from 'lucide-react'
import { PrintButton } from '@/components/print-button'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function CertificatePage({ params }: PageProps) {
  const { id } = await params
  const donation = getDonation(id)

  if (!donation) {
    notFound()
    return null
  }

  const formattedDate = new Date(donation.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-secondary/15 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans">
      
      {/* Action Header (Hidden during Print) */}
      <div className="no-print w-full max-w-4xl mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-2xl border border-border shadow-sm">
        <Link
          href={`/campaigns/${donation.campaignSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to Campaign
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden md:inline">
            Fit: A4 Landscape (Print or Save as PDF)
          </span>
          <PrintButton />
        </div>
      </div>

      {/* Certificate Frame Outer Container */}
      <div className="certificate-container w-full max-w-4xl aspect-[1.414/1] bg-card p-8 sm:p-12 shadow-xl ring-1 ring-border rounded-lg relative overflow-hidden flex flex-col justify-between border-8 border-double border-amber-600/35">
        
        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 size-12 border-t-2 border-l-2 border-amber-600/40" />
        <div className="absolute top-2 right-2 size-12 border-t-2 border-r-2 border-amber-600/40" />
        <div className="absolute bottom-2 left-2 size-12 border-b-2 border-l-2 border-amber-600/40" />
        <div className="absolute bottom-2 right-2 size-12 border-b-2 border-r-2 border-amber-600/40" />

        {/* Certificate Inner Border */}
        <div className="border border-amber-600/20 w-full h-full p-6 sm:p-8 flex flex-col justify-between relative">
          
          {/* Header block */}
          <div className="text-center space-y-2.5">
            <div className="flex items-center justify-center gap-2">
              <Award className="size-10 text-amber-600 stroke-[1.5]" />
              <span className="font-heading text-xl font-black tracking-widest text-foreground">HFS</span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-brand">Help For Smile Foundation</p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent mx-auto mt-2" />
          </div>

          {/* Main certificate contents body */}
          <div className="text-center space-y-4 my-auto">
            <h1 className="font-serif italic text-3xl sm:text-4xl text-amber-800 font-extrabold tracking-wide">
              Certificate of Appreciation
            </h1>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
              This certificate is proudly presented to
            </p>
            
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-foreground underline decoration-amber-600/35 decoration-double underline-offset-8">
                {donation.donorName}
              </h2>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty pt-2">
              in grateful recognition of a generous donation of{' '}
              <span className="font-black text-foreground">{formatCurrency(donation.amount)}</span> supporting the{' '}
              <span className="font-bold text-foreground">"{donation.campaignTitle}"</span> campaign. Your contribution directly funds sustainable development and brings hope to rural communities in India.
            </p>
          </div>

          {/* Verification, Stamp and Signature bottom panel */}
          <div className="grid grid-cols-3 items-end pt-6 border-t border-border/40 text-center text-xs">
            
            {/* Left signature block */}
            <div className="flex flex-col items-center space-y-1.5">
              {/* Calligraphic SVG signature */}
              <div className="text-brand opacity-85 select-none h-12 flex items-center justify-center">
                <svg viewBox="0 0 200 60" className="w-32 h-10 text-amber-800">
                  <path
                    d="M 15,38 C 35,15 48,12 58,32 C 68,52 88,18 102,28 C 116,38 128,22 138,27 C 148,32 158,12 172,25 M 25,28 L 165,28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-28 h-[1px] bg-border/80" />
              <p className="font-bold text-foreground text-[10px]">Saroj Padhi</p>
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Director, HFS</p>
            </div>

            {/* Middle: Government of India Stamp */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-blue-800 opacity-80 select-none">
                <svg viewBox="0 0 120 120" className="w-20 h-20">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,2" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="60" cy="60" r="37" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path id="stamp-text-path-top" d="M 23,60 A 37,37 0 1,1 97,60" fill="none" stroke="none" />
                  <path id="stamp-text-path-bottom" d="M 97,60 A 37,37 0 1,1 23,60" fill="none" stroke="none" />
                  <text className="text-[6.5px] fill-current font-black tracking-widest">
                    <textPath href="#stamp-text-path-top" startOffset="50%" textAnchor="middle">
                      GOVERNMENT OF INDIA
                    </textPath>
                  </text>
                  <text className="text-[5.5px] fill-current font-black tracking-wider">
                    <textPath href="#stamp-text-path-bottom" startOffset="50%" textAnchor="middle">
                      • REGISTRATION APPROVED •
                    </textPath>
                  </text>
                  <g transform="translate(60,60)">
                    <circle cx="0" cy="0" r="9" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M -9,0 L 9,0 M 0,-9 L 0,9 M -6,-6 L 6,6 M -6,6 L 6,-6" stroke="currentColor" strokeWidth="0.5" />
                  </g>
                </svg>
              </div>
              <p className="text-[8px] text-muted-foreground uppercase tracking-widest mt-1">Govt. Seal</p>
            </div>

            {/* Right: Validation & Exemption ID */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="h-12 flex flex-col justify-center items-center text-emerald-600 space-y-1 select-none">
                <ShieldCheck className="size-5" />
                <span className="text-[8px] font-bold tracking-widest uppercase">Secured Verification</span>
              </div>
              <div className="w-28 h-[1px] bg-border/80" />
              <p className="font-bold font-mono text-foreground text-[8.5px] uppercase tracking-wider">{donation.id}</p>
              <p className="text-[8px] text-muted-foreground uppercase tracking-wider">Date: {formattedDate}</p>
            </div>

          </div>

        </div>
      </div>

      {/* Dynamic print-specific styles to format certificate on standard A4 Landscape */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .certificate-container {
            width: 100% !important;
            max-width: none !important;
            border: 8px double rgba(217, 119, 6, 0.4) !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 2.5rem !important;
            aspect-ratio: 1.414/1 !important;
            border-radius: 0 !important;
            ring: 0 !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
        }
        @page {
          size: A4 landscape;
          margin: 0;
        }
      ` }} />

    </div>
  )
}
