import { createRouter, createWebHashHistory} from 'vue-router'
import App from '../App.vue'

const routes = [
  {
    path: '/',
    component: App,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../src/views/home.vue'),
      }
    ]
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router