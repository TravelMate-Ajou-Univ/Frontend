"use client";

import Link from "next/link";

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
  return <Link href={GOOGLE_AUTHORIZE_URL}>구글 로그인</Link>;
}
