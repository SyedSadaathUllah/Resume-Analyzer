export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 0.6s ease-out",
        pop: "popIn 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" }
        },
        popIn: {
          "0%": { opacity: 0, transform: "scale(0.8)" },
          "100%": { opacity: 1, transform: "scale(1)" }
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        }
      }
    },
  },
  plugins: [],
}
