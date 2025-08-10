/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./storage/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  // @ts-ignore - NativeWind preset pour Metro
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
