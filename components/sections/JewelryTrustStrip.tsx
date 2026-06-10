import { Gem, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";

const metrics = [
  { icon: Gem, value: "950", label: "Plata certificada" },
  { icon: Sparkles, value: "18k", label: "Oro a pedido" },
  { icon: PackageCheck, value: "700+", label: "Piezas catalogadas" },
  { icon: ShieldCheck, value: "12m", label: "Garantia disponible" },
];

export function JewelryTrustStrip() {
  return (
    <section className="reveal bg-[rgba(250,248,245,0.82)] backdrop-blur-sm">
      <div className="bg-[linear-gradient(90deg,rgba(170,18,32,0.10)_0%,rgba(170,18,32,0.06)_28%,rgba(255,255,255,0.58)_42%,rgba(255,255,255,0.72)_58%,rgba(170,18,32,0.06)_72%,rgba(170,18,32,0.10)_100%)]">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
          {metrics.map((metric) => (
            <div className="flex items-center justify-center gap-4 text-[var(--ink)]" key={metric.label}>
              <metric.icon size={32} strokeWidth={1.7} />
              <div>
                <strong className="block text-2xl leading-none">{metric.value}</strong>
                <span className="text-sm font-bold uppercase tracking-[0.12em]">{metric.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
