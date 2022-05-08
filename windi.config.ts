function range(size: number, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt);
}

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    range(12).map((i) => `gap-${i}`),
    range(7).map((i) => `grid-rows-${i}`),
    range(12).map((i) => `grid-cols-${i}`),
  ],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
