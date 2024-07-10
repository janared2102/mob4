import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import SharedDataView from '../views/SharedDataView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView
    },
    {
      path: '/:type/:id',
      name: 'sharedData',
      component: SharedDataView,
      props: true
    }
  ]
})

export default router
