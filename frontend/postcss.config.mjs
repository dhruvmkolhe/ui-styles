// Tailwind v4 is handled via @tailwindcss/vite plugin — no PostCSS config needed.
// This file exists to prevent postcss-load-config from walking up and picking up
// the root postcss.config.mjs (which uses Tailwind v3).
const config = {
  plugins: {},
};

export default config;
