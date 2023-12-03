import {
  FriendType,
  FriendWithPkType,
  FriendsListType,
  FriendsWithPkListType
} from "./../../model/friend";
import { api } from "./api";

export const getMyFriendsList = async (
  page: number,
  limit: number
): Promise<FriendsWithPkListType> => {
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
    const friends: FriendWithPkType[] = data.friends.map((data: any) => {
      return {
        pk: data.id,
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

export const searchUser = async (nickname: string): Promise<FriendType[]> => {
  try {
    const response = await api({
      method: "get",
      url: "/users/info",
      params: {
        nickname: nickname
      }
    });
    const datas = response.data;

    const friends: FriendType[] = datas.map((data: any) => {
      return {
        id: data.id,
        nickname: data.nickname,
        profileImageId: data.profileImageId
      };
    });
    return friends;
  } catch (error) {
    return [];
  }
};

export const viewReceivedFriendRequest = async (
  page: number,
  limit: number
): Promise<FriendsWithPkListType> => {
  try {
    const response = await api({
      method: "get",
      url: "/users/me/friend-invitation/received",
      params: {
        page,
        limit
      }
    });
    const datas = response.data;

    const friends: FriendWithPkType[] = datas.friends.map((data: any) => {
      return {
        pk: data.id,
        id: data.user.id,
        nickname: data.user.nickname,
        profileImageId: data.user.profileImageId
      };
    });

    return {
      friends,
      count: datas.count
    };
  } catch (error) {
    console.error(error);
    return {
      friends: [],
      count: 0
    };
  }
};

export const viewSentFriendRequest = async (
  page: number,
  limit: number
): Promise<FriendsWithPkListType> => {
  try {
    const response = await api({
      method: "get",
      url: "/users/me/friend-invitation/sent",
      params: {
        page,
        limit
      }
    });
    const datas = response.data;

    const friends: FriendWithPkType[] = datas.friends.map((data: any) => {
      return {
        pk: data.id,
        id: data.friend.id,
        nickname: data.friend.nickname,
        profileImageId: data.friend.profileImageId
      };
    });
    return {
      friends,
      count: datas.count
    };
  } catch (error) {
    console.error(error);
    return {
      friends: [],
      count: 0
    };
  }
};

export const acceptAddFriendRequest = async (pk: number) => {
  const response = await api({
    method: "post",
    url: `/users/me/friend-invitation/received/${pk}/accept`,
    data: {
      id: pk
    }
  });
  return response;
};

export const sendAddFriendRequest = async (id: number) => {
  const response = await api({
    method: "post",
    url: "/users/invite-friend",
    data: {
      friendId: id
    }
  });
  return response;
};

export const deleteFriend = async (pk: number) => {
  const response = await api({
    method: "delete",
    url: `users/me/friend/${pk}`
  });
  return response;
};

export const getFriendListToInvite = async (
  nickname: string,
  memberIds: string
) => {
  try {
    const response = await api({
      method: "get",
      url: `users/me/friends/non-members`,
      params: {
        nickname: "",
        memberIds
      }
    });

    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
