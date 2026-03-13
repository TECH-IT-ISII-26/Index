import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite"; // Nuovo modo per la v4

export default defineConfig({
  integrations: [react()], // Tailwind non va più qui!
  vite: {
    plugins: [tailwindcss()],
  },
});