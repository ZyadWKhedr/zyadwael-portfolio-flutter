import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				lg: '2rem',
				xl: '2.5rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1380px',
			}
		},
		extend: {
			fontFamily: {
				serif: ['Fraunces', 'Georgia', 'serif'],
				sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
			},
			colors: {
				canvas: 'var(--bg-canvas)',
				surface: 'var(--bg-surface)',
				elevated: 'var(--bg-elevated)',
				'border-subtle': 'var(--border-subtle)',
				'border-strong': 'var(--border-strong)',
				ink: 'var(--text-ink)',
				'ink-muted': 'var(--text-muted)',
				'ink-faint': 'var(--text-faint)',
				accent: {
					DEFAULT: 'var(--accent)',
					hover: 'var(--accent-hover)',
					subtle: 'var(--accent-subtle)',
					fg: 'var(--accent-fg)',
				},
				// Retain standard semantic tokens for compatibility
				border: 'var(--border-subtle)',
				input: 'var(--border-strong)',
				ring: 'var(--accent)',
				background: 'var(--bg-canvas)',
				foreground: 'var(--text-ink)',
			},
			boxShadow: {
				'subtle': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
				'card': '0 4px 16px -2px rgba(0,0,0,0.06), 0 2px 6px -1px rgba(0,0,0,0.03)',
				'card-hover': '0 12px 28px -4px rgba(0,0,0,0.1), 0 4px 10px -2px rgba(0,0,0,0.04)',
			},
			transitionTimingFunction: {
				'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
			},
			transitionDuration: {
				'200': '200ms',
				'240': '240ms',
			}
		}
	},
	plugins: [],
} satisfies Config;
