import { api } from "./api";

export const checkDuplicateName = async (nickname: string) => {
  const response = await api({
    method: "post",
    url: "/users/verify-nickname",
    data: {
      nickname: nickname
    }
  });

  if (response.status === 400) {
    throw new Error();
  }
  return response;
};

export const changeNickname = async (nickname: string) => {
  const response = await api({
    method: "patch",
    url: "/users/change-nickname",
    data: {
      nickname
    }
  });

  if (response.status === 400) {
    return new Error();
  }
  return response.data;
};

export const changeProfileImg = async (profileImageId: number) => {
  const response = await api({
    method: "put",
    url: "/users/me/profile-image",
    data: {
      profileImageId
    }
  });

  return response;
};

export const changProfileIdToProfileUrl = (profileImageId: number): string => {
  return `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}attachments/${profileImageId}/?type=profile`;
};
