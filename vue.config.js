/* Importiert die defineConfig-Funktion von @vue/cli-service */
const { defineConfig } = require('@vue/cli-service')

/* Exportiert die Konfiguration für das Vue CLI-Projekt */
module.exports = defineConfig({
  /* Transpilieren von Abhängigkeiten aktivieren */
  transpileDependencies: true,
  /* Festlegung des öffentlichen Pfads abhängig vom Produktions- oder Entwicklungsmodus */
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  /* Konfiguration für die Progressive Web App (PWA) */
  pwa: {
    /* Name der Anwendung */
    name: 'Daily Inspiration App',
    /* Farbe des Themas */
    themeColor: '#4DBA87',
    /* Farbe der Kachel für Microsoft */
    msTileColor: '#000000',
    /* Einstellung für Apple Mobile Web App */
    appleMobileWebAppCapable: 'yes',
    /* Stil der Statusleiste für Apple Mobile Web App */
    appleMobileWebAppStatusBarStyle: 'white',
    /* Optionen für das Manifest */
    manifestOptions: {
      /* Vollständiger Name der Anwendung */
      name: 'Daily Inspiration App',
      /* Kurzname der Anwendung */
      short_name: 'DI',
      /* Beschreibung der Anwendung */
      description: 'Daily inspire app for journaling',
      /* Start-URL der Anwendung */
      start_url: '/',
      /* Anzeige-Modus der Anwendung */
      display: 'standalone',
      /* Hintergrundfarbe der Anwendung */
      background_color: '#ffffff',
      /* Farbe des Themas */
      theme_color: '#4DBA87',
      /* Icons für die Anwendung */
      icons: [
        {
          src: '/img/icons/android-chrome-192x192.png',
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
    /* Workbox-Optionen zur Konfiguration von Caching-Strategien */
    workboxOptions: {
      /* Laufzeit-Caching-Regeln */
      runtimeCaching: [
        {
          /* URL-Muster für das Caching */
          urlPattern: new RegExp('^https://(newsapi.org|api.api-ninjas.com)/'),
          /* Caching-Strategie: Zuerst aus dem Cache lesen */
          handler: 'CacheFirst',
          options: {
            /* Name des Caches */
            cacheName: 'api-cache',
            /* Ablaufoptionen für den Cache */
            expiration: {
              maxEntries: 60, /* Maximale Anzahl von Einträgen im Cache */
              maxAgeSeconds: 6 * 60 * 60 /* Maximale Lebensdauer der Einträge (in Sekunden) */
            },
            /* Cachebare Antworten basierend auf dem Statuscode */
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
})
