/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0A0B0A",
        foreground: "#EFE7D2",
        primary: {
          DEFAULT: "#CFBE91",
          foreground: "#0A0B0A",
        },
        secondary: {
          DEFAULT: "#1E1E1E",
          foreground: "rgba(245, 242, 234, 0.7)",
        },
        // Qitchen color tokens
        qitchen: {
          gold: "#CFBE91",
          "gold-light": "#EFE7D2",
          "gold-dark": "#A89060",
          bg: "#0A0B0A",
          card: "#1E1E1E",
          border: "#333330",
          muted: "#4E4C47",
        },
        dark: {
          950: "#0A0B0A",
          900: "#111110",
          800: "#1E1E1E",
          700: "#2A2A27",
          600: "#333330",
          500: "#4E4C47",
        },
        muted: {
          DEFAULT: "#1A1A18",
          foreground: "#4E4C47",
        },
        accent: {
          DEFAULT: "#CFBE91",
          foreground: "#0A0B0A",
        },
        card: {
          DEFAULT: "#1E1E1E",
          foreground: "#EFE7D2",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-forum)', 'serif'],
        forum: ['var(--font-forum)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-subtle": {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        "shimmer": {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
