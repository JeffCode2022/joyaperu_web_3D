import Link from "next/link";
import { Camera, Mail, Play, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[var(--ink)] text-[var(--porcelain)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-4xl">JoyaPerú</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/68">
            Joyeria peruana en plata 950, oro 18k y piezas personalizadas para regalos con memoria.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-white/72">
          <Link href="/productos">Productos</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/contacto">Contacto</Link>
          <a href="https://joyaperu.com/politicas-de-privacidad/" rel="noreferrer" target="_blank">
            Politicas de privacidad
          </a>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)]">Contacto</p>
          <p className="mt-4 text-sm leading-7 text-white/72">
            921638910<br />
            contacto@joyaperu.com<br />
            Villa Maria del Triunfo, Lima
          </p>
          <div className="mt-5 flex gap-3">
            {[Share2, Camera, Play, Mail].map((Icon, index) => (
              <span className="grid size-9 place-items-center border border-white/18" key={index}>
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
