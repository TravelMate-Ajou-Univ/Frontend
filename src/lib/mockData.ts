export const articleMock = {
  id: 1,
  title: "",
  thumbnail: null,
  location: "경기/인천",
  authorId: 1,
  springVersionID: 1,
  summerVersionID: null,
  fallVersionID: null,
  winterVersionID: null,
  articleTagMap: [
    {
      id: 228,
      articleId: 20,
      tagId: 8,
      tag: {
        id: 8,
        name: "카페",
        createdAt: "2023-11-05T11:13:46.000Z",
        updatedAt: "2023-11-05T11:13:46.000Z"
      }
    },
    {
      id: 229,
      articleId: 20,
      tagId: 104,
      tag: {
        id: 104,
        name: "행궁",
        createdAt: "2023-12-08T07:49:33.000Z",
        updatedAt: "2023-12-08T07:49:33.000Z"
      }
    },
    {
      id: 230,
      articleId: 20,
      tagId: 60,
      tag: {
        id: 60,
        name: "행궁 카페",
        createdAt: "2023-11-23T05:46:55.000Z",
        updatedAt: "2023-11-23T05:46:55.000Z"
      }
    }
  ],
  spring: null,
  summer: {
    id: 1,
    articleId: 1,
    userId: 1,
    period: "SUMMER",
    content: "<p>hi</p>",
    createdAt: "2023-12-02T09:31:38.000Z",
    updatedAt: "2023-12-02T09:31:38.000Z"
  },
  fall: null,
  winter: null,
  articleBookmarkMap: [
    {
      id: 90,
      period: "WINTER",
      articleId: 20,
      bookmarkId: 227,
      createdAt: "2023-12-20T14:07:44.000Z",
      updatedAt: "2023-12-20T14:07:44.000Z",
      bookmark: {
        id: 227,
        content: "4층까지 있고 넓고 쾌적",
        locationId: 90,
        userId: 3,
        createdAt: "2023-12-20T14:02:38.000Z",
        deletedAt: null,
        location: {
          id: 90,
          latitude: "37.2848574",
          longitude: "127.0144045",
          placeId: "ChIJ9_ndU51DezURyWyJWMNsnKs"
        }
      }
    }
  ],
  isFavorite: false
};

export const searchedKeywordMock = [
  {
    id: 2,
    name: "제주 맛집",
    createdAt: "2023-11-05T11:00:18.000Z",
    updatedAt: "2023-11-05T11:00:18.000Z"
  },
  {
    id: 34,
    name: "맛집",
    createdAt: "2023-11-08T12:43:01.000Z",
    updatedAt: "2023-11-08T12:43:01.000Z"
  }
];
