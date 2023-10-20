export type Pin = {
  lat: number;
  lng: number;
};

export type Bookmark = Pin & {
  memo?: string;
};

export type BookmarkCollection = {
  title: string;
  visibility: "PRIVATE" | "FRIENDS_ONLY" | "PUBLIC";
  bookmarks?: Bookmark[];
};
