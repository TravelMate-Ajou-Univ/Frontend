"use client";

import { usePathname } from "next/navigation";

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main
      className={`mx-auto mt-16 w-full flex-grow ${
        pathname === "/" ? "" : "max-w-screen-xl"
      }`}
    >
      {children}
    </main>
  );
}
