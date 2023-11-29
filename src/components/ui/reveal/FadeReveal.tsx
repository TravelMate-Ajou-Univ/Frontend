"use client";

import { Fade } from "react-awesome-reveal";

type Props = {
  children: React.ReactNode;
  cascade?: boolean;
};

export default function FadeReveal({ children, cascade = true }: Props) {
  return (
    <Fade
      damping={0.6}
      delay={500}
      duration={1300}
      triggerOnce
      cascade={cascade}
    >
      {children}
    </Fade>
  );
}
