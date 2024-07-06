/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  output: 'standalone',

  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  },
  images: {
    domains: [
      'images.unsplash.com',
      'unsplash.com',
      'randomuser.me',
      'res.cloudinary.com',
    ],
  },
}

module.exports = nextConfig

