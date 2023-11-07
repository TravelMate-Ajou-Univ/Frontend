"use client";

import Link from "next/link";
import Logo from "../ui/icons/Logo";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { useEffect, useState } from "react";
import Menu from "./menu/Menu";
import { getCookie } from "cookies-next";
import { GetUserInfo } from "@/service/axios/userSign";
import { setUser } from "@/redux/features/userSlice";

export default function Header() {
  const { userName, profileImageId } = useAppSelector(state => state.userSlice);
  const [menu, setMenu] = useState(false);
  const dispatch = useAppDispatch();

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

  const openMenu = () => {
    setMenu(true);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white flex px-10 justify-between items-center z-50 shadow-md">
      <Link href="/">
        <Logo />
      </Link>
      {userName === "" ? (
        <Link href="/auth">로그인/회원가입</Link>
      ) : (
        <button onClick={openMenu}>
          <div
            className={`w-10 h-10 rounded-full ${
              profileImageId === "" && "bg-gray-200 p-2"
            }`}
          >
            <Image
              src={
                profileImageId === ""
                  ? defaultProfileImg
                  : `process.env.NEXT_PUBLIC_SERVER_BASE_URL/attachment/${profileImageId}`
              }
              alt="profile"
              priority
            />
          </div>
        </button>
      )}
      {menu && <Menu closeMenu={closeMenu} />}
    </header>
  );
}
