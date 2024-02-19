export default [
  { UserAgent: '*' },
  { Disallow: '/admin' },
  { Disallow: '/nuxt' },
  { Disallow: '/admin/delivery-static' },
  { Disallow: '/admin/media/cv' },
  { Disallow: '/payment' },
  { Disallow: '/checkout' },
  { Disallow: '/cart' },

  { Sitemap: () => 'https://stanislavbartnikas.com/sitemap.xml' }
]
