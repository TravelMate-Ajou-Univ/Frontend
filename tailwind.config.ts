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
        secondary: "#3D4FA6"
      },
      textColor: {
        primary: "#2C3B84",
        secondary: "#3D4FA6"
      },
      borderColor: {
        primary: "#2C3B84",
        secondary: "#3D4FA6"
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
