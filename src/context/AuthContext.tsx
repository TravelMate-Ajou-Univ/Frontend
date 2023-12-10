"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Refresh } from "../service/axios/userSign";
import AuthCheck from "./AuthCheck";

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
        } else {
          setAvailable(true);
        }
      };
      refresh();
    } else {
      setAvailable(true);
    }
  }, []);

  return available ? <AuthCheck>{children}</AuthCheck> : null;
}
