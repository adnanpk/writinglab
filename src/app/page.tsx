import HeroCalculator from "@/components/HeroCalculator";
import PersonaCards from "@/components/PersonaCards";
import TrustBar from "@/components/TrustBar";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import BeforeAfterShowcase from "@/components/BeforeAfterShowcase";
import LiveEditAnimation from "@/components/LiveEditAnimation";
import WorkflowSteps from "@/components/WorkflowSteps";
import WritingServices from "@/components/WritingServices";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import FinalCta from "@/components/FinalCta";
import JsonLd from "@/components/JsonLd";
import { faqLd, serviceLd } from "@/lib/schema";
import type { ReactNode } from "react";

/** Alternating bands: the lower half runs dark, light, dark, light ... then the dark footer. */
const Dark = ({ children }: { children: ReactNode }) => <div data-surface="dark" className="bg-page text-ink">{children}</div>;
const Light = ({ children }: { children: ReactNode }) => <div className="bg-page text-ink">{children}</div>;

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={serviceLd()} />
      <JsonLd data={faqLd()} />
      <HeroCalculator />
      <PersonaCards />
      <TrustBar />
      <Dark><ComparisonMatrix /></Dark>
      <Light><BeforeAfterShowcase /></Light>
      <Dark><LiveEditAnimation /></Dark>
      <Light><WorkflowSteps /></Light>
      <Dark><WritingServices /></Dark>
      <Light><Testimonials /></Light>
      <Dark><FaqAccordion /></Dark>
      <Light><FinalCta /></Light>
    </main>
  );
}
