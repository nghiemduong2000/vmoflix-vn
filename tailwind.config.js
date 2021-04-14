module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#F37001',
          hard: '#c95c00',
          md: '#ffa85e',
          l: '#facb9d',
        },
        white: {
          DEFAULT: '#FFFFFF',
          custom: '#F8F7F9',
        },
        yellow: {
          custom: '#ffd04f',
        },
        purple: {
          custom: '#7f6594',
        },
        black: {
          DEFAULT: '#000',
          body: '#141414',
          navbar: '#0c0c0c',
        },
        red: {
          primary: '#E53B13',
          'primary-d': '#b32e0e',
        },
        gray: {
          primary: '#8c8c8c',
          'primary-d': '#333',
        },
      },
      spacing: {
        '1rem': '1rem',
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
        '4.5rem': '4.5rem',
        '5rem': '5rem',
        '6rem': '6rem',
        '6.8rem': '6.8rem',
        '7rem': '7rem',
        '8rem': '8rem',
        '9rem': '9rem',
        '10rem': '10rem',
        '12rem': '12rem',
        '14rem': '14rem',
        '16rem': '16rem',
        '18rem': '18rem',
        '20rem': '20rem',
        '30rem': '30rem',
        '35rem': '35rem',
        '40rem': '40rem',
        '50rem': '50rem',
        '60rem': '60rem',
        '70rem': '70rem',
        '80rem': '80rem',
        '90rem': '90rem',
        '100rem': '100rem',
      },
      fontSize: {
        14: '1.4rem',
        16: '1.6rem',
        18: '1.8rem',
        20: '2rem',
        22: '2.2rem',
        24: '2.4rem',
        26: '2.6rem',
        28: '2.8rem',
        30: '3rem',
        40: '4rem',
        50: '5rem',
        56: '5.6rem',
        100: '10rem',
      },
      boxShadow: {
        'inner-md': 'inset 0 2px 8px 0 rgba(173, 80, 0, 0.8)',
        custom: '0px 2px 8px 3px rgba(0, 0, 0, 0.2)',
      },
      lineHeight: {
        100: '10rem',
        50: '5rem',
        40: '4rem',
        56: '5.6rem',
      },
      zIndex: {
        negative1: '-1',
        1: '1',
        2: '2',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
    },
  },
  plugins: [],
};
