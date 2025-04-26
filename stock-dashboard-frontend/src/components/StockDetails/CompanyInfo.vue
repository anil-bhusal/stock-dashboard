<template>
  <div>
    <h4>📊 Company Info</h4>
    <p><strong>Sector:</strong> {{ stock.Sector }}</p>
    <p><strong>Industry:</strong> {{ stock.Industry }}</p>
    <p><strong>Exchange:</strong> {{ stock.Exchange }} ({{ stock.Currency }})</p>
    <p><strong>Country:</strong> {{ stock.Country }}</p>
    <p><strong>Address:</strong> {{ stock.Address }}</p>
  </div>
</template>

<script setup lang="ts">
import { StockDetail } from '../../types/StockDetail';

defineProps<{ stock: StockDetail }>();
</script>