"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

interface Props {
  children: React.ReactNode;
}

const unAuthPath = [
  "/",
  "/auth",
  "/auth/kakao",
  "/auth/google",
  "/article/list",
  "/article/detail"
];

export default function AuthCheck({ children }: Props) {
  const [available, setAvailable] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const refreshToken = getCookie("refreshToken");

  useEffect(() => {
    if (!refreshToken) {
      if (unAuthPath.includes(pathName) || pathName.includes(unAuthPath[3])) {
        setAvailable(true);
      } else {
        setAvailable(false);
        alert("로그인이 필요한 서비스입니다.");
        router.push("/auth");
      }
    } else {
      setAvailable(true);
    }
  }, [pathName, refreshToken, router]);

  return available ? children : null;
}
