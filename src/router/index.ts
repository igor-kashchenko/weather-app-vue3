import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CityView from '@/views/CityView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/cityWeather/:name', component: CityView }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;