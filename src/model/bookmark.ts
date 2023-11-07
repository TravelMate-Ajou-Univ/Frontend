export type Bookmark = {
  id?: number;
  latitude: number;
  longitude: number;
  content?: string;
};

export type Pin = Omit<Bookmark, "id">;

export type VisibilityType = "private" | "friends_only" | "public";

export type BookmarkCollection = {
  id: number;
  title: string;
  visibility: VisibilityType;
  createdAt: string;
  updatedAt: string;
};

export type BookmarkCollectionList = {
  bookmarkCollections: BookmarkCollection[];
  count: number;
};
