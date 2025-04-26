<template>
    <table class="stock-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Sector</th>
                <th>Industry</th>
                <th>Market Cap</th>
                <th>EPS</th>
                <th>P/E Ratio</th>
                <th>Dividend Yield</th>
                <th>Official Site</th>
                <th>Favorite</th>
            </tr>
        </thead>
        <tbody>
            <StockCard v-for="stock in stocks" :key="stock.id" :stock="stock" @go-to-detail="goToDetail"
                @refresh-table="refreshStocks" />
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { router } from '../../router';
import { Stock } from '../../types/Stock';
import axiosInstance from '../../utils/axios';
import StockCard from './StockCard.vue';

const stocks = ref<Stock[]>([]);

const goToDetail = (symbol: string) => {
    router.push(`/stock/${symbol}`);
};

const refreshStocks = async () => {
    try {
        const response = await axiosInstance.get('/stocks'); // replace with your actual endpoint
        stocks.value = response.data;
    } catch (error) {
        console.error('Error fetching stocks:', error);
    }
};

onMounted(refreshStocks);
</script>

<style scoped>
.stock-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--table-bg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stock-table th,
.stock-table td {
    padding: 1rem;
    text-align: left;
    border: 1px solid var(--table-border);
}

.stock-table th {
    background-color: var(--table-header-bg);
    color: var(--text-color);
    font-weight: bold;
}

.stock-table tr:nth-child(even) {
    background-color: var(--table-row-bg);
}

.stock-table tr:hover {
    background-color: var(--table-row-hover-bg);
}

@media (max-width: 768px) {

    .stock-table th,
    .stock-table td {
        padding: 0.5rem;
    }
}
</style>