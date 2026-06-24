// Transforma una fila de Supabase al tipo Beat del frontend
import type { Beat } from "../core/beat.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export function mapBeat(row: any): Beat {
  const genres =
    row.beat_genres?.map((bg: any) => bg.genres?.name).filter(Boolean) ?? [];

  const moods =
    row.beat_moods?.map((bm: any) => bm.moods?.name).filter(Boolean) ?? [];

  const basicLicense = row.beat_licenses?.find(
    (bl: any) => bl.license_types?.slug === "basic",
  );

  return {
    id: row.id,
    name: row.name,
    bpm: row.bpm?.toString() ?? "0",
    key: row.key ?? "",
    cover: row.cover_path
      ? `${SUPABASE_URL}/storage/v1/object/public/beats-cover/${row.cover_path}`
      : "/assets/portada-beat-default.jpg",
    audioUrl: row.mp3_path
      ? `${SUPABASE_URL}/storage/v1/object/public/beats-mp3/${row.mp3_path}`
      : "",
    genre: genres[0] ?? "Unknown",
    moods,
    price: basicLicense?.price?.toString() ?? "0",
  };
}
