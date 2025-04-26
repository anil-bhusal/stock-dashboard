<template>
  <div class="my-6">
    <h4 class="text-lg font-semibold mb-2">📉 Financial Chart (Example)</h4>
    <canvas ref="financialChartRef" class="financial-chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import type { StockDetail } from '../../types/StockDetail';

Chart.register(...registerables);

const props = defineProps<{ stock: StockDetail }>();
const financialChartRef = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
  await nextTick();

  const ctx = financialChartRef.value?.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['PE Ratio', 'PEG Ratio', 'EPS'],
        datasets: [{
          label: 'Financial Chart',
          data: [
            parseFloat(props.stock.PERatio),
            parseFloat(props.stock.PEGRatio),
            parseFloat(props.stock.EPS)
          ],
          backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        }
      }
    });
  }
});
</script>

<style scoped>
.financial-chart {
  width: 70% !important;
  height: 500px !important;
  margin: 0 auto;
}
</style>