"use client";

import Masonry from "@mui/lab/Masonry";

interface Props {
  children: any;
}

export default function MuiMasonry({ children }: Props) {
  return (
    <Masonry columns={3} spacing={6} className="w-full">
      {children}
    </Masonry>
  );
}
