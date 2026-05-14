export const ROUTES = {
  home: "/",
  beats: "/beats",
  checkout: "/checkout",
} as const;

import { NavBarCategory } from "@/types/nav-bar";

export const NAV_BAR_CATEGORIES: NavBarCategory[] = [
  { title: "Inicio", link: "/" },
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
  { title: "Plataformas", link: "/plataformas" },
  //{ title: "Galeria", link: "/galeria" },
  {
    title: "Login",
    link: "/login",
  },
];
