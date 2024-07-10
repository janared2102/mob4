/* Importiert die notwendigen Funktionen und Komponenten für den Vue Router */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import SharedDataView from '../views/SharedDataView.vue'

/* Erstellt eine neue Router-Instanz */
const router = createRouter({
  /* Verwendet das HTML5-Historien-API für die Navigation */
  history: createWebHistory(process.env.BASE_URL),
  /* Definiert die Routen für die Anwendung */
  routes: [
    {
      /* Route für die Startseite */
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      /* Route für die Artikelseite */
      path: '/articles',
      name: 'articles',
      component: ArticlesView
    },
    {
      /* Route für die Ansicht geteilter Daten, mit dynamischen Parametern 'type' und 'id' */
      path: '/:type/:id',
      name: 'sharedData',
      component: SharedDataView,
      /* Aktiviert die Übergabe der Route-Parameter als Props an die Komponente */
      props: true
    }
  ]
})

/* Exportiert die Router-Instanz, damit sie in der Hauptanwendung verwendet werden kann */
export default router
