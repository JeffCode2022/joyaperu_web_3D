export type NavigationCategory = {
  label: string;
  slug: string;
  count: number;
  tone: "investment" | "jewelry" | "lifestyle" | "service";
};

export const navigationCategories: NavigationCategory[] = [
  { label: "Inversionista", slug: "inversionista", count: 4, tone: "investment" },
  { label: "Oro y plata", slug: "oro-y-plata", count: 7, tone: "investment" },
  { label: "Pulseras", slug: "pulseras", count: 155, tone: "jewelry" },
  { label: "Collares", slug: "collares", count: 196, tone: "jewelry" },
  { label: "Cadenas", slug: "cadenas", count: 8, tone: "jewelry" },
  { label: "Aretes", slug: "aretes", count: 112, tone: "jewelry" },
  { label: "Anillos", slug: "anillos", count: 103, tone: "jewelry" },
  { label: "Aros de matrimonio", slug: "aros-de-matrimonio", count: 3, tone: "jewelry" },
  { label: "Tobilleras", slug: "tobilleras", count: 3, tone: "jewelry" },
  { label: "Juegos", slug: "juegos", count: 53, tone: "jewelry" },
  { label: "Joyas de oro", slug: "joyas-de-oro", count: 17, tone: "jewelry" },
  { label: "Relojes", slug: "relojes", count: 2, tone: "lifestyle" },
  { label: "Perfumes", slug: "perfumes", count: 4, tone: "lifestyle" },
  { label: "Joyas de acero", slug: "joyas-de-acero", count: 6, tone: "jewelry" },
  { label: "Ofertas", slug: "ofertas", count: 3, tone: "lifestyle" },
  { label: "Bienestar", slug: "bienestar", count: 18, tone: "lifestyle" },
  { label: "Sorteos Joyaperu", slug: "sorteos-joyaperu", count: 0, tone: "service" },
  { label: "Packs de registros", slug: "packs-de-registros", count: 4, tone: "service" },
  { label: "Otros", slug: "otros", count: 8, tone: "service" },
  {
    label: "Verificacion de joyas y lingotes",
    slug: "verificacion-joyas-y-lingotes",
    count: 0,
    tone: "service",
  },
];
