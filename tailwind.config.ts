import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        coral: '#FF5A5F',
        deep: '#222222',
        body: '#484848',
        muted: '#717171',
        surface: '#FFFFFF',
        app: '#F7F7F7',
        border: '#EBEBEB',
        success: '#008A05',
        warning: '#FFB400',
        error: '#D93025',
        hover: '#F2F2F2'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
