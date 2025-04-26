<template>
    <div :class="modeClass" class="p-6 wrapper">
        <h2 class="text-2xl font-semibold mb-6">Your Favorite Stocks</h2>
        <table class="w-full text-left table-auto border-collapse">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Name</th>
                    <th class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Symbol</th>
                    <th class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Sector</th>
                    <th class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Industry</th>
                    <th class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Market Cap</th>
                    <th class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">EPS</th>
                    <th class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">P/E Ratio</th>
                    <th class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Official Site</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock in favoriteStocks" :key="stock.id" class="border-b dark:border-gray-600">
                    <td>
                        <span @click="goToDetail(stock.Symbol)" class="stock-name">
                            {{ stock.Name }}
                        </span>
                    </td>
                    <td class="px-4 py-3">{{ stock.Symbol }}</td>
                    <td class="px-4 py-3">{{ stock.Sector }}</td>
                    <td class="px-4 py-3">{{ stock.Industry }}</td>
                    <td class="px-4 py-3">{{ formatNumber(stock.MarketCapitalization) }}</td>
                    <td class="px-4 py-3">{{ stock.EPS }}</td>
                    <td class="px-4 py-3">{{ stock.PERatio }}</td>
                    <td class="px-4 py-3">
                        <a :href="stock.OfficialSite" target="_blank" class="text-blue-500 hover:underline">Visit</a>
                    </td>
                </tr>
                <tr v-if="favoriteStocks.length === 0">
                    <td colspan="8" class="text-center py-4 text-gray-500 dark:text-gray-400">No favorites found.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axiosInstance from '../utils/axios';
import { Stock } from '../types/Stock';
import { router } from '../router';

// Store for favorite stocks
const favoriteStocks = ref<Stock[]>([]);

const goToDetail = (symbol: string) => {
    router.push(`/stock/${symbol}`);
};

// Load favorite stocks from API
const loadFavorites = async () => {
    try {
        const res = await axiosInstance.get<Stock[]>('/favorites');
        favoriteStocks.value = res.data;
    } catch (err) {
        console.error('Failed to load favorites:', err);
    }
};

// Format numbers like market cap
const formatNumber = (num: string | number) => {
    const parsed = typeof num === 'string' ? parseInt(num) : num;
    return isNaN(parsed) ? '-' : new Intl.NumberFormat().format(parsed);
};

// Dark/light mode logic
const modeClass = computed(() => {
    return localStorage.getItem('mode') === 'dark' ? 'dark' : '';
});

onMounted(loadFavorites);
</script>

<style scoped>
/* Light and Dark Mode Styling */
body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: all 0.3s ease-in-out;
}

.wrapper {
    padding: 2rem;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.dark {
    --bg-color: #121212;
    --text-color: #ffffff;
}

.light {
    --bg-color: #f9f9f9;
    --text-color: #333333;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: var(--table-bg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

thead th {
    text-align: left;
    padding: 12px;
    background-color: var(--table-header-bg);
    color: var(--text-color);
    font-weight: bold;
}

tbody tr {
    background-color: var(--table-bg);
}

tbody tr:hover {
    background-color: var(--hover-bg);
}

tbody td {
    padding: 12px;
}

.dark thead {
    background-color: #333333;
}

.dark tbody tr:hover {
    background-color: #444444;
}

.dark tbody tr:nth-child(even) {
    background-color: #1e1e1e;
}

.dark tbody td {
    color: #e0e0e0;
}

.dark tbody td a {
    color: #81c784;
}

.light thead {
    background-color: #f1f1f1;
}

.light tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.light tbody td {
    color: #333333;
}

.light tbody td a {
    color: #1976d2;
}

a:hover {
    text-decoration: underline;
}

.stock-name {
    cursor: pointer;
    color: var(--link-color);
    font-weight: 500;
    transition: color 0.3s ease;
}

.stock-name:hover {
    color: var(--link-hover-color);
}

a {
    color: var(--link-color);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
