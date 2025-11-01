import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pomungyang.com'
  const routes = [
    '',
    '/characters',
    '/challenges',
    '/popup',
    '/tour',
    '/goods',
    '/mypage',
    '/support',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
