export type ReleaseVersion = {
  audioUrl: string;
  version: number;
  isApproved: boolean;
  createdAt: string;
  notes?: string; // comentarios del productor sobre esta versión
};

export type MyNextRelease = {
  id: string;
  name: string;
  maxModifications: number; // límite acordado de modificaciones
  versions?: ReleaseVersion[];
  isFullyApproved?: boolean; // true cuando el artista aprobó la versión final
  approvedAt?: string;
  approvedBy?: string; // nombre del artista que firmó
};
