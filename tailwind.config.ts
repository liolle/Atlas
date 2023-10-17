/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}"
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            colors: {
                bgc: "rgba(var(--color-background), <alpha-value>)",
                fgc: "rgba(var(--color-foreground), <alpha-value>)",
                content: "rgba(var(--color-content), <alpha-value>)",
                primary: {
                    DEFAULT: "rgba(var(--color-primary), <alpha-value>)",
                    foreground:
                        "rgba(var(--color-primary-foreground), <alpha-value>)"
                },
                secondary: {
                    DEFAULT: "rgba(var(--color-secondary), <alpha-value>)",
                    foreground:
                        "rgba(var(--color-secondary-foreground), <alpha-value>)"
                },
                accent: {
                    1: "rgba(var(--color-accent-main), <alpha-value>)",
                    2: "rgba(var(--color-accent-alt), <alpha-value>)"
                },
                message: {
                    info: "rgba(var(--color-info), <alpha-value>)",
                    error: "rgba(var(--color-error), <alpha-value>)",
                    warning: "rgba(var(--color-warning), <alpha-value>)",
                    success: "rgba(var(--color-success), <alpha-value>)"
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            }
        }
    },
    plugins: [require("tailwindcss-animate")]
};
