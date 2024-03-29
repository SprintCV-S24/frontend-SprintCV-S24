import Dexie, { Table } from "dexie";

/*
The schema and initialization for the indexeddb persistent cache
*/

export interface CacheItem {
  cacheKey: string;
  content: ArrayBuffer;
  savepath: string;
  expires: number;
}

class LatexCache extends Dexie {
  // 'cache' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  cache!: Table<CacheItem>;

  constructor() {
    super("cache");
    this.version(1).stores({
      cache: "&cacheKey, content, savepath, expires", // Primary key and props
    });
  }
}

export const latexCache = new LatexCache();
