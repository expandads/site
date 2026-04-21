import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { MarqueeSocial } from "@/components/sections/marquee-social";
import { Problem } from "@/components/sections/problem";
import { Solutions } from "@/components/sections/solutions";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Addons } from "@/components/sections/addons";
import { PricingCta } from "@/components/sections/pricing-cta";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { StickyCtaMobile } from "@/components/primitives/sticky-cta-mobile";
import { EngagementTracker } from "@/components/primitives/engagement-tracker";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeSocial />
        <Problem />
        <Solutions />
        <Process />
        <Testimonials />
        <Addons />
        <PricingCta />
        <Faq />
      </main>
      <Footer />
      <StickyCtaMobile />
      <EngagementTracker />
    </>
  );
}
