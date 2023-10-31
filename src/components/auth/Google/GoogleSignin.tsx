"use client";

import { SigninUsingGoogle } from "@/service/axios/userSign";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleSignin() {
  const router = useRouter();

  useEffect(() => {
    const hash = location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const signin = async () => {
      if (accessToken) {
        if (await SigninUsingGoogle(accessToken)) {
          router.push("/");
        }
      }
    };

    signin();
  }, [router]);

  return <></>;
}
