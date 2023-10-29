"use client";

import { GetKakaoToken, SigninUsingKakao } from "@/service/axios/userSign";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function KakaoSignin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    const signin = async () => {
      if (code) {
        const access_token = await GetKakaoToken(code);
        if (await SigninUsingKakao(access_token)) {
          router.push("/");
        }
      }
    };

    signin();
  }, [code, router]);

  return <></>;
}
