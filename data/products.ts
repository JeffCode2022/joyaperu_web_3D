import type { CategoryFeature, Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "jp-aretes-tous",
    name: "Aretes Bola Tous",
    category: "Aretes",
    price: "S/110.00",
    image: "/images/aretes/aretes-bola-tous-plata-950-1125.webp",
    description: "Plata 950 con volumen pulido y brillo limpio.",
    featured: true,
  },
  {
    id: "jp-corazon-personalizado",
    name: "Corazon Personalizado",
    category: "Collares",
    price: "S/278.95",
    image: "/images/collares/collar-corazon-personalizado-plata-950-758.webp",
    description: "Dije grabable con acabado espejo y cadena delicada.",
    featured: true,
  },
  {
    id: "jp-collar-pareja",
    name: "Collar Para El & Para Ella",
    category: "Collares",
    price: "S/632.00",
    image: "/images/collares/collares-pareja-corazon-llave-plata-950-685.webp",
    description: "Set de pareja en plata peruana de exportacion.",
    featured: true,
  },
  {
    id: "jp-lomo-cartier",
    name: "Collar Lomo Cartier",
    category: "Collares",
    price: "S/855.60",
    image: "/images/collares/collar-lomo-cartier-plata-950-645.webp",
    description: "Tejido clasico con presencia y caida estructurada.",
    featured: true,
  },
  {
    id: "jp-pulseras-lovers",
    name: "Set Pulseras Lovers",
    category: "Pulseras",
    price: "S/187.53",
    image: "/images/pulseras/set-pulseras-tejidas-corazon-plata-950-11992.webp",
    description: "Pulseras tejidas con corazon de plata 950 personalizable.",
  },
  {
    id: "jp-abrazo-eterno",
    name: "Collar Abrazo Eterno",
    category: "Collares",
    price: "S/246.13",
    image: "/images/collares/collar-hada-colgante-plata-950-11990.webp",
    description: "Una pieza emocional de plata 950 para regalar memoria.",
  },
  {
    id: "jp-perlas-rio",
    name: "Aretes Perlas de Rio",
    category: "Aretes",
    price: "S/105.49",
    image: "/images/aretes/aretes-perlas-rio-reversibles-plata-950-11917.webp",
    description: "Perlas reversibles con brillo natural y silueta suave.",
  },
  {
    id: "jp-jpac70",
    name: "JPAC70",
    category: "Anillos",
    price: "S/386.75",
    image: "/images/anillos/anillo-compromiso-circon-plata-950-3894.webp",
    description: "Anillo de plata 950 con trabajo ornamental refinado.",
  },
  {
    id: "jp-promesa",
    name: "Anillos Promesa",
    category: "Anillos",
    price: "S/398.50",
    image: "/images/anillos/anillos-promesa-plata-950-11837.webp",
    description: "Par de promesa con volumen sutil y acabado brillante.",
  },
  {
    id: "jp-van-cleef",
    name: "Pulsera Van Cleef",
    category: "Pulseras",
    price: "S/312.00",
    image: "/images/pulseras/pulsera-van-cleef-plata-950-11276.webp",
    description: "Motivo trebol en plata 950 para uso diario elevado.",
  },
  {
    id: "jp-girasol",
    name: "Collar Girasol",
    category: "Collares",
    price: "S/215.00",
    image: "/images/collares/collar-girasol-plata-950-10085.webp",
    description: "Pieza luminosa con centro definido y cadena fina.",
  },
  {
    id: "jp-corazon-cristal",
    name: "Anillo Corazon de Cristal",
    category: "Anillos",
    price: "S/410.04",
    image: "/images/anillos/anillos-pareja-circon-plata-950-2540.webp",
    description: "Cristal protagonista montado sobre plata 950.",
  },
];

export const categories: CategoryFeature[] = [
  {
    name: "Anillos",
    image: "/images/anillos/anillos-promesa-plata-950-11837.webp",
    copy: "Piezas simbolicas para promesas, compromiso y uso diario.",
  },
  {
    name: "Collares",
    image: "/images/collares/collar-lomo-cartier-plata-950-645.webp",
    copy: "Cadenas, dijes personalizados y siluetas sentimentales.",
  },
  {
    name: "Aretes",
    image: "/images/aretes/aretes-perlas-rio-reversibles-plata-950-11917.webp",
    copy: "Brillos cercanos al rostro con acabados pulidos.",
  },
  {
    name: "Pulseras",
    image: "/images/pulseras/set-pulseras-tejidas-corazon-plata-950-11992.webp",
    copy: "Textiles, cuero y plata 950 para regalos personales.",
  },
];

export const featuredProducts = products.filter((product) => product.featured);
