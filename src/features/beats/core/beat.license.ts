export const BEAT_LICENSE_PLANS = [
  {
    id: "basic",
    label: "Basic MP3",
    price: 29.99,
    features: ["MP3 320kbps", "100K streams", "2,500 copias", "No exclusivo"],
    deliverables: ["beat.mp3"],
  },
  {
    id: "premium",
    label: "Premium WAV",
    price: 59.99,
    badge: "Popular",
    features: [
      "WAV sin pérdida",
      "500K streams",
      "25,000 copias",
      "Stems disponibles",
    ],
    deliverables: ["beat.wav", "beat.mp3"],
  },
  {
    id: "exclusive",
    label: "Exclusive Rights",
    price: 299.99,
    badge: "Exclusive",
    features: [
      "Derechos exclusivos",
      "Streams ilimitados",
      "Copias ilimitadas",
      "Beat retirado del catálogo",
    ],
    deliverables: ["beat.wav", "beat.mp3", "stems.zip", "stems_trackout"],
    isExclusive: true,
  },
];

export type BeatLicensePlan = (typeof BEAT_LICENSE_PLANS)[number];
