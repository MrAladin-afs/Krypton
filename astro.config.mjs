import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://services.kryptongame.com",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    icon(),
    react(),
    partytown({
      // Configure partytown
      config: {
        forward: ["dataLayer.push"], // Forward any GTM events if needed
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Allow remote images from YouTube
    domains: ["i.ytimg.com", "img.youtube.com"],
    // Set default format to modern formats
    format: "avif",
  },
});
