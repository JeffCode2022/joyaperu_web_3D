# Performance Report

## Verificacion local

- `npm run lint`: aprobado.
- `npm run build`: aprobado.
- Capturas headless Chrome: `artifacts/home-desktop.png` y `artifacts/home-mobile.png`.
- Rutas estaticas generadas: `/`, `/productos`, `/nosotros`, `/contacto`, `/robots.txt`, `/sitemap.xml`.
- Ruta dinamica: `/api/contact`.

## Imagenes

- Imagenes procesadas: 706.
- Imagenes clasificadas en carpetas del menu original: 706.
- Peso original total: 71.02 MB.
- Peso optimizado total WebP 800px: 19.54 MB.
- Ahorro estimado: 72.5%.

## Lighthouse esperado

Estimacion para build local servido en producción:

| Categoria | Objetivo |
| --- | ---: |
| Performance | 90+ |
| Accessibility | 95+ |
| SEO | 95+ |
| Best Practices | 95+ |

## Notas

No se ejecuto Lighthouse real en Chrome en esta pasada. La app queda lista para medir con:

```bash
npm run build
npm run start
npx lighthouse http://localhost:3000 --view
```
