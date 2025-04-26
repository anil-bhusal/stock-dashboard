<template>
  <div class="stock-detail">
    <button class="back-button" @click="$router.back()">⬅ Back to Stocks</button>

    <div v-if="loading" class="status-card">Loading stock detail...</div>
    <div v-else-if="!stock" class="status-card not-found">Stock not found.</div>

    <div v-else class="card">
      <div class="header">
        <h2>{{ stock.Name }} <span class="symbol">({{ stock.Symbol }})</span></h2>
        <p class="description">{{ stock.Description }}</p>
      </div>

      <div class="info-grid">
        <CompanyInfo :stock="stock" />
        <Financials :stock="stock" />
        <AnalystInsights :stock="stock" />
      </div>

      <div class="charts">
        <FinancialChart :stock="stock" />
        <AnalystChart :stock="stock" />
      </div>

      <div class="footer">
        <a v-if="stock.OfficialSite" :href="stock.OfficialSite" target="_blank">
          🌐 Visit Official Site
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { StockDetail } from '../types/StockDetail';
import axiosInstance from '../utils/axios';
import CompanyInfo from '../components/StockDetails/CompanyInfo.vue';
import Financials from '../components/StockDetails/Financials.vue';
import AnalystInsights from '../components/StockDetails/AnalystInsights.vue';
import FinancialChart from '../components/StockDetails/FinancialChart.vue';
import AnalystChart from '../components/StockDetails/AnalystChart.vue';

const stock = ref<StockDetail | null>(null);
const loading = ref(true);
const route = useRoute();

const fetchStockDetail = async () => {
  try {
    const symbol = route.params.symbol;
    const res = await axiosInstance.get(`/stocks/${symbol}`);
    stock.value = res.data;
  } catch (err) {
    console.error('Failed to load stock detail', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStockDetail);
</script>

<style scoped>
/* Light & dark mode variables */
:root {
  --bg: #ffffff;
  --text: #2c3e50;
  --muted: #666;
  --subtle: #888;
  --card: #f9f9f9;
  --border: #e0e0e0;
  --accent: #3498db;
  --error: #b30000;
  --error-bg: #ffe6e6;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1e1e1e;
    --text: #f0f0f0;
    --muted: #aaa;
    --subtle: #bbb;
    --card: #2c2c2c;
    --border: #3a3a3a;
    --accent: #4aa8ff;
    --error: #ff8c8c;
    --error-bg: #3a1a1a;
  }
}

.stock-detail {
  background: var(--bg);
  color: var(--text);
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.back-button {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: color 0.3s;
}

.back-button:hover {
  color: darken(var(--accent), 10%);
}

.status-card {
  background-color: var(--card);
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid var(--border);
  color: var(--text);
}

.status-card.not-found {
  background-color: var(--error-bg);
  color: var(--error);
}

.card {
  background-color: var(--card);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header h2 {
  font-size: 28px;
  margin-bottom: 5px;
}

.header .symbol {
  font-size: 20px;
  color: var(--subtle);
}

.description {
  font-size: 14px;
  color: var(--muted);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(520px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1040px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .charts {
    grid-template-columns: 1fr;
  }
}

.footer {
  margin-top: 30px;
  text-align: center;
}

.footer a {
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s;
}

.footer a:hover {
  opacity: 0.8;
}
</style>
