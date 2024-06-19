/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.jsx","./src/components/*jsx"],
  theme: {
    extend: {
      fontFamily:{
        curry: ["Playwrite PL", "cursive"],
        curry2:["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}

