import { config } from 'dotenv'

config()

export default {
  site: {
    url: process.env.SITE_URL || 'https://example.com',
    title: process.env.SITE_NAME || 'Creed Thoughts',
    description: process.env.SITE_DESCRIPTION || 'Creed Bratton personal blog',
    logo: process.env.SITE_URL + '/public/img/logo.jpg'
  },
  organization: {
    logo: process.env.SITE_URL + '/public/img/logo-600x60.jpg'
  },
  author: {
    name: process.env.SITE_AUTHOR || 'Creed Bratton',
    url: process.env.SITE_URL || 'https://example.com'
  }
}
