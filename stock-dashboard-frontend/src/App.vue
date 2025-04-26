<template>
  <div id="app">
    <!-- Theme Toggle Button -->
    <div class="nav-bar">

      <div class="go-to-home" @click="goToHome">
        Stock Dashboard
      </div>

      <div class="toggle-items">
        <button @click="goToMyFavourite">
          My Favourite Stocks
        </button>

        <button @click="toggleTheme">
          Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
        </button>
      </div>
    </div>

    <!-- Router View (your dashboard and other pages) -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from './composables/useTheme'
import { router } from './router';

const { theme, toggleTheme } = useTheme()

const goToHome = () => {
  router.push(`/`);
};
const goToMyFavourite = () => {
  router.push(`/my-favourite-stock`);
};
</script>

<style scoped>
.nav-bar {
  padding: 1rem;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-bar .go-to-home {
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
}

.nav-bar .toggle-items {
  padding: 1rem;
  text-align: right;
  display: flex;
  gap: 20px;
}

.nav-bar button {
  background-color: var(--btn-bg);
  color: var(--text-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
