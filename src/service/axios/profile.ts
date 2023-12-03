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
