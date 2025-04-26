<template>
  <div class="dashboard">
    <h2 class="dashboard-title">📊 Stock Dashboard</h2>

    <LoadingState v-if="loading" />
    <NoStocksState v-else-if="stocks.length === 0" />
    <StockTable v-else :stocks="stocks" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '../utils/axios';
import { Stock } from '../types/Stock';
import LoadingState from '../components/StockDashboard/LoadingState.vue';
import NoStocksState from '../components/StockDashboard/NoStocksState.vue';
import StockTable from '../components/StockDashboard/StockTable.vue';


const loading = ref(true);
const stocks = ref<Stock[]>([]);

const fetchStocks = async () => {
  try {
    const res = await axiosInstance.get('/stocks');
    stocks.value = res.data;
  } catch (err) {
    console.error('Failed to load stocks', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStocks);
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--text-color);
}
</style>
