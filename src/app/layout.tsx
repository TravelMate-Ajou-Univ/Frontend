import AuthContext from "@/context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import Header from "@/components/layout/Header";
import { ProviderContext } from "@/context/ProviderContext";

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Travel Mate",
  description: "실시간 채팅으로 여행 정보를 공유하세요."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nanumGothic.className}>
      <body className="w-full h-full bg-gray-100 flex flex-col">
        <ProviderContext>
          <AuthContext>
            <Header />
            <main className="max-w-screen-xl oveflow-auto mx-auto w-full flex-grow">
              {children}
            </main>
            <footer></footer>
          </AuthContext>
        </ProviderContext>
        <div id="portal" />
      </body>
    </html>
  );
}
