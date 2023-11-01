import { Bookmark, BookmarkCollection, Pin } from "@/model/bookmark";
import { api } from "./api";

type Props = {
  page: number;
  limit: number;
  visibility: "PUBLIC" | "FRIENDS_ONLY" | "PRIVATE" | "ALL";
};

type Form = {
  title: string;
  visible: string;
};

export const getMyCollectionList = async ({
  page,
  limit,
  visibility
}: Props): Promise<BookmarkCollection[]> => {
  try {
    const scope = visibility === "ALL" ? null : visibility;
    const response = await api({
      method: "get",
      url: `/users/me/bookmark-collections`,
      params: {
        page: page,
        limit: limit,
        visibility: scope
      }
    });
    return response.data.bookmarkCollections;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addCollection = async ({
  title,
  visible
}: Form): Promise<Boolean> => {
  try {
    const response = await api({
      method: "post",
      url: `/users/me/bookmark-collection`,
      data: {
        title: title,
        visibility: visible
      }
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllBookmarks = async (id: number): Promise<Bookmark[]> => {
  try {
    const response = await api.get(
      `/users/me/bookmark-collection/${id}/bookmarks`
    );
    const datas = response.data;
    const bookmarks = datas.map(
      ({
        id,
        location,
        content
      }: {
        id: number;
        location: { latitude: string; longitude: string };
        content: string;
      }) => {
        const bookmark: Bookmark = {
          id,
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
          content
        };
        return bookmark;
      }
    );
    return bookmarks;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteCollection = async (id: number): Promise<Boolean> => {
  try {
    const response = await api({
      method: "delete",
      url: `/users/me/bookmark-collection/${id}`
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const modifyCollection = async (
  id: number,
  title: string,
  visibility: string,
  addPins: Pin[],
  subPins: Number[]
): Promise<Boolean> => {
  try {
    await api({
      method: "patch",
      url: `/users/me/bookmark-collection/${id}`,
      data: {
        title: title,
        visibility: visibility,
        locationsWithContent: addPins,
        bookmarkIdsToDelete: subPins
      }
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
