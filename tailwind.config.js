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
        'orange-100': '#FF844B',
        'orange-80': '#FF9D6F',
        'orange-50': '#FFC1A5',
        'orange-10': '#FFF3ED',
        'green-100': '#5BE26A',
        'green-10': '#DBFFDF',
        'blue-100': '#6599FE',
        'blue-10': '#EBF7FA',
        'red-100': '#FE6565',
        'red-10': '#FFF6E0',
        'purple-100': '#C659ED',
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
};
