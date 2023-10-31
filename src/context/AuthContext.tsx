"use client";

import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { Refresh } from "../service/axios/userSign";

interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken) {
      const refresh = async () => {
        if (await Refresh(refreshToken)) {
          //TODO: 유저 정보 저장 로직
        }
      };
      refresh();
    }
  }, []);

  return <>{children}</>;
}
