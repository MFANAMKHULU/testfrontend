module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {
      flexbox: true,
      grid: true,
      browsers: ['>0.3%', 'not dead', 'not op_mini all', 'last 3 versions'],
    },
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
      browsers: ['>0.3%', 'not dead', 'not op_mini all', 'last 3 versions'],
    }
  },
} 