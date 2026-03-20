import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import CountryPage from './pages/CountryPage.vue'
import VisitedPage from './pages/VisitedPage.vue'
import FlagQuizPage from './pages/FlagQuizPage.vue'
import CapitalQuizPage from './pages/CapitalQuizPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/country/:code',
    component: CountryPage,
  },
  {
    path: '/visited',
    component: VisitedPage,
  },
  {
    path: '/flag-quiz',
    component: FlagQuizPage,
  },
  {
    path: '/capital-quiz',
    component: CapitalQuizPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
