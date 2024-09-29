/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "false",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    fontFamily: {
      primary: "var(--font-nunito)",
      secondary: "var(--font-anonymous-pro)", // Fredoka, Inter, Monaco
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        primary: "var(--primary)",
        "primary-text": "var(--primary-text)",
        "body-color": "var(--body-color)",
      },
    },
  },
  plugins: [],
};
