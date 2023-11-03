import AuthContext from "@/context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import { ProviderContext } from "@/context/ProviderContext";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className={inter.className}>
      <body className="w-full bg-gray-100">
        <ProviderContext>
          <AuthContext>
            <Header />
            <main className="max-w-screen-xl oveflow-auto mx-auto w-full h-full">
              {children}
            </main>
            <footer></footer>
          </AuthContext>
        </ProviderContext>
      </body>
    </html>
  );
}
