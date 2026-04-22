import fs from "fs";
import path from "path";
import { parseBeatValidation } from "./beat-parser";
import type { Beat } from "@/types";

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
      portada: "/assets/portada-beat-1.jpg",
      name: result.data!.name,
      genre: "trap",
      bpm: result.data!.bpm.toString(),
      key: result.data!.key,
      price: (20).toString(),
      audioUrl: `audio/${fileName}`,
    });
  }

  return beats;
}

export function getRefFromPublicFolder() {
  const audioDir = path.join(process.cwd(), "public", "my-ref");

  if (!fs.existsSync(audioDir)) {
    console.warn("La carpeta public/my-ref no existe");
    return [];
  }

  const files = fs.readdirSync(audioDir);
  //console.log("Los documentos son: ", files);

  const refs = [];

  for (const fileName of files) {
    if (!(fileName.endsWith(".mp3") || fileName.endsWith(".wav"))) continue;
    //console.warn("FILE NAME: ", fileName);
    refs.push(fileName);
  }

  return refs;
}
