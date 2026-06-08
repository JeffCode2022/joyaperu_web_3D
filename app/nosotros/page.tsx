import { ArtisanVideoStory } from "@/components/sections/ArtisanVideoStory";
import { BrandStory } from "@/components/sections/BrandStory";
import { Testimonials } from "@/components/sections/Testimonials";

export default function NosotrosPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <p className="section-kicker">Marca</p>
        <h1 className="section-title max-w-4xl">Lujo peruano, claro y cercano.</h1>
      </section>
      <ArtisanVideoStory />
      <BrandStory />
      <Testimonials />
    </div>
  );
}
