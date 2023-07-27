import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CityView from '@/views/CityView.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/cityWeather/:name', component: CityView },
  { path: '/home', redirect: '/' },
  { path: '/:notFound', component: NotFound, },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;