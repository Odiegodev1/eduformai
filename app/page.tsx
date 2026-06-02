import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { Benefits } from "@/components/landing/benefits"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Testimonials } from "@/components/landing/testimonials"

import { Faq } from "@/components/landing/faq"
import { SiteFooter } from "@/components/landing/site-footer"
import { PricingSection } from "@/components/landing/princing-section"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
