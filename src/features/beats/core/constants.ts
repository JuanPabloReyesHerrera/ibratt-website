// components/beats/beats-filter.config.ts

export const GENRES = [
  "trap",
  "detroit",
  "reggaeton",
  "afrobeat",
  "drumless",
  "drill",
  "rnb",
  "jersey club",
  "boom bap",
  "lo-fi",
] as const;

export type Genre = (typeof GENRES)[number];

// Cuando conectes la DB, este array vendrá de una query tipo:
// const genres = await db.selectDistinct({ genre: beats.genre }).from(beats)
