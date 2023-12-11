"use client";

import Link from "next/link";
import Logo from "../ui/icons/Logo";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import Menu from "./menu/Menu";
import { getCookie } from "cookies-next";
import { GetUserInfo } from "@/service/axios/userSign";
import { setUser } from "@/redux/features/userSlice";
import MenuIcon from "../ui/icons/MenuIcon";
import { usePathname } from "next/navigation";

export default function Header() {
  const { userName, level } = useAppSelector(state => state.userSlice);
  const [menu, setMenu] = useState(false);

  const dispatch = useAppDispatch();

  const pathname = usePathname();

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");

    if (refreshToken) {
      const setUserInfoAsync = async () => {
        const userInfoData = await GetUserInfo();

        if (userInfoData !== false) {
          dispatch(setUser(userInfoData));
        }
      };

      setUserInfoAsync();
    }
  }, [dispatch]);

  useEffect(() => {
    closeMenu();
    scrollTo(0, 0);

    return () => sessionStorage.setItem("prevPath", pathname);
  }, [pathname]);

  const openMenu = () => {
    setMenu(true);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full md:h-16 h-[3.2rem] bg-white flex md:px-10 px-6 justify-between items-center z-50 shadow-md">
      <Link href="/">
        <Logo />
      </Link>
      {userName === "" ? (
        <Link href="/auth">로그인/회원가입</Link>
      ) : (
        <div className="flex items-center gap-3">
          {level === "ADMIN" && (
            <Link
              className="text-sm text-gray-600 hover:text-gray-800"
              href="/admin"
            >
              관리자 페이지
            </Link>
          )}
          <button onClick={openMenu}>
            <MenuIcon />
          </button>
        </div>
      )}
      {menu && <Menu closeMenu={closeMenu} />}
    </header>
  );
}
