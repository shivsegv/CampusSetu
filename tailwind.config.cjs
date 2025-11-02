/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2E6BFF",
        accent: "#FF9A2E",
        muted: "#6B7280",
        bg: "#F7FAFF",
      },
      borderRadius: {
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(46,107,255,0.08)",
      },
    },
  },
  plugins: [],
};
