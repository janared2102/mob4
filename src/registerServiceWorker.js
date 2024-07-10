/* Deaktiviert die ESLint-Regel für Konsolenausgaben */
/* eslint-disable no-console */

/* Importiert die register-Funktion aus dem register-service-worker Modul */
import { register } from 'register-service-worker'

/* Überprüft, ob die Anwendung im Produktionsmodus läuft */
if (process.env.NODE_ENV === 'production') {
  /* Registriert den Service Worker mit dem angegebenen Pfad */
  register(`${process.env.BASE_URL}service-worker.js`, {
    /* Callback, wenn der Service Worker bereit ist */
    ready () {
      console.log(
          'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    /* Callback, wenn der Service Worker registriert wurde */
    registered () {
      console.log('Service worker has been registered.')
    },
    /* Callback, wenn der Inhalt zwischengespeichert wurde */
    cached () {
      console.log('Content has been cached for offline use.')
    },
    /* Callback, wenn ein Update gefunden wurde */
    updatefound () {
      console.log('New content is downloading.')
    },
    /* Callback, wenn ein Update verfügbar ist */
    updated () {
      console.log('New content is available; please refresh.')
    },
    /* Callback, wenn keine Internetverbindung gefunden wurde und die App im Offline-Modus läuft */
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    /* Callback, wenn ein Fehler bei der Registrierung des Service Workers auftritt */
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
