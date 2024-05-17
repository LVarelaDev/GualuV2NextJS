import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      greenSmooth: "#9AD2A9",
      primary: "#d87a1c",
      purplePrimary: "#511C8E",
      purpleSmooth: "#744BA3",
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      blue: colors.sky,
      green: colors.emerald,
      teal: colors.teal,
      indigo: colors.indigo,
      slate: colors.slate,
      orange: colors.orange,
      cyan: colors.cyan,
      black: colors.black,
      yellow: colors.yellow,
      purple: colors.purple,
      violet: colors.violet,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
