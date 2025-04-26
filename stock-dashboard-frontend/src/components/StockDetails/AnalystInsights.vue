<template>
  <div>
    <h4 class="text-lg font-semibold mb-2">📈 Analyst Insights</h4>
    <p><strong>Target Price:</strong> {{ stock.AnalystTargetPrice }}</p>
    <p><strong>Strong Buy:</strong> {{ stock.AnalystRatingStrongBuy }}</p>
    <p><strong>Buy:</strong> {{ stock.AnalystRatingBuy }}</p>
    <p><strong>Hold:</strong> {{ stock.AnalystRatingHold }}</p>
    <p><strong>Sell:</strong> {{ stock.AnalystRatingSell }}</p>
    <p><strong>Strong Sell:</strong> {{ stock.AnalystRatingStrongSell }}</p>
  </div>
</template>

<script setup lang="ts">
import type { StockDetail } from '../../types/StockDetail';
defineProps<{ stock: StockDetail }>();
</script>