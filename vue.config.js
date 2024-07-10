const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pwa: {
    name: 'Daily Inspiration App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    manifestOptions: {
      name: 'Daily Inspiration App',
      short_name: 'DI',
      description: 'Daily inspire app for journaling',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#4DBA87',
      icons: [
        {
          src: '/img/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/img/icons/android-chrome-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/img/icons/android-chrome-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/img/icons/apple-touch-icon-120x120.png',
          sizes: '120x120',
          type: 'image/png'
        },
        {
          src: '/img/icons/apple-touch-icon-152x152.png',
          sizes: '152x152',
          type: 'image/png'
        },
        {
          src: '/img/icons/apple-touch-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: '/img/icons/apple-touch-icon-76x76.png',
          sizes: '76x76',
          type: 'image/png'
        },
        {
          src: '/img/icons/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: '/img/icons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          src: '/img/icons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          src: '/img/icons/msapplication-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/img/icons/mstile-150x150.png',
          sizes: '150x150',
          type: 'image/png'
        }
      ]
    },
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://(newsapi.org|api.api-ninjas.com)/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 6 * 60 * 60
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
})
