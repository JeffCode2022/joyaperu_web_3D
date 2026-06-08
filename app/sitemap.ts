import type { MetadataRoute } from "next";

const routes = ["", "/productos", "/nosotros", "/contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://joyaperu.com${route}`,
    lastModified: new Date("2026-06-06"),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
