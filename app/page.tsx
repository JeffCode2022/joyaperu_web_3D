import { ScrollEffectsLoader } from "@/components/animations/ScrollEffectsLoader";
import { BrandStory } from "@/components/sections/BrandStory";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvestmentSplitCards } from "@/components/sections/InvestmentSplitCards";
import { JewelryTrustStrip } from "@/components/sections/JewelryTrustStrip";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <ScrollEffectsLoader />
      <HeroSection />
      <JewelryTrustStrip />
      <InvestmentSplitCards />
      <FeaturedProducts />
      <CategoryGrid />
      <CatalogSection />
      <Testimonials />
      <BrandStory />
      <ContactSection />
    </>
  );
}
