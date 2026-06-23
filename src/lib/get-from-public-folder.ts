import fs from "fs";
import path from "path";
import { parseBeatValidation } from "../features/beats/validators/beat.schemas";
import type { SongDemo } from "../types";
import type { Beat } from "@/features/beats/core/beat.types";

export function getBeatsFromPublicFolder(): Beat[] {
  const audioDir = path.join(process.cwd(), "public", "audio");

  if (!fs.existsSync(audioDir)) {
    console.warn("La carpeta public/audio no existe");
    return [];
  }

  const files = fs.readdirSync(audioDir);
  //console.log("Los documentos son: ", files);

  const beats: Beat[] = [];

  for (const fileName of files) {
    if (!(fileName.endsWith(".mp3") || fileName.endsWith(".wav"))) continue;

    //console.warn("FILE NAME: ", fileName);
    const result = parseBeatValidation(fileName);
    if (!result.success) {
      console.warn(result.error);
      continue;
    }

    beats.push({
      cover: "/assets/portada-beat-1.jpg",
      name: result.data!.name,
      genre: "Trap",
      moods: ["perreo", "bellakeo", "sad"],
      bpm: result.data!.bpm.toString(),
      key: result.data!.key,
      price: (20).toString(),
      audioUrl: `audio/${fileName}`,
      id: result.data!.id,
    });
  }

  return beats;
}

export function getDemosFromPublicFolder() {
  const audioDir = path.join(process.cwd(), "public", "my-ref");

  if (!fs.existsSync(audioDir)) {
    console.warn("La carpeta public/my-ref no existe");
    return [];
  }

  const files = fs.readdirSync(audioDir);
  //console.log("Los documentos son: ", files);

  const refs: SongDemo[] = [];

  for (const fileName of files) {
    if (!(fileName.endsWith(".mp3") || fileName.endsWith(".wav"))) continue;
    //console.warn("FILE NAME: ", fileName);
    refs.push({ audioUrl: fileName });
  }

  return refs;
}
