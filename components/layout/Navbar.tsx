"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { navigationCategories, type NavigationCategory } from "@/data/navigation-categories";
import { BrandLogo } from "@/components/ui/BrandLogo";

const groups: Array<{ id: NavigationCategory["tone"]; label: string; description: string }> = [
  { id: "investment", label: "Inversion y metales", description: "Lingotes, oro y plata" },
  { id: "jewelry", label: "Joyeria", description: "Piezas principales" },
  { id: "lifestyle", label: "Lifestyle", description: "Regalos y bienestar" },
  { id: "service", label: "Servicios y otros", description: "Registros y verificacion" },
];

const navText = "nav-link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<NavigationCategory["tone"]>("jewelry");
  const accordionId = useId();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-7 md:pt-5">
      <nav className="mx-auto flex max-w-[92rem] items-start gap-5 bg-transparent">
        <BrandLogo className="pointer-events-auto shrink-0" />

        <div className="nav-desktop-center pointer-events-auto ml-auto items-center gap-6 rounded-full border border-white/18 bg-transparent px-5 py-2.5 text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-[2px] xl:gap-7">
          <Link className={navText} href="/">
            Inicio
          </Link>
          <Link className={navText} href="/productos">
            Productos
          </Link>
          <button
            aria-controls={accordionId}
            aria-expanded={isOpen}
            className={`${navText} gap-2`}
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <span>Categorias</span>
            <ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} size={14} />
          </button>
          <Link className={navText} href="/nosotros">
            Nosotros
          </Link>
          <Link className={navText} href="/contacto">
            Contacto
          </Link>
        </div>

        <div className="pointer-events-auto ml-auto flex items-center gap-2 lg:ml-0">
          <button
            aria-controls={accordionId}
            aria-expanded={isOpen}
            className="nav-mobile-category h-10 items-center gap-2 rounded-full border border-white/30 bg-black/10 px-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_32px_rgba(0,0,0,0.20)] backdrop-blur-md transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            Categorias
            <ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} size={14} />
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="pointer-events-auto mx-auto mt-3 max-w-6xl" id={accordionId}>
          <div className="overflow-hidden rounded-[2rem] border border-white/75 bg-[rgba(250,248,245,0.97)] shadow-[0_30px_90px_rgba(26,26,26,0.16)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-5 border-b border-black/10 px-5 py-5 md:px-8">
              <div>
                <h2 className="font-display text-5xl leading-none text-[var(--ink)]">Categorias</h2>
              </div>
              <button
                aria-label="Cerrar categorias"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 bg-white/70 text-[var(--ink)] transition hover:border-[var(--gold)]"
                onClick={closeMenu}
                type="button"
              >
                <X size={17} />
              </button>
            </div>

            <div className="grid max-h-[calc(100dvh-7rem)] overflow-y-auto md:grid-cols-[310px_1fr]">
              <div className="border-b border-black/10 bg-white/18 p-4 md:border-b-0 md:border-r md:p-5">
                <Link
                  className="mb-4 flex min-h-12 items-center justify-between rounded-full border border-[var(--gold)] bg-[var(--gold-soft)] px-5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)] transition hover:bg-[var(--gold)]"
                  href="/productos#catalogo"
                  onClick={closeMenu}
                >
                  <span className="inline-flex items-center gap-2">
                    <Search size={15} />
                    Ver todo
                  </span>
                </Link>
                <div className="grid gap-2">
                  {groups.map((group) => (
                    <button
                      className="group flex min-h-14 items-center justify-between rounded-full border border-black/10 bg-white/42 px-5 text-left transition hover:border-[var(--gold)] hover:bg-white data-[active=true]:border-[var(--gold)] data-[active=true]:bg-white data-[active=true]:shadow-[0_14px_45px_rgba(26,26,26,0.08)]"
                      data-active={activeGroup === group.id}
                      key={group.id}
                      onClick={() => setActiveGroup(group.id)}
                      type="button"
                    >
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">
                          {group.label}
                        </span>
                        <span className="mt-1 block text-[11px] font-medium text-[var(--muted)]">
                          {group.description}
                        </span>
                      </span>
                      <ChevronDown
                        className={`shrink-0 text-[var(--gold)] transition ${activeGroup === group.id ? "rotate-180" : ""}`}
                        size={15}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 md:p-7">
                <div className="mb-5 flex flex-col gap-2 border-b border-black/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                      Seleccion activa
                    </p>
                    <h3 className="font-display text-3xl leading-none text-[var(--ink)]">
                      {groups.find((group) => group.id === activeGroup)?.label}
                    </h3>
                  </div>
                  <p className="max-w-xs text-sm leading-6 text-[var(--muted)]">
                    Elige una categoria para ver sus productos.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {navigationCategories
                    .filter((category) => category.tone === activeGroup)
                    .map((category) => (
                      <Link
                        className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-black/10 bg-white/58 px-5 py-3 text-sm font-bold uppercase tracking-[0.13em] text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--gold)] hover:bg-white hover:shadow-[0_14px_38px_rgba(26,26,26,0.10)]"
                        href={`/productos?categoria=${category.slug}#catalogo`}
                        key={category.slug}
                        onClick={closeMenu}
                      >
                        <span className="size-1.5 rounded-full bg-[var(--gold)] transition group-hover:scale-150" />
                        {category.label}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
