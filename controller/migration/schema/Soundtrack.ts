import { IDBReleaseArtist } from "./Artist";
import { AssetURLStr, FugaIdType, MongoIdStr } from "./IRelease";

export interface IDBSoundtrack {
  /*
	@minLengh 1
  */
  name: string;
  /*
	@minLength 24
	@maxLength 24
  */
  musicLabelId: MongoIdStr;

  fileUrl: AssetURLStr;
  artists: IDBReleaseArtist[];
  language: {
    name: string;
    code: string;
  };
  metadataLanguage: {
    name: string;
    code: string;
  };
  /**
   * @minLength 2
   */
  primaryGenre: string;
  secondaryGenre?: string;
  explicit: boolean;
  isrc: string;
  publishingRightsBy: string;
  /**
   * @min 2000
   * @max 2050
   */
  publishingRightsYear: number;
  fugaAssetId: FugaIdType;
  duration?: number;
}
