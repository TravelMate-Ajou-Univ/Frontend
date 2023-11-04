export type Bookmark = {
  id?: number;
  latitude: number;
  longitude: number;
  content?: string;
};

export type Pin = Omit<Bookmark, "id">;

export type BookmarkCollection = {
  id: number;
  title: string;
  visibility: "private" | "friends_only" | "public";
  createdAt: string;
  updatedAt: string;
};

export type BookmarkCollectionList = {
  bookmarkCollections: BookmarkCollection[];
  count: number;
};
