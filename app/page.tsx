import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
import { ImpactStats } from '@/components/home/impact-stats'
import { FeaturedCampaigns } from '@/components/home/featured-campaigns'
import { HowItWorks } from '@/components/home/how-it-works'
import { StoriesPreview } from '@/components/home/stories-preview'
import { CtaBanner } from '@/components/home/cta-banner'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ImpactStats />
        <FeaturedCampaigns />
        <HowItWorks />
        <StoriesPreview />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
