import { create } from "zustand";

// ─── Product types (escalable) ────────────────────────────────────────────────
export type ProductType = "beat" | "sample_pack" | "service";

export type ProductItem = {
  id: string;
  type: ProductType;
  title: string;
  subtitle?: string; // "by Ibratt" | "Producer Pack Vol.1"
  coverUrl?: string;
  audioUrl?: string;
  metadata: Record<string, string>; // { bpm: '140', key: 'Am' } | { tracks: '24', format: 'WAV' }
};

// ─── Pricing plans (reemplaza LicenseType — funciona para beats, packs y servicios) ──
export type PricingPlan = {
  id: string;
  label: string;
  price: number;
  badge?: string; // "Popular" | "Best Value" | "Exclusive"
  features: string[];
  isExclusive?: boolean;
  deliverables?: string[]; // Archivos que recibe el usuario
};

// ─── Checkout flow ─────────────────────────────────────────────────────────────
export type CheckoutStep = "summary" | "auth" | "payment" | "confirmation";
export type AuthMode = "login" | "signup";

export type Order = {
  id: string;
  product: ProductItem;
  plan: PricingPlan;
  userEmail: string;
  total: number;
  createdAt: Date;
};

// ─── Store ─────────────────────────────────────────────────────────────────────
type CheckoutStore = {
  product: ProductItem | null;
  selectedPlanId: string | null;
  currentStep: CheckoutStep;
  authMode: AuthMode;
  order: Order | null;

  setProduct: (product: ProductItem) => void;
  setSelectedPlan: (planId: string) => void;
  setStep: (step: CheckoutStep) => void;
  setAuthMode: (mode: AuthMode) => void;
  setOrder: (order: Order) => void;
  clearCheckout: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  product: null,
  selectedPlanId: null,
  currentStep: "summary",
  authMode: "signup",
  order: null,

  setProduct: (product) => set({ product }),
  setSelectedPlan: (planId) => set({ selectedPlanId: planId }),
  setStep: (step) => set({ currentStep: step }),
  setAuthMode: (mode) => set({ authMode: mode }),
  setOrder: (order) => set({ order }),
  clearCheckout: () =>
    set({
      product: null,
      selectedPlanId: null,
      currentStep: "summary",
      authMode: "signup",
      order: null,
    }),
}));

// ─── Pricing plans por tipo de producto ────────────────────────────────────────
// Estos son los planes default para beats — puedes crear funciones similares
// para sample_pack y service cuando los necesites.

export const BEAT_PLANS: PricingPlan[] = [
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
    deliverables: ["beat.wav", "beat.mp3", "stems.zip", "stems_trackout.zip"],
    isExclusive: true,
  },
];

// Helper: obtiene planes según el tipo de producto
export function getPlansForProduct(type: ProductType): PricingPlan[] {
  switch (type) {
    case "beat":
      return BEAT_PLANS;
    case "sample_pack":
      return []; // TODO: definir cuando se implemente
    case "service":
      return []; // TODO: definir cuando se implemente
    default:
      return [];
  }
}
