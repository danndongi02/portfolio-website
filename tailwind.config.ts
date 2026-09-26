import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			coral: '#ff4f33',
  			cream: '#f0ece6',
  			surface: '#0f0f12',
  			iron: '#1a1a1e',
  			void: '#08080a',
  			abyss: '#050507',
  			terminal: '#0a0c10',
  			// Text tiers — all ≥4.5:1 on void, surface, terminal and abyss
  			ash: '#aaaaaa',
  			steel: '#888888',
  			graphite: '#7e7e7e',
  			// Decorative-only type (aria-hidden, never carries meaning)
  			whisper: '#151518',
  			// Terminal-only status colours: title-bar dots and command output
  			signal: {
  				green: '#22c55e',
  				amber: '#f59e0b',
  			},
  		},
  		fontFamily: {
  			serif: ['var(--font-serif)', 'Instrument Serif', 'Playfair Display', 'serif'],
  			mono: ['var(--font-mono)', 'JetBrains Mono', 'Space Mono', 'monospace'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
