import type { Config } from "tailwindcss"

const config = {
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
    fontSize: {
      xxs: ['12px', '8px'],
      sm: ['14px', '10px'],
      base: ['16px', '12px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      "2xl": ['32px', '40px'],
      "3xl": ['40px', '48px'],
      menuCard: ['1rem', '15px'],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        primaryHover: {
          DEFAULT: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-hover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        secondaryHover: {
          DEFAULT: "hsl(var(--secondary-hover))",
          foreground: "hsl(var(--secondary-hover-foreground))",
        },
        ghost: {
          DEFAULT: "hsl(var(--ghost))",
          foreground: "hsl(var(--ghost-foreground))",
        },
        ghostHover: {
          DEFAULT: "hsl(var(--ghost-hover))",
          foreground: "hsl(var(--ghost-hover-foreground))",
        },

        //MenuCard
        discountMenuCard: "hsl(var(--discount-menu-card-background))",
        standardMenuCard: "hsl(var(--standard-menu-card-background))",
        fullMenuCard: "hsl(var(--full-menu-card-background))",
        ghostMenuCard: "hsl(var(--ghost-menu-card-background))",

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config