import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
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
      fontSize: {
        /* --------------------------------- display, same fontSize and lineHeight -------------------------------- */
        "display-2xs": ["var(--text-2xs)", "var(--text-2xs)"] /* 10px */,
        "display-xs": ["var(--text-xs)", "var(--text-xs)"] /* 12px */,
        "display-sm": ["var(--text-sm)", "var(--text-sm)"] /* 14px */,
        "display-md": ["var(--text-md)", "var(--text-md)"] /* 16px */,
        "display-lg": ["var(--text-lg)", "var(--text-lg)"] /* 18px */,
        "display-xl": ["var(--text-xl)", "var(--text-xl)"] /* 20px */,
        "display-2xl": ["var(--text-2xl)", "var(--text-2xl)"] /* 24px */,
        "display-3xl": [
          /* 32px */ "var(--text-3xl)",
          {
            lineHeight: "var(--text-3xl)",
            letterSpacing: "-0.031rem",
          },
        ],
        "display-4xl": [
          /* 48px */ "var(--text-4xl)",
          {
            lineHeight: "var(--text-4xl)",
            letterSpacing: "-0.063rem",
          },
        ],
        "display-5xl": [
          /* 56px */ "var(--text-5xl)",
          {
            lineHeight: "var(--text-5xl)",
            letterSpacing: "-0.094rem",
          },
        ],
        "display-6xl": [
          /* 64px */ "var(--text-6xl)",
          {
            lineHeight: "var(--text-6xl)",
            letterSpacing: "-0.125rem",
          },
        ],
        "display-7xl": [
          /* 72px */ "var(--text-7xl)",
          {
            lineHeight: "var(--text-7xl)",
            letterSpacing: "-0.156rem",
          },
        ],
        /* -------------------------------- paragraph, different fontSize and lineHeight ------------------------------- */
        "paragraph-xs": ["var(--text-xs)", "1rem"] /* 12px */,
        "paragraph-sm": ["var(--text-sm)", "1.25rem"] /* 14px */,
        "paragraph-md": ["var(--text-md)", "1.5rem"] /* 16px */,
        "paragraph-lg": ["var(--text-lg)", "1.75rem"] /* 18px */,
        "paragraph-xl": ["var(--text-xl)", "1.75rem"] /* 20px */,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

// theme: {
//     screens: {
//       xs: '23.4375rem' /*-- 375px --*/,
//       sm: '37.5rem' /*-- 600px --*/,
//       md: '55.625rem' /*-- 890px --*/,
//       lg: '68.75rem' /*-- 1100px --*/,
//       xl: '80rem' /*-- 1280px --*/,
//       '2xl': '96.125rem' /*-- 1538px --*/,
//     },
//     gradientColorStops: (theme: any) => ({
//       ...theme('colors'),
//       primary: '#3B10CC',
//       danger: '#D11F1F',
//     }),
//     extend: {
//       backgroundImage: {
//         'sidebar-vector': "url('/images/sidebar-bg.jpg')",
//         'bankCard-vector': "url('/images/BankCardSchemaBackground.jpg')",
//       },
//       backgroundPosition: {
//         'sidebar-bg-position': 'left -50px top -20px',
//         'bankCard-vector-position': 'left -50px top -20px',
//       },
//       colors: {
//         primary: {
//           DEFAULT: 'rgb(var(--primary-default))',
//           'on-hover': 'rgb(var(--primary-on-hover))',
//           80: 'rgb(var(--primary-80))',
//           60: 'rgb(var(--primary-60))',
//           40: 'rgb(var(--primary-40))',
//           20: 'rgb(var(--primary-20))',
//           10: 'rgb(var(--primary-10))',
//           5: 'rgb(var(--primary-5))',
//         },
//         secondary: {
//           DEFAULT: 'rgb(var(--secondary-default))',
//           80: 'rgb(var(--secondary-80))',
//           60: 'rgb(var(--secondary-60))',
//           40: 'rgb(var(--secondary-40))',
//           20: 'rgb(var(--secondary-20))',
//           10: 'rgb(var(--secondary-10))',
//           5: 'rgb(var(--secondary-5))',
//         },
//         success: {
//           DEFAULT: 'rgb(var(--success-default))',
//           80: 'rgb(var(--success-80))',
//           60: 'rgb(var(--success-60))',
//           40: 'rgb(var(--success-40))',
//           20: 'rgb(var(--success-20))',
//           10: 'rgb(var(--success-10))',
//           5: 'rgb(var(--success-5))',
//         },
//         error: {
//           DEFAULT: 'rgb(var(--error-default))',
//           80: 'rgb(var(--error-80))',
//           60: 'rgb(var(--error-60))',
//           40: 'rgb(var(--error-40))',
//           20: 'rgb(var(--error-20))',
//           10: 'rgb(var(--error-10))',
//         },
//         alert: {
//           DEFAULT: 'rgb(var(--alert-default))',
//           80: 'rgb(var(--alert-80))',
//           60: 'rgb(var(--alert-60))',
//           40: 'rgb(var(--alert-40))',
//           20: 'rgb(var(--alert-20))',
//           10: 'rgb(var(--alert-10))',
//         },
//         notice: {
//           DEFAULT: 'rgb(var(--notice-default))',
//           80: 'rgb(var(--notice-80))',
//           60: 'rgb(var(--notice-60))',
//           40: 'rgb(var(--notice-40))',
//           20: 'rgb(var(--notice-20))',
//           10: 'rgb(var(--notice-10))',
//         },
//         base: 'rgb(var(--text-color))',
//         inverted: 'rgb(var(--inverted-text-color))',
//         muted: 'rgb(var(--muted-text-color))',
//         body: 'rgb(var(--bg-color))',
//         box: 'rgb(var(--bg-box-color))',
//       },
//       fontSize: {
//         /* --------------------------------- display, same fontSize and lineHeight -------------------------------- */
//         'display-2xs': ['var(--text-2xs)', 'var(--text-2xs)'] /* 10px */,
//         'display-xs': ['var(--text-xs)', 'var(--text-xs)'] /* 12px */,
//         'display-sm': ['var(--text-sm)', 'var(--text-sm)'] /* 14px */,
//         'display-md': ['var(--text-md)', 'var(--text-md)'] /* 16px */,
//         'display-lg': ['var(--text-lg)', 'var(--text-lg)'] /* 18px */,
//         'display-xl': ['var(--text-xl)', 'var(--text-xl)'] /* 20px */,
//         'display-2xl': ['var(--text-2xl)', 'var(--text-2xl)'] /* 24px */,
//         'display-3xl': [
//           /* 32px */ 'var(--text-3xl)',
//           {
//             lineHeight: 'var(--text-3xl)',
//             letterSpacing: '-0.031rem',
//           },
//         ],
//         'display-4xl': [
//           /* 48px */ 'var(--text-4xl)',
//           {
//             lineHeight: 'var(--text-4xl)',
//             letterSpacing: '-0.063rem',
//           },
//         ],
//         'display-5xl': [
//           /* 56px */ 'var(--text-5xl)',
//           {
//             lineHeight: 'var(--text-5xl)',
//             letterSpacing: '-0.094rem',
//           },
//         ],
//         'display-6xl': [
//           /* 64px */ 'var(--text-6xl)',
//           {
//             lineHeight: 'var(--text-6xl)',
//             letterSpacing: '-0.125rem',
//           },
//         ],
//         'display-7xl': [
//           /* 72px */ 'var(--text-7xl)',
//           {
//             lineHeight: 'var(--text-7xl)',
//             letterSpacing: '-0.156rem',
//           },
//         ],
//         /* -------------------------------- paragraph, different fontSize and lineHeight ------------------------------- */
//         'paragraph-xs': ['var(--text-xs)', '1rem'] /* 12px */,
//         'paragraph-sm': ['var(--text-sm)', '1.25rem'] /* 14px */,
//         'paragraph-md': ['var(--text-md)', '1.5rem'] /* 16px */,
//         'paragraph-lg': ['var(--text-lg)', '1.75rem'] /* 18px */,
//         'paragraph-xl': ['var(--text-xl)', '1.75rem'] /* 20px */,
//       },
//       opacity: {
//         2: '.2',
//         5: '.5',
//         7: '.7',
//       },
//       boxShadow: {
//         card: '0px 8px 60px 0px rgba(0, 0, 0, 0.06)',
//       },
//       transitionProperty: {
//         lift: 'left',
//         spacing: 'margin, padding',
//       },
//       keyframes: {
//         'accordion-down': {
//           from: {height: '0'},
//           to: {height: 'var(--radix-accordion-content-height)'},
//         },
//         'accordion-up': {
//           from: {height: 'var(--radix-accordion-content-height)'},
//           to: {height: '0'},
//         },
//         'toast-rtl': {
//           '0%': {transform: 'translateX(400px)'},
//           '10%': {transform: 'translateX(0px)'},
//           '90%': {transform: 'translateX(0px)'},
//           '100%': {transform: 'translateX(400px)'},
//         },
//       },
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//         'toast-rtl': 'toast-rtl 5s alternate  ease-in-out  ',
//       },
//     },
//   },
