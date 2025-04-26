<template>
  <div>
    <h4 class="text-lg font-semibold mb-2">💰 Financials</h4>
    <p><strong>Market Cap:</strong> {{ stock.MarketCapitalization }}</p>
    <p><strong>PE Ratio:</strong> {{ stock.PERatio }}</p>
    <p><strong>PEG Ratio:</strong> {{ stock.PEGRatio }}</p>
    <p><strong>EPS:</strong> {{ stock.EPS }}</p>
    <p><strong>Dividend Per Share:</strong> {{ stock.DividendPerShare }}</p>
    <p><strong>Dividend Yield:</strong> {{ stock.DividendYield }}</p>
  </div>
</template>

<script setup lang="ts">
import type { StockDetail } from '../../types/StockDetail';
defineProps<{ stock: StockDetail }>();
</script>