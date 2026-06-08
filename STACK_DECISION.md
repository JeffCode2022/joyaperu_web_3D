# Stack Decision

## Decision

Stack elegido: Next.js 16 App Router + TypeScript + Tailwind CSS v4 + Framer Motion + GSAP 3 ScrollTrigger + Fontsource + `next/image`.

## Framework

| Opcion | Pros | Contras | Resultado |
| --- | --- | --- | --- |
| Next.js 14+ App Router | SSG/ISR, metadata, sitemap/robots nativos, `next/image`, rutas API para contacto, deploy excelente en Vercel | Mayor complejidad que Vite para sitios simples | Elegido |
| Astro | Muy rapido para contenido estatico, bajo JS por defecto | Integrar filtros React, Framer, GSAP y API route deja una arquitectura mixta | No elegido |
| Vite + React | DX simple, bundle controlado | SEO/SSG y optimizacion de imagenes requieren mas piezas externas | No elegido |

## Estilos

Tailwind CSS v4 fue elegido sobre CSS Modules y Vanilla CSS porque permite una UI consistente con tokens, bajo CSS muerto y velocidad de iteracion. Se mantienen variables CSS globales para marca: `#FAF8F5`, `#C9A84C`, `#1A1A1A`, `#8C8680`.

## Animaciones

GSAP 3 + ScrollTrigger se usa para reveal/parallax al hacer scroll. Framer Motion se usa para transiciones de pagina y hover de cards. La separacion evita cargar GSAP en Server Components y mantiene las interacciones de cards declarativas.

## Tipografia

Fontsource fue elegido sobre Google Fonts API para evitar dependencia externa en runtime y mejorar privacidad/performance. Fuentes: Cormorant Garamond para titulares editoriales y DM Sans para lectura/UI.

## Imagenes

`next/image` con WebP local optimizado. Se generaron variantes 800/1600 y fallback local. La imagen hero usa `priority`; el resto carga lazy por defecto.

## Seguridad

Se implementan headers: HSTS, X-Frame-Options, nosniff, Referrer-Policy, CSP y Permissions-Policy. El endpoint de contacto sanitiza entradas y aplica rate limiting basico. No se exponen variables de entorno al cliente.

## Deploy

Vercel es la opcion recomendada por integracion nativa con Next, CDN, headers y rutas API. Netlify tambien es viable, pero puede requerir ajustes de runtime para Next 16.

## Criterios Core Web Vitals

- LCP objetivo menor a 2.5s: hero local WebP con `priority`.
- CLS objetivo menor a 0.1: imagenes con contenedores de aspect ratio fijo.
- INP/FID objetivo menor a 100ms: rutas estaticas y JS cliente acotado.
- SEO: metadata, sitemap y robots generados por Next.
- Dependencias: solo runtime necesario para UI, animacion, iconos, fuentes e imagenes.
