import {
  Bookmark,
  BookmarkCollection,
  BookmarkCollectionList,
  Pin
} from "@/model/bookmark";
import { api } from "./api";

type CollectionList = {
  page: number;
  limit: number;
  visibility: string;
};

type Form = {
  title: string;
  visible: string;
};

export const getMyCollectionList = async ({
  page,
  limit,
  visibility
}: CollectionList): Promise<BookmarkCollectionList> => {
  try {
    const scope = visibility === "all" ? null : visibility;
    const response = await api({
      method: "get",
      url: `/users/me/bookmark-collections`,
      params: {
        page: page,
        limit: limit,
        visibility: scope?.toUpperCase()
      }
    });
    return {
      bookmarkCollections: response.data.bookmarkCollections,
      count: response.data.count
    };
  } catch (error) {
    console.log(error);
    return { bookmarkCollections: [], count: 0 };
  }
};

export const addCollection = async ({
  title,
  visible
}: Form): Promise<BookmarkCollection | null> => {
  try {
    const response = await api({
      method: "post",
      url: `/users/me/bookmark-collection`,
      data: {
        title: title,
        visibility: visible
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
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
