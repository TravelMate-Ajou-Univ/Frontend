export type Pin = {
  lat: number;
  lng: number;
};

export type Bookmark = Pin & {
  season?: string;
  memo?: string;
};
