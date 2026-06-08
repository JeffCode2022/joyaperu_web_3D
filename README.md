# JoyasPeru Website Redesign

Rediseño web light/luxury para JoyasPeru, construido con Next.js App Router, TypeScript, Tailwind CSS v4, GSAP ScrollTrigger, Framer Motion e imagenes WebP optimizadas.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
```

Servidor local:

```text
http://localhost:3000
```

## Scripts de assets

```bash
npm run audit:site
npm run images:optimize
```

`audit:site` descarga productos e imagenes destacadas desde la API publica de WordPress en `assets/images/original/` y genera `AUDITORIA.md`.

`images:optimize` genera WebP responsive en `assets/images/webp/800`, `assets/images/webp/1600`, fallbacks en `assets/images/fallback` y clasifica las 706 imagenes publicas en carpetas equivalentes al menu original de JoyasPeru.

## Estructura

```text
app/
├── api/contact/route.ts
├── contacto/page.tsx
├── nosotros/page.tsx
├── productos/page.tsx
├── layout.tsx
├── page.tsx
├── robots.ts
└── sitemap.ts
components/
├── animations/
├── layout/
├── sections/
└── ui/
data/
├── products.ts
└── source-products.json
lib/
├── animations/
└── utils/
types/
public/images/
├── anillos/
├── aretes/
├── aros-de-matrimonio/
├── bienestar/
├── cadenas/
├── collares/
├── inversionista/
├── joyas-de-acero/
├── joyas-de-oro/
├── juegos/
├── ofertas/
├── oro-y-plata/
├── otros/
├── packs-de-registros/
├── perfumes/
├── pulseras/
├── relojes/
├── sorteos-joyaperu/
├── tobilleras/
└── verificacion-joyas-y-lingotes/
assets/images/
```

## Decisiones tecnicas

- Next.js App Router para SSG, rutas SEO y despliegue directo en Vercel/Netlify.
- Tailwind CSS v4 con tokens CSS para mantener una identidad visual controlada.
- Fuentes offline con Fontsource: Cormorant Garamond para display y DM Sans para UI.
- GSAP/ScrollTrigger cargado solo en cliente mediante dynamic import.
- Framer Motion limitado a transiciones y hover states, con `prefers-reduced-motion`.
- `next/image` para prioridad above-the-fold, lazy loading y tamanos responsive.
- Headers de seguridad en `next.config.ts`, endpoint de contacto sanitizado y rate limit basico en memoria.

## Entregables

- `AUDITORIA.md`: hallazgos del sitio original.
- `STACK_DECISION.md`: comparacion de stack y decision.
- `IMAGE_REPORT.md`: reporte de optimizacion de 706 imagenes.
- `PERFORMANCE_REPORT.md`: resultado de build y objetivo Lighthouse.
