import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import StockDetail from '../views/StockDetail.vue';
import FavouriteStock from '../views/FavouriteStock.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/stock/:symbol', name: 'StockDetail', component: StockDetail },
  { path: '/my-favourite-stock', name: 'MyFavouriteStock', component: FavouriteStock },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
