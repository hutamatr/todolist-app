/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'neutral-900': '#18191F',
        'neutral-800': '#2F2F35',
        'neutral-700': '#44454A',
        'neutral-600': '#5B5B60',
        'neutral-500': '#707175',
        'neutral-400': '#D3D3D4',
        'neutral-300': '#DEDEDE',
        'neutral-200': '#EDEDED',
        'neutral-100': '#F7F7F7',
        'primary-100': '#FF844B',
        'primary-80': '#FF9D6F',
        'primary-50': '#FFC1A5',
        'primary-10': '#FFF3ED',
        'sub-primary-10': '#DBFFDF',
        'sub-primary-100': '#5BE26A'
      },
      boxShadow: {
        'material-shadow':
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
      },
      backgroundImage: {
        'ellipse-image': "url('/src/assets/images/Ellipse.svg')",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
