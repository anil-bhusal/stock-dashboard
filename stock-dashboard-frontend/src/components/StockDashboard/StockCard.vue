<template>
    <tr>
        <td>
            <span @click="goToDetail(stock.Symbol)" class="stock-name">
                {{ stock.Name }}
            </span>
        </td>
        <td>{{ stock.Symbol }}</td>
        <td>{{ stock.Sector }}</td>
        <td>{{ stock.Industry }}</td>
        <td>{{ formatNumber(stock.MarketCapitalization) }}</td>
        <td>{{ stock.EPS }}</td>
        <td>{{ stock.PERatio }}</td>
        <td>{{ stock.DividendYield || 'N/A' }}</td>
        <td>
            <a :href="stock.OfficialSite" target="_blank">Visit</a>
        </td>
        <td>
            <input type="checkbox" :checked="isFavorite" @change="toggleFavorite" />
        </td>
    </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Stock, Favorite } from '../../types/Stock';
import axiosInstance from '../../utils/axios';

const props = defineProps<{ stock: Stock }>();

const emit = defineEmits<{
    (event: 'go-to-detail', symbol: string): void;
    (event: 'refresh-table'): void;
}>();

const isFavorite = computed(() => {
    const fav = props.stock.favorites?.find(
        (f: Favorite) => f.stockId === props.stock.id
    );
    return fav?.isFavorite ?? false;
});

const toggleFavorite = async () => {
    let fav = props.stock.favorites?.find(f => f.stockId === props.stock.id);

    if (!props.stock.favorites) props.stock.favorites = [];

    if (fav) {
        fav.isFavorite = !fav.isFavorite;
        if (!fav.isFavorite) {
            await axiosInstance.delete(`/favorites/${props.stock.id}`);
        } else {
            await axiosInstance.post(`/favorites/${props.stock.id}`);
        }
    } else {
        props.stock.favorites.push({ stockId: props.stock.id, isFavorite: true });
        await axiosInstance.post(`/favorites/${props.stock.id}`);
    }

    emit('refresh-table');
};

const goToDetail = (symbol: string) => {
    emit('go-to-detail', symbol);
};

const formatNumber = (num: string | number): string =>
    new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(Number(num));
</script>

<style scoped>
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
