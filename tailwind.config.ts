import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      backgroundColor: {
        primary: "#2C3B84",
        secondary: "#3D4FA6",
        spring: "#FFF0F1",
        summer: "#E6F2FF",
        fall: "#FFE7E6",
        winter: "#F2F2F2"
      },
      textColor: {
        primary: "#2C3B84",
        secondary: "#3D4FA6",
        secondaryHover: "#82A7DE",
        sky: "#9FB5D7"
      },
      borderColor: {
        primary: "#2C3B84",
        secondary: "#3D4FA6",
        spring: "#FFB5B8",
        summer: "#58B3FF",
        fall: "#C15F5B",
        winter: "#C2C2C2"
      },
      keyframes: {
        menuSlide: {
          "0%": {
            transform: "translateX(20rem)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        }
      },
      width: {
        mainSection: "53rem"
      },
      animation: {
        menuSlide: "menuSlide 0.3s ease-in-out"
      }
    }
  },
  plugins: []
};
export default config;
