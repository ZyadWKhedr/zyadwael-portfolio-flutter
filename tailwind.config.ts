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
				DEFAULT: '1.25rem', // 20px on mobile
				md: '1.75rem',      // 28px on tablet
				lg: '2.5rem',       // 40px on desktop
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1160px',
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				display: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				serif: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
				arabic: ['Cairo', 'system-ui', 'sans-serif'],
			},
			colors: {
				canvas: 'var(--bg-canvas)',
				surface: 'var(--bg-surface)',
				elevated: 'var(--bg-elevated)',
				'surface-hover': 'var(--bg-hover)',
				'border-subtle': 'var(--border-subtle)',
				'border-strong': 'var(--border)',
				border: 'var(--border-subtle)',
				ink: 'var(--text-primary)',
				'ink-secondary': 'var(--text-secondary)',
				'ink-muted': 'var(--text-muted)',
				'ink-faint': 'var(--text-muted)',
				accent: {
					DEFAULT: 'var(--accent)',
					hover: 'var(--accent-hover)',
					muted: 'var(--accent-muted)',
					subtle: 'var(--accent-muted)',
					fg: 'var(--accent-fg)',
				},
				success: 'var(--success)',
				error: 'var(--error)',
				background: 'var(--bg-canvas)',
				foreground: 'var(--text-primary)',
			},
			maxWidth: {
				site: '1160px',
				reading: '720px',
			},
			borderRadius: {
				sm: 'var(--radius-sm)',
				md: 'var(--radius-md)',
				lg: 'var(--radius-lg)',
				xl: 'var(--radius-xl)',
				pill: 'var(--radius-pill)',
			},
			boxShadow: {
				subtle: '0 1px 2px rgba(0,0,0,0.05)',
				card: '0 2px 8px -1px rgba(0,0,0,0.06), 0 1px 3px -1px rgba(0,0,0,0.04)',
			},
			transitionTimingFunction: {
				standard: 'cubic-bezier(0.2, 0, 0, 1)',
				enter: 'cubic-bezier(0, 0, 0.2, 1)',
				exit: 'cubic-bezier(0.4, 0, 1, 1)',
			},
			transitionDuration: {
				instant: '100ms',
				fast: '150ms',
				normal: '220ms',
				medium: '320ms',
				slow: '450ms',
			}
		}
	},
	plugins: [],
} satisfies Config;
