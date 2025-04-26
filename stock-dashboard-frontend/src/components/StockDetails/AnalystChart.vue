<template>
  <div class="my-6">
    <h4 class="text-lg font-semibold mb-2">📊 Analyst Ratings</h4>
    <canvas ref="analystChartRef" class="analyst-chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import type { StockDetail } from '../../types/StockDetail';

Chart.register(...registerables);

const props = defineProps<{ stock: StockDetail }>();
const analystChartRef = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
  await nextTick();

  const ctx = analystChartRef.value?.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
        datasets: [{
          label: 'Ratings',
          data: [
            parseInt(props.stock.AnalystRatingStrongBuy),
            parseInt(props.stock.AnalystRatingBuy),
            parseInt(props.stock.AnalystRatingHold),
            parseInt(props.stock.AnalystRatingSell),
            parseInt(props.stock.AnalystRatingStrongSell)
          ],
          backgroundColor: ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Analyst Ratings Distribution' }
        }
      }
    });
  }
});
</script>

<style scoped>
.analyst-chart {
  width: 500px !important;
  /* Fixed width */
  height: 500px !important;
  /* Fixed height, same as width for a circle */
  margin: 0 auto;
}
</style>