import * as z from "zod";

const beatDataSchema = z.object({
  name: z.string().min(1, "El nombre del beat no puede estar vacío"),
  producer: z.string().min(1, "El productor no puede estar vacío"),
  bpm: z
    .number("El BPM debe ser un número")
    .min(40, "El BPM debe ser un número entre 40 y 200")
    .max(200, "El BPM debe ser un número entre 40 y 200")
    .positive("El BPM debe ser un número positivo"),
  key: z
    .string()
    .min(1, "La clave no puede estar vacía")
    .max(3, "La clave debe tener máximo 3 caracteres"),
  id: z.string().min(1, "El ID no puede estar vacío"),
  ext: z.enum(["mp3", "wav"]),
});

export const parseBeatValidation = (beatData: string) => {
  const pattern =
    /^(.+)_@(.+)\[(\d+)[bB]pm[-:\/]([A-Ga-g][#b]?m?)\]\[(.+)\]\.(mp3|wav)$/;
  const match = beatData.match(pattern);

  //console.log("MATCH: ", match);

  if (!match) {
    return {
      success: false,
      error: {
        message: "El nombre no coincide con el esquema requerido.",
        file: beatData,
      },
    };
  }

  //throw new Error("El nombre no coincide con el esquema");

  const splitBeatData = {
    name: match[1],
    producer: match[2],
    bpm: parseInt(match[3]),
    key: match[4],
    id: match[5],
    ext: match[6],
  };

  const result = beatDataSchema.safeParse(splitBeatData);
  if (!result.success) {
    return {
      success: false,
      error: {
        message: "El nombre no coincide con el esquema requerido.",
        file: result.data,
      },
    };
  }
  return { success: true as const, data: result.data };
};
