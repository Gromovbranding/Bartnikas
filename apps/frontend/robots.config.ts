export default [
  { UserAgent: '*' },
  { Disallow: '/admin' },
  { Disallow: '/nuxt' },

  { Sitemap: () => 'https://stanislavbartnikas.com/sitemap.xml' }
]
