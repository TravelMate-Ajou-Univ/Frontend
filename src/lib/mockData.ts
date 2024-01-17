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
  articleTagMap: [],
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
  articleBookmarkMap: [],
  isFavorite: false
};
