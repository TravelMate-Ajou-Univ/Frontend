"use client";

import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/redux/features/userSlice";
import { GetUserInfo, SigninUsingGoogle } from "@/service/axios/userSign";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleSignin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hash = location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const signin = async () => {
      if (accessToken) {
        if (await SigninUsingGoogle(accessToken)) {
          const userInfo = await GetUserInfo();
          if (userInfo !== false) {
            dispatch(setUser(userInfo));
          }
          router.push("/");
        }
      }
    };

    signin();
  }, [router, dispatch]);

  return <></>;
}
