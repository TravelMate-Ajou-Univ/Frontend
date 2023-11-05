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
      textColor: {
        primary: "#2C3B84"
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
      animation: {
        menuSlide: "menuSlide 0.3s ease-in-out"
      }
    }
  },
  plugins: []
};
export default config;
