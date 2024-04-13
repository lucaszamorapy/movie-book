export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1220px",
        "2xl": "1220px",
      },
      colors: {
        blueMovie: "#12182B",
        blueMovie100: "#324170",
        greenMovie: "#69FAB4",
        yellowMovie: "#FFC700",
        cianMovie: "#E7ECFF",
      },
    },
  },
  plugins: [],
};
