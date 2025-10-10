import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_astro/
Disallow: /404

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Sitemaps
Sitemap: https://blog.kryptongame.com/sitemap-index.xml
Sitemap: https://blog.kryptongame.com/sitemap.xml

# Host directive
Host: https://blog.kryptongame.com`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
