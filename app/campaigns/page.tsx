import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { CampaignsGrid } from '@/components/campaigns-grid'

export const metadata = {
  title: 'Campaigns — HFS',
  description:
    'Browse vetted campaigns for clean water, education, food, and healthcare. Choose a cause and follow your impact.',
}

export default function CampaignsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Campaigns"
          title="Find a cause to champion"
          description="Every campaign is verified by our field teams and reported on transparently. Your gift goes directly to the people who need it most."
        />
        <CampaignsGrid />
      </main>
      <Footer />
    </div>
  )
}
