// Queries de beats contra Supabase
import { createClient } from "@/lib/supabase/server";
import { mapBeat } from "./beats.mapper";

export async function getBeats() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("beats")
    .select(
      `
      id,
      name,
      bpm,
      key,
      cover_path,
      mp3_path,
      beat_genres( genres(name) ),
      beat_moods( moods(name) ),
      beat_licenses( price, license_types(slug) )
    `,
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching beats:", error);
    return [];
  }

  return data.map(mapBeat);
}
