"use client";

import axios from "axios";
import { Bookmark } from "@/model/bookmark";

export async function getAllBookmark(id: number): Promise<Bookmark[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/bookmark-collection/${id}/bookmarks`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
