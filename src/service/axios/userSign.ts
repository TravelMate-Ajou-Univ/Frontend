import { userSign } from "./api";

export const GetKakaoToken = async (code: string): Promise<string> => {
  try {
    const { data } = await userSign.getKakaoToken(code);
    return data.access_token;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const SigninUsingKakao = async (
  accessToken: string
): Promise<boolean> => {
  try {
    const { data } = await userSign.signinUsingKakao(accessToken);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
