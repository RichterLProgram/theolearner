/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",    // Duolingo green
        secondary: "#FFC107",  // Orange
        accent: "#2196F3",     // Blue
        danger: "#E91E63",     // Pink
        success: "#4CAF50",
        warning: "#FF9800",
        error: "#F44336",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
