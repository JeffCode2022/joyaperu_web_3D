import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/700.css";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JewelryIntro } from "@/components/animations/JewelryIntro";
import { PageShell } from "@/components/animations/PageShell";

export const metadata: Metadata = {
  title: "JoyasPeru | Joyeria peruana en plata 950 y oro 18k",
  description:
    "Rediseño editorial de JoyasPeru: joyeria peruana, piezas personalizadas, plata 950, oro 18k y regalos memorables.",
  metadataBase: new URL("https://joyaperu.com"),
  openGraph: {
    title: "JoyasPeru",
    description: "Joyeria peruana con plata 950, oro 18k y piezas personalizadas.",
    images: ["/images/collares/collar-lomo-cartier-plata-950-645.webp"],
  },
};

const stripExtensionHydrationAttributes = `
(() => {
  const blockedAttributes = ["bis_skin_checked", "bis_register"];
  const originalSetAttribute = Element.prototype.setAttribute;

  Element.prototype.setAttribute = function patchedSetAttribute(name, value) {
    if (blockedAttributes.includes(name) || String(name).startsWith("__processed_")) return;
    return originalSetAttribute.call(this, name, value);
  };

  const removeInjectedAttributes = (node) => {
    if (!node || node.nodeType !== 1) return;
    for (const attribute of Array.from(node.attributes)) {
      if (
        blockedAttributes.includes(attribute.name) ||
        attribute.name.startsWith("__processed_")
      ) {
        node.removeAttribute(attribute.name);
      }
    }
  };

  const cleanTree = (node) => {
    removeInjectedAttributes(node);
    if (!node || node.nodeType !== 1 || !node.querySelectorAll) return;
    for (const element of node.querySelectorAll("[bis_skin_checked], [bis_register]")) {
      removeInjectedAttributes(element);
    }
    for (const element of node.querySelectorAll("*")) {
      for (const attribute of Array.from(element.attributes)) {
        if (attribute.name.startsWith("__processed_")) element.removeAttribute(attribute.name);
      }
    }
  };

  const clean = () => {
    cleanTree(document.documentElement);
    cleanTree(document.body);
    for (const script of document.querySelectorAll('script[src^="chrome-extension://"], script[bis_use]')) {
      script.remove();
    }
  };

  clean();
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") removeInjectedAttributes(mutation.target);
      for (const node of mutation.addedNodes) cleanTree(node);
    }
  }).observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{ __html: stripExtensionHydrationAttributes }}
          id="strip-extension-hydration-attributes"
          suppressHydrationWarning
        />
      </head>
      <body suppressHydrationWarning>
        <JewelryIntro />
        <Navbar />
        <PageShell>
          <main>{children}</main>
        </PageShell>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
