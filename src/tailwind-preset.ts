import type { Config } from 'tailwindcss'
// import animate from 'tailwindcss-animate'
// import scrollbar from 'tailwind-scrollbar'

export default {
  darkMode: ['class'],

  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}'
  ],

  safelist: ['dark'],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        sidebar: 'hsl(var(--side-bar))',
        'tabs-sidebar': 'hsl(var(--tabs-sidebar))',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
        },
        'primary-hover': {
          DEFAULT: 'hsl(var(--primary-hover))'
        },
        'primary-active': {
          DEFAULT: 'hsl(var(--primary-active))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))'
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))'
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'card-shadow': '0px 4px 8px 0px hsl(var(--card-shadow))',
        'tab-shadow':
          '0px 2px 4px 0px hsl(var(--tab-shadow)), 0px 4px 4px 0px hsl(var(--tab-shadow))',
        'top-shadow': '0px -2px 4px 0px hsl(var(--tab-shadow))',
        level1:
          '0px 16px 16px 0px hsl(var(--tab-shadow)), 0px 8px 16px 0px hsl(var(--tab-shadow)), 0px 8px 8px 0px hsl(var(--tab-shadow))',
        level2:
          '0px 32px 16px 0px hsl(var(--tab-shadow)), 0px 16px 16px 0px hsl(var(--tab-shadow)), 0px 16px 16px 0px hsl(var(--tab-shadow))',
        level3:
          '0px 56px 24px 0px hsl(var(--tab-shadow)), 0px 32px 24px 0px hsl(var(--tab-shadow)), 0px 32px 24px 0px hsl(var(--tab-shadow))',
        'tab-sidebar-shadow': 'inset -8px 0px 16px 0px hsl(var(--tabs-sidebar-shadow))'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--reka-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--reka-accordion-content-height)' },
          to: { height: '0' }
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--reka-collapsible-content-height)' }
        },
        'collapsible-up': {
          from: { height: 'var(--reka-collapsible-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out'
      },
      backgroundImage: {
        logo: "url('/src/assets/logo-full.png')",
        'logo-dark': "url('/src/assets/logo-full-dark.png')"
      }
    }
  },
  // plugins: [animate, scrollbar]
  plugins: []
} satisfies Config
