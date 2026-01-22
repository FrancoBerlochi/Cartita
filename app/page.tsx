import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { PricingSection } from "@/components/sections/pricing-section"

export default function HomePage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white transition-colors duration-300">
      <Header />
      <main className="pt-24">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
