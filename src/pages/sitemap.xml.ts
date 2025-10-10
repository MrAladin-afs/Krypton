import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const blogPosts = await getCollection('blog', ({ data }) => {
    return !data.draft && data.publishDate < new Date();
  });

  const staticPages = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/pricing',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticPages.map(page => `  <url>
    <loc>${site}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
${blogPosts.map(post => `  <url>
    <loc>${site}/blog/${post.slug}</loc>
    <lastmod>${post.data.publishDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    ${post.data.image ? `<image:image>
      <image:loc>${post.data.image.src.startsWith('http') ? post.data.image.src : site + post.data.image.src}</image:loc>
      <image:title>${post.data.title}</image:title>
      <image:caption>${post.data.image.alt}</image:caption>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
