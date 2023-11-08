export type BookmarkType = {
  id: number;
  latitude: number;
  longitude: number;
  content?: string;
};

export type PinType = Omit<BookmarkType, "id">;

export type VisibilityType = "private" | "friends_only" | "public";

export type BookmarkCollectionType = {
  id: number;
  title: string;
  visibility: VisibilityType;
  createdAt: string;
  updatedAt: string;
};

export type BookmarkCollectionListType = {
  bookmarkCollections: BookmarkCollectionType[];
  count: number;
};
