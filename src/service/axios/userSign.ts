import { setCookie } from "cookies-next";
import { api, userSign } from "./api";
import { jwtDecode } from "jwt-decode";
import { access } from "fs";

export const GetKakaoToken = async (code: string) => {
  try {
    const { data } = await userSign.getKakaoToken(code);
    return data.access_token;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const SigninUsingKakao = async (kakaoAccessToken: string) => {
  try {
    const { data } = await userSign.signinUsingKakao(kakaoAccessToken);
    const { accessToken, refreshToken } = data;
    if (!accessToken || !refreshToken) throw new Error("다시 로그인 해주세요.");

    configureToken(accessToken, refreshToken);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SigninUsingGoogle = async (googleAccessToken: string) => {
  try {
    const { data } = await userSign.signinUsingGoogle(googleAccessToken);
    const { accessToken, refreshToken } = data;
    if (!accessToken || !refreshToken) throw new Error("다시 로그인 해주세요.");

    configureToken(accessToken, refreshToken);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const Refresh = async (refreshToken: string) => {
  try {
    const { data } = await userSign.refresh(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = data;
    if (!accessToken || !newRefreshToken)
      throw new Error("다시 로그인 해주세요.");

    if ((await configureToken(accessToken, newRefreshToken)) === false)
      throw new Error("다시 로그인 해주세요.");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const configureToken = async (accessToken: string, refreshToken: string) => {
  try {
    api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

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
  api.interceptors.request.use(
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
};
