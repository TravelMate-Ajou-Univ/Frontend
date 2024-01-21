import AuthContext from "@/context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import { ProviderContext } from "@/context/ProviderContext";
import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import Script from "next/script";

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
        <Script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places&callback=initMap`}
        />
        <link
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
          rel="stylesheet"
        />
      </head>
      <body className="w-full h-full flex flex-col">
        <Background />
        <ReactQueryProvider>
          <ProviderContext>
            <AuthContext>
              <Header />
              <Main>{children}</Main>
              <Footer />
            </AuthContext>
          </ProviderContext>
        </ReactQueryProvider>
        <div id="portal" />
      </body>
    </html>
  );
}
