"use client";

import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/redux/features/userSlice";
import {
  GetKakaoToken,
  GetUserInfo,
  SigninUsingKakao
} from "@/service/axios/userSign";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function KakaoSignin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const signin = async () => {
      if (code) {
        const access_token = await GetKakaoToken(code);
        if (await SigninUsingKakao(access_token)) {
          const userInfo = await GetUserInfo();
          if (userInfo !== false) {
            dispatch(setUser(userInfo));
          }
          router.push("/");
        }
      }
    };

    signin();
  }, [code, router, dispatch]);

  return <></>;
}
