/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This enables dark mode via a class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px', // Custom 'xs' breakpoint
        minlg: '1440px', // Custom 'minlg' breakpoint
        mdx: '1000px', // Custom 'mdx' breakpoint for 1000px
        phone: { min: '350px', max: '500px' }, // Custom 'phone' breakpoint
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "nft-gradient": "linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
      },
      colors: {
        'gray-800': '#1f2937',
        'gray-900': '#111827',
        'gray-950': '#0a0a0a',
        'slate-800': '#1e293b',
        'slate-900': '#0f172a',
        'slate-950': '#0a0a0a',
        'zinc-800': '#27272a',
        'zinc-900': '#18181b',
        'zinc-950': '#0a0a0a',
        'neutral-800': '#292524',
        'neutral-900': '#171717',
        'neutral-950': '#0a0a0a',
        'stone-800': '#1c1917',
        'stone-900': '#1c1917',
        'stone-950': '#0a0a0a',
        'black': '#000000',
        'regal-blue': '#243c5a',
        'nft-dark': '#24252D',
        'nft-dark-750':'#282828',
        'nft-dark-800': '#1a1a1a',
        'nft-dark-900': '#0d0d0d',
        'nft-dark-950': '#050505',
        'nft-black-1': '#2D2E36',
        'nft-black-2': '#1B1A21',
        'nft-black-3': '#2A2D3A',
        'nft-black-4': '#24252D',
        'nft-gray-1': '#d1d1d1',  // Added color, adjust value if needed
        'nft-gray-2': '#a3a3a3',  // New color, adjust value if needed
        'nft-dark-gray-2': '#2d2d2d', // New color, adjust value if needed
        'nft-gray-3': '#4F4F4F',
        'nft-red-violet': '#DA18A3',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      padding: {
        'mobile': '0.5 rem', // Adjust as needed for mobile screens
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '@media (max-width: 480px)': {
          '.custom-mobile-padding': {
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
          },
        },
      });
    },
  ],
};
