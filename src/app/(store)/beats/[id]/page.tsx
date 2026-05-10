import { usePlayerStore } from "@/features/beats/store/player-store";
import { useShallow } from "zustand/shallow";
type SigleBeatPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SigleBeatPage({ params }: SigleBeatPageProps) {
  const { id } = await params;

  return <div>{id}</div>;
}
