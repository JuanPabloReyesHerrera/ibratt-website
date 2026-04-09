import { expect, test, describe } from "vitest";
import { parseBeatValidation } from "./beat-parser.js";

describe("Validación de patron del nombre del beat", () => {
  test("Debe extraer los datos correctamente de un string válido", () => {
    const validString = "MidnightFeelings_@ibratt.wav[94Bpm/Em][25-05-07]";

    const result = parseBeatValidation(validString);
    expect({
      name: "MidnightFeelings",
      producer: "ibratt.wav",
      bpm: 94,
      key: "Em",
      id: "25-05-07",
    });
  });
  test("Debe lanzar un objeto error", () => {
    const invalidString = "MidnightFeelings_@ibratt.wav[9Bpm/Em][25-05-07]";
    expect(() => parseBeatValidation(invalidString));
  });
});
