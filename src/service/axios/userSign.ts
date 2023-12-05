import { deleteCookie, setCookie } from "cookies-next";
import { api, chatApi, user, userAuth } from "./api";
import { jwtDecode } from "jwt-decode";
import { User } from "@/model/user";
import { BookmarkCollectionType } from "@/model/bookmark";

export const GetKakaoToken = async (code: string) => {
  try {
    const { data } = await userAuth.getKakaoToken(code);
    return data.access_token;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SigninUsingKakao = async (kakaoAccessToken: string) => {
  try {
    const { data } = await userAuth.signinUsingKakao(kakaoAccessToken);
    const { accessToken, refreshToken } = data;
    if (!accessToken || !refreshToken) throw new Error("다시 로그인 해주세요.");
    if ((await configureToken(accessToken, refreshToken)) === false)
      throw new Error("다시 로그인 해주세요.");

    return true;
  } catch (error: any) {
    if (error.response.status === 400) {
      alert(
        "정지된 사용자입니다. 아래 이메일로 문의해주세요.\njunhakjh@ajou.ac.kr"
      );
    }
    console.log(error);
    return false;
  }
};

export const SigninUsingGoogle = async (googleAccessToken: string) => {
  try {
    const { data } = await userAuth.signinUsingGoogle(googleAccessToken);
    const { accessToken, refreshToken } = data;
    if (!accessToken || !refreshToken) throw new Error("다시 로그인 해주세요.");
    if ((await configureToken(accessToken, refreshToken)) === false)
      throw new Error("다시 로그인 해주세요.");

    return true;
  } catch (error: any) {
    if (error.response.status === 400) {
      alert(
        "정지된 사용자입니다. 아래 이메일로 문의해주세요.\njunhakjh@ajou.ac.kr"
      );
    }
    console.log(error);
    return false;
  }
};

export const Refresh = async (refreshToken: string) => {
  try {
    const oldInterceptor = sessionStorage.getItem("interceptor");
    if (oldInterceptor) api.interceptors.request.eject(Number(oldInterceptor));
    const { data } = await userAuth.refresh(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = data;
    if (!accessToken || !newRefreshToken)
      throw new Error("다시 로그인 해주세요.");

    if ((await configureToken(accessToken, newRefreshToken)) === false)
      throw new Error("다시 로그인 해주세요.");

    return true;
  } catch (error) {
    deleteCookie("refreshToken");
    alert("다시 로그인 해주세요.");
    window.location.href = "/auth";
    console.log(error);
    return false;
  }
};

const configureToken = async (accessToken: string, refreshToken: string) => {
  try {
    api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    chatApi.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

    const decodedAccessToken = jwtDecode(accessToken);
    if (!decodedAccessToken.exp) return false;
    authInterceptor(decodedAccessToken.exp, refreshToken);

    const decodedRefreshToken = jwtDecode(refreshToken);
    if (!decodedRefreshToken.exp) return false;
    const refreshTokenExpire = new Date(decodedRefreshToken.exp * 1000);
    setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: "none",
      expires: refreshTokenExpire
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const authInterceptor = async (
  accessTokenExpire: number,
  refreshToken: string
) => {
  const interceptor = api.interceptors.request.use(
    async config => {
      const timestamp = new Date().getTime() / 1000;
      if (!config.headers.Authorization || accessTokenExpire - timestamp < 60) {
        if (await Refresh(refreshToken)) return config;
        throw new Error("다시 로그인 해주세요.");
      }
      return config;
    },
    error => {
      console.log(error);
      throw new Error("다시 로그인 해주세요.");
    }
  );

  sessionStorage.setItem("interceptor", interceptor.toString());
};

export const GetUserInfo = async () => {
  try {
    const { data } = await user.getUserInfo();
    const userInfo = {
      id: data.id,
      userName: data.nickname,
      profileImageId: data.profileImageId ?? ""
    };
    return userInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserInfoById = async (id: number): Promise<User | false> => {
  try {
    const { data } = await user.getUserInfoById(id);
    const userInfo: User = {
      id: data[0].id,
      userName: data[0].nickname,
      profileImageId: data[0].profileImageId ?? ""
    };
    return userInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getBookmarkCollectionsById = async (
  id: number
): Promise<{ id: number; title: string }[] | false> => {
  try {
    const { data } = await user.getBookmarkCollectionsById(id);
    if (data.bookmarkCollections.length === 0) return false;
    return data.bookmarkCollections.map(
      (bookmarkCollection: BookmarkCollectionType) => {
        return {
          id: bookmarkCollection.id,
          title: bookmarkCollection.title
        };
      }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
