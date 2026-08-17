import Script from "next/script";
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

const roazrLandingScript = `(function(e,t){
  e.RoazrID="3310bd4f-2411-4e1f-aacc-0fb92f394011";
  e.RoazrFunnel="4dd5b566-ef5c-4738-9528-b2a986716cb5";
  (function(){var s=t.createElement("script");s.async=true;s.src="https://app.roazr.com/scripts/landing.js";s.setAttribute("data-roazr-step","landing");t.head.appendChild(s);})();
})(window,document);`;

export default function Home() {
  return (
    <>
      <Script id="roazr-landing-tracker" strategy="afterInteractive">
        {roazrLandingScript}
      </Script>
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
