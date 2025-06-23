module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'colorPapyrus': '#fdfde3'
      },
      backgroundImage: {
        'bgPapyrus': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAD////h4eHBwcHHx8fLy8vV1dXn5+fat7fq6urq6urp6enp6enq6urq6urp6enr6+vq6urq6uromy0dAAAADXRSTlMAEBAgIDM0QEFHT05R4vHxAAAAUUlEQVQYlWNgwA0EBjYmBjBgYGBgYmBgYGCZAQYGB4Z3CIgUICAiICDwIqwMDQYJDKAcPAmAluSFIAqwopsQwdQBiqAgAAMsWBNn2HwYkAAAAABJRU5ErkJggg==')",
      },
      fontFamily: {
        papyrus: ['Papyrus', 'cursive'],
      },
    },
  },
  plugins: [],
};
