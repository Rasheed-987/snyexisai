/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        
        // Design system colors
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        muted: "var(--muted)",
        background: "var(--background)", 
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        
       
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        black: "var(--black)",
        white: "var(--white)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Chillax", "sans-serif"],
        chillax: ["Chillax", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        'btn': ['13.78px', '21px'],
        'nav': ['14.78px', '34.19px'],
      },
      letterSpacing: {
        'nav': '0.57px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.btn-chillax': {
          fontFamily: 'Chillax, sans-serif',
          fontWeight: '400',
          fontSize: '13.78px',
          lineHeight: '21px',
          letterSpacing: '0%',
          textAlign: 'center',
          verticalAlign: 'middle',
        },
        '.nav-chillax': {
          fontFamily: 'Chillax, sans-serif',
          fontWeight: '600',
          fontSize: '14.78px',
          lineHeight: '34.19px',
          letterSpacing: '0.57px',
          verticalAlign: 'middle',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}