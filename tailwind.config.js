/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-white": "#FFFFFF",
        "custom-green": "#107263",
        "custom-yellow": "#FFDE62",
        "custom-orange": "#FF7C5F",
        "custom-black": "#3F3F3F",
      },
      boxShadow: {
        "material-shadow":
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
