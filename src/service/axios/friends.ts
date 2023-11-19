import { FriendType, FriendsListType } from "./../../model/friend";
import { api } from "./api";

type FriendsListProps = {
  page: number;
  limit: number;
};

export const getMyFriendsList = async ({
  page,
  limit
}: FriendsListProps): Promise<FriendsListType> => {
  try {
    const response = await api({
      method: "get",
      url: "/users/me/friends",
      params: {
        page,
        limit
      }
    });
    const data = response.data;
    const friends: FriendType[] = data.friends.map((data: any) => {
      return {
        id: data.friend.id,
        nickname: data.friend.nickname,
        profileImageId: data.friend.profileImageId
      };
    });

    return {
      friends,
      count: data.count
    };
  } catch (error) {
    console.error(error);
    return {
      friends: [],
      count: 0
    };
  }
};

export const searchUser = async (id: string): Promise<FriendType[]> => {
  try {
    const response = await api({
      method: "get",
      url: "/users",
      params: {
        userIds: id
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addFriend = async (id: number) => {
  const response = await api({
    method: "post",
    url: "/users/invite-friend",
    data: {
      friendId: id
    }
  });
  return response;
};

export const deleteFriend = async (id: number) => {
  const response = await api({
    method: "delete",
    url: `users/me/friend/${id}`
  });
  return response;
};
