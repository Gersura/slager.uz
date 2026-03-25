module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1a1a1a",
        code: "#151922",
        selection: "#f0c48e",
        subtle: "#9ca3b0",
        linkline: "#737373",
        accent: "#ff8b16",
        separator: "#242424",
      },
      textColor: {
        primary: "#f2f2f2",
        secondary: "#eaeaea",
        tertiary: "#8b93a1",
        subtle: "#9ca3b0",
      },
      gridTemplateColumns: {
        "20-80": "60% 40%",
        "118-auto": "118px auto",
        auto: "auto",
      },
      gridColumn: {
        1: "1",
      },
      gridRow: {
        1: "1",
      },
      gridTemplateRows: {
        auto: "auto",
      },
      height: {
        400: "400px",
      },
      animation: {
        enter: "enter 1s ease-out",
      },
      keyframes: {
        enter: {
          "0%": {
            opacity: "0",
            transform: "translateY(-4px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },

    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "\"Segoe UI\"",
        "sans-serif",
      ],
    },
    maxWidth: {
      "container-large": "760px",
      "container-small": "92%",
      256: "256px",
    },
    maxHeight: {
      image: "200px",
      256: "256px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
