module.exports = {
  mode: 'jit',
  content: ['./views/**/*.{html,hbs}'],
  theme: {
    fontFamily: {
      primary: ['Times New Roman', 'serif'],
      secondary: ['Roboto', 'sans-serif']
    },
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1024px'
    },
    container: {
      center: true,
      padding: '2rem'
    }
  },
  variants: {},
  plugins: []
}
