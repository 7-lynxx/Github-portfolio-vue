import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RepoDetail from '../views/RepoDetail.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/repo/:owner/:id', component: RepoDetail },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router