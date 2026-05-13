import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        headline: ['Cabin Sketch', 'system-ui', 'sans-serif'],
        body: ['Sora', 'system-ui', 'sans-serif'],
      },
      colors: {
        uxsg: {
          ink: 'var(--uxsg-ink)',
          paper: 'var(--uxsg-paper)',
          yellow: 'var(--uxsg-yellow)',
          teal: 'var(--uxsg-teal)',
          white: 'var(--uxsg-white)',
          'sticky-blue': 'var(--uxsg-sticky-blue)',
          rsvp: 'var(--uxsg-rsvp)',
        },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float-1": {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "25%": { transform: "translate(8px, -10px)" },
          "50%": { transform: "translate(-6px, -8px)" },
          "75%": { transform: "translate(-10px, 6px)" },
        },
        "float-2": {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "25%": { transform: "translate(-12px, 8px)" },
          "50%": { transform: "translate(10px, 10px)" },
          "75%": { transform: "translate(6px, -12px)" },
        },
        "float-3": {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "33%": { transform: "translate(9px, 11px)" },
          "66%": { transform: "translate(-11px, -7px)" },
        },
        /** Sketchy nav underline: draw + release loop; pair with --rough-len (path length in px). */
        "rough-underline-a": {
          "0%, 100%": { strokeDashoffset: "var(--rough-len)" },
          "38%": { strokeDashoffset: "0" },
          "52%": { strokeDashoffset: "0" },
          "94%": { strokeDashoffset: "var(--rough-len)" },
        },
        "rough-underline-b": {
          "0%, 100%": { strokeDashoffset: "var(--rough-len)" },
          "42%": { strokeDashoffset: "0" },
          "48%": { strokeDashoffset: "0" },
          "91%": { strokeDashoffset: "var(--rough-len)" },
        },
        /** Summit /summit: soft yellow halo under the native cursor */
        "summit-pointer-glow-pulse": {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.9)" },
          "50%": { opacity: "0.72", transform: "scale(1.06)" },
        },
        /** Summit 2026 hero: halo behind the gold “X” (smaller than static scale-150, obvious breathe) */
        "summit-hero-x-glow-pulse": {
          "0%, 100%": { opacity: "0.42", transform: "scale(1.05)" },
          "50%": { opacity: "0.8", transform: "scale(1.2)" },
        },
        /** Hero CTA: single-pass wiggle on hover (rotation only; parent handles scale). */
        "summit-ticket-wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "18%": { transform: "rotate(-5deg)" },
          "36%": { transform: "rotate(5deg)" },
          "54%": { transform: "rotate(-3deg)" },
          "72%": { transform: "rotate(3deg)" },
        },
        /** Facilitator modal pin: on-open hint nudge so users notice it's grabbable. Composed with the base translate-x(-50%) + rotate via custom property fallback. */
        "summit-pin-hint": {
          "0%, 100%": { translate: "0 0" },
          "20%": { translate: "0 4px" },
          "40%": { translate: "0 0" },
          "60%": { translate: "0 3px" },
          "80%": { translate: "0 0" },
        },
        /** Facilitator modal "drag to close" tooltip pulse. */
        "summit-pin-tooltip-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(2px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-1": "float-1 var(--duration, 15s) ease-in-out infinite",
        "float-2": "float-2 var(--duration, 18s) ease-in-out infinite",
        "float-3": "float-3 var(--duration, 20s) ease-in-out infinite",
        "rough-underline-a":
          "rough-underline-a 3.45s cubic-bezier(0.45, 0.05, 0.25, 1) infinite",
        "rough-underline-b":
          "rough-underline-b 2.78s cubic-bezier(0.4, 0.15, 0.35, 1) infinite",
        "summit-pointer-glow-pulse":
          "summit-pointer-glow-pulse 3s ease-in-out infinite",
        "summit-hero-x-glow-pulse":
          "summit-hero-x-glow-pulse 2s ease-in-out infinite",
        "summit-ticket-wiggle":
          "summit-ticket-wiggle 0.55s ease-in-out 1",
        "summit-pin-hint":
          "summit-pin-hint 1.4s ease-in-out 2",
        "summit-pin-tooltip-pulse":
          "summit-pin-tooltip-pulse 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
