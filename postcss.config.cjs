module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.REACT_APP_NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
