/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // Inserted object starts here
        "main-bg-color": "var(--main-bg-color)",
        "page-bg-color": "var(--page-bg-color)",
        "secondary-accent-color": "var(--secondary-accent-color)",
        "icon-fill-color": "var(--icon-fill-color)",
        "active-color": "var(--active-color)",
        "nav-header-bg": "var(--nav-header-bg)",
        "nav-items-text": "var(--nav-items-text)",
        "nav-items-title": "var(--nav-items-title)",
        "nav-item-border-color": "var(--nav-item-border-color)",
        "cat-div-hover-bg": "var(--cat-div-hover-bg)",
        "on-div-hover-icon-color": "var(--on-div-hover-icon-color)",
        "category-selected-bg-color": "var(--category-selected-bg-color)",
        "subCat-li-hover-text": "var(--subCat-li-hover-text)",
        "field-text-color": "var(--field-text-color)",
        "bar-color": "var(--bar-color)",
        "grayed-out-text-color": "var(--grayed-out-text-color)",
        // Inserted object ends here
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
