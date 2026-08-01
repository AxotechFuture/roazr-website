import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { CtaBand } from "@/components/sections/CtaBand";
import { FactStrip } from "@/components/sections/FactStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <Problem />
        <HowItWorks />
        <Features />
        <CtaBand />
        <Testimonials />
        <Faq />
        <FinalCta />
        <FactStrip />
      </main>
      <Footer />
    </>
  );
}
