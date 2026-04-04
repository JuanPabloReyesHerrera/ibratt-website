import * as z from "zod";

const beatDataSchema = z.object({
  beat: z.string().min(1, "El nombre del beat no puede estar vacío"),
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
});

export const parseBeatValidation = (beatData: string) => {
  const pattern = /^(.+)_@(.+)\[(\d+)[bB]pm\/([A-Ga-g][#b]?m?)\]\[(.+)\]$/;
  const match = beatData.match(pattern);

  if (!match) throw new Error("El nombre no coincide con el esquema");

  const splitBeatData = {
    beat: match[1],
    producer: match[2],
    bpm: parseInt(match[3]),
    key: match[4],
    id: match[5],
  };

  const result = beatDataSchema.safeParse(splitBeatData);

  if (result.success) return result.data;
  else {
    const errorMessages = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    throw new Error(`Error de validación: ${errorMessages}`);
  }
};
