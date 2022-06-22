import { MongoIdStr } from "./IRelease";

export type ArtistType =
  | "primary"
  | "featuring"
  | "Actor"
  | "Arranger"
  | "Composer"
  | "Engineer"
  | "with"
  | "Lyricist"
  | "Mixer"
  | "Orchestra"
  | "Producer"
  | "Remixer";

export interface IDBReleaseArtist {
  artistId: MongoIdStr;
  type: ArtistType;
}
