export type VisibilityType = "public" | "friends_only" | "private";

export type LocationType = {
  latitude: number;
  longitude: number;
};

export type PinType = LocationType & {
  content?: string;
  placeId: string;
};

export type BookmarkType = PinType & {
  id: number;
};

export type BookmarkWithCollectionNameType = BookmarkType & {
  collectionName: string;
};

export type BookmarkCollectionType = {
  id: number;
  title: string;
  visibility: VisibilityType;
};

export type BookmarkCollectionListType = {
  bookmarkCollections: BookmarkCollectionType[];
  count: number;
  view?: string; // 북마크 컬렉션 리스트 페이지에서 공개 범위 설정을 위함.
};
