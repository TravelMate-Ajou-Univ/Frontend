import AuthContext from "@/context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import { ProviderContext } from "@/context/ProviderContext";
import Background from "@/components/layout/Background";

const openSans = Open_Sans({ subsets: ["latin"] });

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
    <html lang="en" className={openSans.className}>
      <head>
        <link
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
          rel="stylesheet"
        />
      </head>
      <body className="w-full h-full flex flex-col">
        <Background />
        <ProviderContext>
          <AuthContext>
            <Header />
            <main className="max-w-screen-xl mx-auto mt-16 w-full flex-grow">
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
