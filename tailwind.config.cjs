const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'Inter Variable'", ...defaultTheme.fontFamily.sans],
        display: ["'Clash Display'", "'Inter Variable'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: "#f5f8ff",
          100: "#e8eeff",
          200: "#cddaff",
          300: "#a3bbff",
          400: "#7999ff",
          500: "#4c72ff",
          600: "#2E6BFF",
          700: "#1f49c7",
          800: "#162f8a",
          900: "#0d1b57",
        },
        accent: {
          50: "#fff7eb",
          100: "#ffe9c4",
          200: "#ffd38b",
          300: "#ffb85a",
          400: "#ff9a2e",
          500: "#f17816",
          600: "#cd530e",
          700: "#a3360d",
        },
        slate: {
          950: "#080b16",
        },
        success: "#22c55e",
        warning: "#f97316",
        danger: "#ef4444",
        muted: "#6B7280",
        surface: "#f8fafc",
      },
      boxShadow: {
        soft: "0 18px 45px -12px rgba(26, 55, 126, 0.18)",
        elevated: "0 32px 60px -24px rgba(15, 23, 42, 0.32)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.08)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.5rem",
        full: "999px",
      },
      backgroundImage: {
        "gradient-glow": "radial-gradient(circle at top, rgba(76, 114, 255, 0.22), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255, 154, 46, 0.24), transparent 60%)",
      },
      animation: {
        fade: "fade 400ms ease-in-out",
        "slide-up": "slideUp 420ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(12px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
