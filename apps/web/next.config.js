const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'unsplash.com',
      'randomuser.me',
      'res.cloudinary.com',
    ],
  },
  webpack(config) {
    config.resolve.alias['@assets'] = path.join(__dirname, 'apps/web/assets')
    return config
  },
}

module.exports = nextConfig

