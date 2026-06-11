"use client";

import { useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { allCatalogProducts, getCatalogLabel } from "@/lib/catalog";
import { products } from "@/data/products";
import { navigationCategories } from "@/data/navigation-categories";
import { ProductCard } from "@/components/sections/ProductCard";
import type { Product } from "@/types/product";

const curatedFilters = [
  { label: "Todo", slug: "todo" },
  { label: "Anillos", slug: "anillos" },
  { label: "Collares", slug: "collares" },
  { label: "Aretes", slug: "aretes" },
  { label: "Pulseras", slug: "pulseras" },
];

type CatalogSectionProps = {
  initialCategory?: string;
  initialPage?: number;
  variant?: "curated" | "full";
};

const fullCatalogPageSize = 24;
const curatedPageSize = 12;
const catalogGroups = [
  { label: "Metales", tones: ["investment"] },
  { label: "Joyeria", tones: ["jewelry"] },
  { label: "Lifestyle", tones: ["lifestyle"] },
  { label: "Servicios", tones: ["service"] },
];

function clampPage(page: number, pageCount: number) {
  if (!Number.isFinite(page)) return 1;
  return Math.min(Math.max(Math.trunc(page), 1), Math.max(pageCount, 1));
}

function getPageItems(currentPage: number, pageCount: number) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const pages = new Set([1, pageCount, currentPage - 1, currentPage, currentPage + 1]);
  const sortedPages = [...pages].filter((page) => page >= 1 && page <= pageCount).sort((a, b) => a - b);
  const items: Array<number | "ellipsis"> = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];
    if (previousPage && page - previousPage > 1) {
      items.push("ellipsis");
    }
    items.push(page);
  });

  return items;
}

export function CatalogSection({ initialCategory = "todo", initialPage = 1, variant = "curated" }: CatalogSectionProps) {
  const router = useRouter();
  const filterPanelId = useId();
  const normalizedInitial = (initialCategory || "todo").toLowerCase();
  const [active, setActive] = useState(normalizedInitial);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(initialPage);
  const source: Product[] = variant === "full" ? allCatalogProducts : products;
  const filters = variant === "full" ? [{ label: "Todo", slug: "todo" }, ...navigationCategories] : curatedFilters;
  const visible = useMemo(
    () =>
      active === "todo"
        ? source
        : source.filter((product) => product.categorySlug === active || product.category.toLowerCase() === active),
    [active, source],
  );
  const title = variant === "full" && active !== "todo" ? getCatalogLabel(active) : "Piezas listas para consultar";
  const pageSize = variant === "full" ? fullCatalogPageSize : curatedPageSize;
  const pageCount = Math.ceil(visible.length / pageSize);
  const currentPage = clampPage(page, pageCount);
  const pageItems = getPageItems(currentPage, pageCount);
  const firstVisibleIndex = visible.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastVisibleIndex = Math.min(currentPage * pageSize, visible.length);
  const paginatedProducts = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const activeFilterLabel = filters.find((filter) => filter.slug === active)?.label ?? getCatalogLabel(active);

  function catalogUrl(categorySlug: string, nextPage: number) {
    const params = new URLSearchParams();
    if (categorySlug !== "todo") params.set("categoria", categorySlug);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `/productos?${query}#catalogo` : "/productos#catalogo";
  }

  function changeFilter(slug: string) {
    setActive(slug);
    setIsFilterOpen(false);
    setPage(1);
    if (variant === "full") {
      router.replace(catalogUrl(slug, 1), { scroll: false });
    }
  }

  function changePage(nextPage: number) {
    const clampedPage = clampPage(nextPage, pageCount);
    setPage(clampedPage);
    if (variant === "full") {
      router.replace(catalogUrl(active, clampedPage), { scroll: false });
    }
  }

  if (variant === "full") {
    return (
      <section className="reveal mx-auto max-w-7xl scroll-mt-28 px-5 py-16 md:px-8" id="catalogo">
        <div className="mb-8">
          <p className="section-kicker">Catalogo</p>
          <h2 className="font-display text-5xl leading-none text-[var(--ink)] md:text-6xl">{title}</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] border border-black/10 bg-white/74 p-4 shadow-[0_20px_60px_rgba(26,26,26,0.07)]">
              <button
                className="mb-4 flex min-h-11 w-full items-center justify-between rounded-full border border-[var(--gold)] bg-[var(--gold-soft)] px-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)] transition hover:bg-[var(--gold)] data-[active=true]:bg-[var(--ink)] data-[active=true]:text-white"
                data-active={active === "todo"}
                onClick={() => changeFilter("todo")}
                type="button"
              >
                Todo
                <span>{source.length}</span>
              </button>

              <div className="grid gap-5">
                {catalogGroups.map((group) => {
                  const groupCategories = navigationCategories.filter((category) =>
                    group.tones.includes(category.tone),
                  );

                  return (
                    <div key={group.label}>
                      <p className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                        {group.label}
                      </p>
                      <div className="mt-2 grid gap-2">
                        {groupCategories.map((filter) => (
                          <button
                            className="flex min-h-10 items-center justify-between rounded-full border border-black/10 bg-[var(--porcelain)] px-4 text-left text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--muted)] transition hover:border-[var(--gold)] hover:bg-white data-[active=true]:border-[var(--ink)] data-[active=true]:bg-[var(--ink)] data-[active=true]:text-white"
                            data-active={active === filter.slug}
                            key={filter.slug}
                            onClick={() => changeFilter(filter.slug)}
                            type="button"
                          >
                            {filter.label}
                            <span>{filter.count}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col justify-between gap-3 rounded-[1.5rem] border border-black/10 bg-white/70 p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Seleccion</p>
                <h3 className="font-display text-3xl leading-none text-[var(--ink)]">{activeFilterLabel}</h3>
              </div>
              <p className="text-sm leading-6 text-[var(--muted)]">
                Pagina {currentPage} de {Math.max(pageCount, 1)}
              </p>
            </div>

            {visible.length === 0 ? (
              <div className="rounded-[1.5rem] border border-black/10 bg-white p-8 text-sm leading-7 text-[var(--muted)]">
                No hay productos con imagen en esta categoria por ahora.
              </div>
            ) : null}

            <div className="products-grid grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {pageCount > 1 ? (
              <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-black/10 pt-6 md:flex-row">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Mostrando {firstVisibleIndex}-{lastVisibleIndex} de {visible.length}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    aria-label="Pagina anterior"
                    className="grid size-11 place-items-center rounded-full border border-black/10 bg-white text-[var(--ink)] transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-35"
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                    type="button"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  {pageItems.map((item, index) =>
                    item === "ellipsis" ? (
                      <span
                        className="grid size-11 place-items-center text-xs font-bold text-[var(--muted)]"
                        key={`ellipsis-${index}`}
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        aria-current={currentPage === item ? "page" : undefined}
                        className="grid size-11 place-items-center rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition hover:border-[var(--gold)] data-[active=true]:border-[var(--ink)] data-[active=true]:bg-[var(--ink)] data-[active=true]:text-white"
                        data-active={currentPage === item}
                        key={item}
                        onClick={() => changePage(item)}
                        type="button"
                      >
                        {item}
                      </button>
                    ),
                  )}
                  <button
                    aria-label="Pagina siguiente"
                    className="grid size-11 place-items-center rounded-full border border-black/10 bg-white text-[var(--ink)] transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-35"
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(currentPage + 1)}
                    type="button"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reveal mx-auto max-w-7xl scroll-mt-28 px-5 py-24 md:px-8" id="catalogo">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">Catalogo</p>
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="relative w-full md:w-[25rem]">
          <button
            aria-controls={filterPanelId}
            aria-expanded={isFilterOpen}
            className="flex min-h-14 w-full items-center justify-between border border-black/10 bg-white/70 px-5 text-left shadow-[0_14px_45px_rgba(26,26,26,0.06)] backdrop-blur-xl transition hover:border-[var(--gold)]"
            onClick={() => setIsFilterOpen((value) => !value)}
            type="button"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-9 place-items-center border border-black/10 bg-[var(--porcelain)] text-[var(--gold)]">
                <SlidersHorizontal size={16} />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Categoria
                </span>
                <span className="mt-1 block font-display text-2xl leading-none text-[var(--ink)]">
                  {activeFilterLabel}
                </span>
              </span>
            </span>
            <ChevronDown className={`shrink-0 transition ${isFilterOpen ? "rotate-180" : ""}`} size={18} />
          </button>

          {isFilterOpen ? (
            <div
              className="absolute right-0 top-[calc(100%+0.75rem)] z-30 w-full overflow-hidden border border-white/70 bg-[rgba(250,248,245,0.92)] shadow-[0_26px_80px_rgba(26,26,26,0.16)] backdrop-blur-2xl md:w-[34rem]"
              id={filterPanelId}
            >
              <div className="max-h-[21rem] overflow-y-auto p-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  {filters.map((filter) => (
                    <button
                      className="min-h-12 border border-black/10 bg-white/55 px-4 text-left text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)] transition hover:border-[var(--gold)] hover:bg-white data-[active=true]:border-[var(--ink)] data-[active=true]:bg-[var(--ink)] data-[active=true]:text-white"
                      data-active={active === filter.slug}
                      key={filter.slug}
                      onClick={() => changeFilter(filter.slug)}
                      type="button"
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {visible.length === 0 ? (
        <div className="border border-black/10 bg-white p-8 text-sm leading-7 text-[var(--muted)]">
          No hay productos con imagen en esta categoria por ahora.
        </div>
      ) : null}
      <div className="products-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {pageCount > 1 ? (
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-black/10 pt-6 md:flex-row">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
            Pagina {currentPage} de {pageCount}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              aria-label="Pagina anterior"
              className="grid size-11 place-items-center border border-black/10 bg-white text-[var(--ink)] transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-35"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
              type="button"
            >
              <ChevronLeft size={17} />
            </button>
            {pageItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  className="grid size-11 place-items-center text-xs font-bold text-[var(--muted)]"
                  key={`ellipsis-${index}`}
                >
                  ...
                </span>
              ) : (
                <button
                  aria-current={currentPage === item ? "page" : undefined}
                  className="grid size-11 place-items-center border border-black/10 bg-white text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition hover:border-[var(--gold)] data-[active=true]:border-[var(--ink)] data-[active=true]:bg-[var(--ink)] data-[active=true]:text-white"
                  data-active={currentPage === item}
                  key={item}
                  onClick={() => changePage(item)}
                  type="button"
                >
                  {item}
                </button>
              ),
            )}
            <button
              aria-label="Pagina siguiente"
              className="grid size-11 place-items-center border border-black/10 bg-white text-[var(--ink)] transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-35"
              disabled={currentPage === pageCount}
              onClick={() => changePage(currentPage + 1)}
              type="button"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
