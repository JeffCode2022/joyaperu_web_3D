import { Gem, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";

const metrics = [
  { icon: Gem, value: "950", label: "Plata certificada" },
  { icon: Sparkles, value: "18k", label: "Oro a pedido" },
  { icon: PackageCheck, value: "700+", label: "Piezas catalogadas" },
  { icon: ShieldCheck, value: "12m", label: "Garantia disponible" },
];

const benefits = [
  { icon: ShieldCheck, label: "Hasta 12 meses de garantia" },
  { icon: Truck, label: "Envio coordinado a todo el Peru" },
  { icon: PackageCheck, label: "Compra directa y segura" },
  { icon: Gem, label: "Grabado y personalizacion a consulta" },
];

export function JewelryTrustStrip() {
  return (
    <section className="reveal">
      <div className="bg-[var(--gold)]">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
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

      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
        {benefits.map((benefit) => (
          <div
            className="flex min-h-44 flex-col items-center justify-center rounded-[1.5rem] border border-black/10 bg-white/72 p-6 text-center shadow-[0_18px_55px_rgba(26,26,26,0.06)]"
            key={benefit.label}
          >
            <benefit.icon className="text-[var(--gold)]" size={42} strokeWidth={1.35} />
            <p className="mt-6 max-w-44 text-sm leading-6 text-[var(--ink)]">{benefit.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
