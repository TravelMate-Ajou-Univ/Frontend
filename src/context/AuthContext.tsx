"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Refresh } from "../service/axios/userSign";

interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken) {
      const refresh = async () => {
        if (await Refresh(refreshToken)) {
          setAvailable(true);
          //TODO: 유저 정보 저장 로직
        }
      };
      refresh();
    } else {
      setAvailable(true);
    }
  }, []);

  return <>{available ? children : null}</>;
}
