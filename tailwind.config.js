const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    // TODO create dark theme
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
                mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                // backgrounds
                'page': 'rgb(var(--color-page) / <alpha-value>)',
                'content': 'rgb(var(--color-content) / <alpha-value>)',
                'overlay': 'rgb(var(--color-overlay) / <alpha-value>)',

                // fonts
                'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
                'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
                'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
                'text-accent': 'rgb(var(--color-text-accent) / <alpha-value>)',
                'text-success': 'rgb(var(--color-text-success) / <alpha-value>)',
                'text-danger': 'rgb(var(--color-text-danger) / <alpha-value>)',

                // borders
                'border': 'rgb(var(--color-border) / <alpha-value>)',

                // buttons
                'button-primary': 'rgb(var(--color-button-primary) / <alpha-value>)',
                'button-secondary': 'rgb(var(--color-button-secondary) / <alpha-value>)',
                'button-danger': 'rgb(var(--color-button-danger) / <alpha-value>)',
            }
        },
    },
    plugins: [],
}