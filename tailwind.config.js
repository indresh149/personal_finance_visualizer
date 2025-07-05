/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // blue-600
        'primary-foreground': '#FFFFFF', // white
        
        // Secondary Colors
        'secondary': '#64748B', // slate-500
        'secondary-foreground': '#FFFFFF', // white
        
        // Accent Colors
        'accent': '#10B981', // emerald-500
        'accent-foreground': '#FFFFFF', // white
        
        // Background Colors
        'background': '#FAFBFC', // gray-50
        'surface': '#FFFFFF', // white
        
        // Text Colors
        'text-primary': '#1E293B', // slate-800
        'text-secondary': '#64748B', // slate-500
        
        // Status Colors
        'success': '#059669', // emerald-600
        'success-foreground': '#FFFFFF', // white
        'warning': '#D97706', // amber-600
        'warning-foreground': '#FFFFFF', // white
        'error': '#DC2626', // red-600
        'error-foreground': '#FFFFFF', // white
        
        // Border Colors
        'border': '#E2E8F0', // slate-200
        'border-light': '#F1F5F9', // slate-100
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-medium': '500',
        'heading-semibold': '600',
        'body-normal': '400',
        'body-medium': '500',
        'data-normal': '400',
      },
      boxShadow: {
        'financial-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'financial-md': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'financial-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        'financial': '8px',
      },
      transitionDuration: {
        'financial': '200ms',
      },
      transitionTimingFunction: {
        'financial': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        'header-desktop': '64px',
        'header-mobile': '56px',
      },
      zIndex: {
        'header': '1000',
        'dropdown': '1100',
        'modal': '1200',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}