"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Refresh } from "../service/axios/userSign";
import { useAppSelector } from "@/hooks/redux";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const [available, setAvailable] = useState(false);
  const { level } = useAppSelector(state => state.userSlice);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (level === "USER" && pathname === "/admin") {
      alert("관리자만 접근 가능합니다.");
      router.push("/");
    }

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
  }, [router, pathname, level]);

  return <>{available ? children : null}</>;
}
