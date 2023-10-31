"use client";

import Link from "next/link";
import Image from "next/image";
import GoogleSigninBtn from "/public/image/google_signin_btn.svg";

const GOOGLE_BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_AUTHORIZE_URL =
  GOOGLE_BASE_URL +
  "?client_id=" +
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID +
  "&redirect_uri=" +
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI +
  "&response_type=token" +
  "&scope=email profile";

export default function GoogleSigninButton() {
  return (
    <Link href={GOOGLE_AUTHORIZE_URL}>
      <Image src={GoogleSigninBtn} alt="구글 로그인 버튼" priority />
    </Link>
  );
}
