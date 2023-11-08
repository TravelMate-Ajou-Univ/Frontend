export type VisibilityType = "public" | "friends_only" | "private";

export type LocationType = {
  lat: number;
  lng: number;
};

export type PinType = {
  position: LocationType;
  content?: string;
};

export type BookmarkType = PinType & {
  id: number;
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
