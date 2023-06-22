/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    { pattern: /(bg|text|border|shadow|fill|from|to)-(indigo|amber|pink|teal)-(400|500|600|700)/, variants: ["hover", "focus", "sm", "md", "lg", "placeholder"] },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
