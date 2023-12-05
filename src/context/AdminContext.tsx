"use client";

import { isAdmin } from "@/service/axios/admin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AdminContext({ children }: Props) {
  const [availiable, setAvailiable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const res = await isAdmin();
      if (!res) {
        alert("관리자만 접근 가능합니다.");
        router.replace("/");
      }
      setAvailiable(true);
    };
    checkAdmin();
  }, [router]);

  return availiable && children;
}
