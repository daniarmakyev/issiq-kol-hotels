import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#2A90D9',
        orange: '#EE685F',
        dark: '#262729',
      },
      container: {
        center: true,
        padding: '10px',
      },
    },
  },
  plugins: [],
}

export default config
