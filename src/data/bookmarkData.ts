import { Bookmark, BookmarkCollection } from "../model/bookmark";

const bookmarkCollection1: BookmarkCollection = {
  title: "서울",
  visibility: "PRIVATE",
  bookmarks: []
};

const bookmarkCollection2: BookmarkCollection = {
  title: "경기도",
  visibility: "FRIENDS_ONLY",
  bookmarks: [
    {
      lat: 37.28317,
      lng: 127.044864,
      memo: "아주대학교"
    },
    {
      lat: 37.29746,
      lng: 127.00232,
      memo: "송원 중학교"
    }
  ]
};

const bookmarkCollection3: BookmarkCollection = {
  title: "강원도",
  visibility: "PUBLIC",
  bookmarks: []
};

const bookmarkCollection4: BookmarkCollection = {
  title: "충청남도",
  visibility: "PUBLIC",
  bookmarks: []
};

const bookmarkCollection5: BookmarkCollection = {
  title: "경상북도가나다라마바사아자차카타파하",
  visibility: "FRIENDS_ONLY",
  bookmarks: []
};

export const bookmarkCollectionListData = [
  bookmarkCollection1,
  bookmarkCollection2,
  bookmarkCollection3,
  bookmarkCollection4,
  bookmarkCollection5
];
