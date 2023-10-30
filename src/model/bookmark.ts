export type Bookmark = {
  location: {
    id: number;
    latitude: number;
    longitude: number;
  };
  content?: string;
};

export type BookmarkCollection = {
  id: number;
  title: string;
  visibility: "PRIVATE" | "FRIENDS_ONLY" | "PUBLIC";
  createdAt: string;
  updatedAt: string;
};
