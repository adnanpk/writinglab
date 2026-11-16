import { SITE } from "./site";
import { DICT } from "./i18n";
import { TIERS } from "./pricing";

const social = Object.values(SITE.social).filter(Boolean);

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#org`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo-stacked.png`,
  description: "English editing and academic writing services by native-speaker, PhD-qualified specialists.",
  ...(SITE.email || SITE.phone ? { contactPoint: { "@type": "ContactPoint", contactType: "customer support", availableLanguage: ["English", "Arabic"], ...(SITE.email && { email: SITE.email }), ...(SITE.phone && { telephone: SITE.phone }) } } : {}),
  ...(social.length ? { sameAs: social } : {}),
});

export const serviceLd = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "English Editing Services",
  serviceType: "English language editing for academic manuscripts",
  provider: { "@id": `${SITE.url}/#org` },
  areaServed: "Worldwide",
  availableLanguage: ["English", "Arabic"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "English editing levels",
    itemListElement: TIERS.map((tier) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: DICT.en.tiers[tier.id].name, description: DICT.en.tiers[tier.id].desc },
      priceSpecification: { "@type": "UnitPriceSpecification", price: tier.baseSAR.toFixed(2), priceCurrency: "SAR", unitText: "word", description: "Starting price per word (slowest turnaround)" },
    })),
  },
});

export const faqLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DICT.en.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
