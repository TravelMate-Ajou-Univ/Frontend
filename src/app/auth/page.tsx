import GoogleSigninButton from "@/components/auth/Google/GoogleSigninButton";
import KakaoSigninButton from "@/components/auth/Kakao/KakaoSigninButton";

export default function AuthPage() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <KakaoSigninButton />
      <GoogleSigninButton />
    </div>
  );
}
