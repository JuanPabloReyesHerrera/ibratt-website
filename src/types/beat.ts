export type Beat = {
  portada: string;
  name: string;
  genre: string;
  bpm: string;
  key: string;
  price: string;
};

export type BeatsList = {
  beats: Beat[];
};
