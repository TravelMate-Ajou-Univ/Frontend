"use client";

import Image from "next/image";
import Link from "next/link";
import KakaoSigninBtn from "/public/image/kakao_signin_btn.png";

const KAKAO_AUTHORIZE_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;

export default function KakaoSigninButton() {
  return (
    <Link href={KAKAO_AUTHORIZE_URL}>
      <Image src={KakaoSigninBtn} alt="카카오 로그인 버튼" priority />
    </Link>
  );
}
