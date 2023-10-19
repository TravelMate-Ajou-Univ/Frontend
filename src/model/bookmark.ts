export type Pin = {
  lat: number;
  lng: number;
};

export type Bookmark = Pin & {
  season?: "Spring" | "Summer" | "Fall" | "Winter";
  memo?: string;
};
