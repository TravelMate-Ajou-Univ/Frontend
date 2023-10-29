import GoogleSigninButton from "@/components/auth/Google/GoogleSigninButton";
import KakaoSigninButton from "@/components/auth/Kakao/KakaoSigninButton";

export default function AuthPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 w-44">
        <KakaoSigninButton />
        <GoogleSigninButton />
      </div>
    </div>
  );
}
