export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDonation } from '@/lib/db'
import { formatCurrency } from '@/lib/data'
import { Mail, ArrowLeft, ArrowUpRight } from 'lucide-react'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function EmailPreviewPage({ params }: PageProps) {
  const { id } = await params
  const donation = getDonation(id)

  if (!donation) {
    notFound()
    return null
  }

  const formattedDate = new Date(donation.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="min-h-screen bg-secondary/15 py-8 px-4 flex flex-col items-center justify-center font-sans">
      
      {/* Back navigation header */}
      <div className="w-full max-w-2xl mb-4 flex items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <Link
          href={`/campaigns/${donation.campaignSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to Campaign
        </Link>
        <span className="text-xs font-semibold text-brand flex items-center gap-1.5">
          <Mail className="size-4 animate-pulse" /> Receipt Email Preview
        </span>
      </div>

      {/* Simulated Email Client Frame */}
      <div className="w-full max-w-2xl bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
        
        {/* Email Headers Section */}
        <div className="bg-secondary/45 border-b border-border/80 p-5 space-y-2 text-xs">
          <div className="flex justify-between border-b border-border/40 pb-2">
            <span className="text-muted-foreground font-medium w-16">Subject:</span>
            <span className="text-foreground font-bold flex-1 truncate">
              Thank you for your donation to HFS — Receipt #{donation.id}
            </span>
          </div>
          <div className="flex justify-between border-b border-border/40 pb-2">
            <span className="text-muted-foreground font-medium w-16">From:</span>
            <span className="text-foreground font-semibold flex-1">
              HFS Donations Desk &lt;donations@helpforsmile.org&gt;
            </span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-muted-foreground font-medium w-16">To:</span>
            <span className="text-foreground font-semibold flex-1">
              {donation.donorName} &lt;{donation.donorEmail}&gt;
            </span>
          </div>
        </div>

        {/* Email Body Wrapper */}
        <div className="p-6 sm:p-10 bg-white dark:bg-card">
          <div className="max-w-xl mx-auto space-y-6 text-sm text-slate-600 dark:text-muted-foreground leading-relaxed">
            
            {/* NGO Branding */}
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-border pb-4">
              <span className="text-lg font-heading font-black text-brand tracking-wider">HFS</span>
              <span className="text-xs text-muted-foreground font-semibold border-l border-slate-200 dark:border-border pl-2">
                Help For Smile Foundation
              </span>
            </div>

            {/* Greeting */}
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-800 dark:text-foreground">
                Dear {donation.donorName},
              </h3>
              <p className="mt-3">
                Thank you for your compassionate contribution supporting our field teams. Your donation is already being processed and directed to the ground.
              </p>
            </div>

            {/* Donation Summary Card */}
            <div className="rounded-xl border border-slate-100 dark:border-border bg-slate-50/50 dark:bg-secondary/20 p-5 space-y-3">
              <span className="text-[10px] font-bold text-brand uppercase tracking-wider block">Receipt Summary</span>
              
              <div className="grid grid-cols-2 gap-y-2.5 text-xs text-slate-600 dark:text-muted-foreground pt-1">
                <span className="font-medium">NGO Beneficiary:</span>
                <span className="text-slate-800 dark:text-foreground font-bold text-right">Help For Smile Foundation</span>
                
                <span className="font-medium">Campaign Cause:</span>
                <span className="text-slate-800 dark:text-foreground font-bold text-right truncate pl-4">
                  {donation.campaignTitle}
                </span>

                <span className="font-medium">Donation Date:</span>
                <span className="text-slate-800 dark:text-foreground font-medium text-right">{formattedDate}</span>

                <span className="font-medium">Transaction ID:</span>
                <span className="text-slate-800 dark:text-foreground font-mono font-bold text-right">{donation.id}</span>
                
                <div className="col-span-2 border-t border-slate-100 dark:border-border/60 my-1" />

                <span className="text-sm font-bold text-slate-700 dark:text-foreground">Total Paid:</span>
                <span className="text-brand font-black text-base text-right">{formatCurrency(donation.amount)}</span>
              </div>
            </div>

            {/* 80G Tax exemption declaration */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 text-xs text-emerald-800 dark:text-emerald-400 space-y-1">
              <span className="font-bold block uppercase tracking-wider text-[9.5px]">Tax Benefit Exemption 80G</span>
              <p className="leading-relaxed">
                This receipt confirms that HFS is a registered society under the Income Tax Act, 1961. Your donation qualifies for tax exemption benefits under Section 80G.
              </p>
            </div>

            {/* Certificate download CTA */}
            <div className="text-center py-4">
              <p className="text-xs text-muted-foreground mb-3">
                Your official certificate of appreciation has been generated. You can view or save the PDF certificate here:
              </p>
              <a
                href={`/certificate/${donation.id}`}
                target="_blank"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 font-bold text-xs transition-colors shadow-sm"
              >
                Print / Save Appreciation Certificate <ArrowUpRight className="size-4" />
              </a>
            </div>

            <hr className="border-slate-100 dark:border-border/60" />

            {/* Sign-off */}
            <div className="text-xs text-muted-foreground space-y-1 pt-2">
              <p>Warmest regards,</p>
              <p className="font-bold text-slate-800 dark:text-foreground">The HFS Donations Desk</p>
              <p>Help For Smile Foundation India</p>
              <p className="text-[10px] pt-4">
                This is a secure automated receipt. For queries, reply to donations@helpforsmile.org or visit our contact page.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
