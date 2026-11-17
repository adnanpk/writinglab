import HeroCalculator from "@/components/HeroCalculator";
import PersonaCards from "@/components/PersonaCards";
import TrustBar from "@/components/TrustBar";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import BeforeAfterShowcase from "@/components/BeforeAfterShowcase";
import LiveEditAnimation from "@/components/LiveEditAnimation";
import WorkflowSteps from "@/components/WorkflowSteps";
import WritingServices from "@/components/WritingServices";
import FreeSample from "@/components/FreeSample";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCta from "@/components/FinalCta";
import JsonLd from "@/components/JsonLd";
import { faqLd, serviceLd } from "@/lib/schema";

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={serviceLd()} />
      <JsonLd data={faqLd()} />
      {/* Light half */}
      <HeroCalculator />
      <PersonaCards />
      <TrustBar />
      {/* Dark half, as in the reference layout */}
      <div data-surface="dark" className="bg-page text-ink">
        <ComparisonMatrix />
        <BeforeAfterShowcase />
        <LiveEditAnimation />
        <WorkflowSteps />
        <WritingServices />
        <FreeSample />
        <Testimonials />
        <FaqAccordion />
        <FinalCta />
      </div>
    </main>
  );
}
