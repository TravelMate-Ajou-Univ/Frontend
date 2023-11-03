"use client";

import Link from "next/link";
import Logo from "../ui/icons/Logo";
import { useAppSelector } from "@/hooks/redux";

export default function Header() {
  const { userName, profileImage } = useAppSelector(state => state.userSlice);
  return (
    <header className="w-full h-16 bg-white flex flex-row px-8 justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>
      {userName === "" ? (
        <Link href="/auth">로그인/회원가입</Link>
      ) : (
        <span className=""></span>
      )}
    </header>
  );
}
