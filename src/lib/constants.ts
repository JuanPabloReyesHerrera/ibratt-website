export const ROUTES = {
  home: "/",
  beats: "/beats",
  checkout: "/checkout",
} as const;

export const LICENSE_TYPES = {
  basic: {
    name: "Basic",
    price: 29,
    description: "MP3 lease · 50k streams · non-exclusive",
  },
  premium: {
    name: "Premium",
    price: 59,
    description: "WAV lease · 150k streams · non-exclusive",
  },
  exclusive: {
    name: "Exclusive",
    price: 299,
    description: "WAV + stems · unlimited · exclusive rights",
  },
} as const;

export type LicenseType = keyof typeof LICENSE_TYPES;

import { NavBarCategory } from "@/types/nav-bar";

export const NAV_BAR_CATEGORIES: NavBarCategory[] = [
  { title: "Inicio", link: "#home" },
  {
    title: "Beats",
    link: "/beats",
    contents: [
      { content: "Trap", description: "Los mejores beats de trap", link: "" },
      {
        content: "Regaeton",
        description: "Los mejores beats de Reggaeton",
        link: "",
      },
      {
        content: "Afrobeat",
        description: "Los mejores beats de Afrobeat",
        link: "",
      },
      { content: "Tech", description: "Los mejores beats de Tech", link: "" },
    ],
  },
  { title: "Contacto", link: "/contacto" },
  { title: "Plataformas", link: "plataformas" },
  { title: "Galeria", link: "/galeria" },
];
