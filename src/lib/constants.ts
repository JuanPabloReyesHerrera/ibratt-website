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
