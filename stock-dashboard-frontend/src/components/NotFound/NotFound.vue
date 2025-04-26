<template>
    <div class="not-found-container">
        <div class="not-found-content">
            <h1 class="not-found-title">404</h1>
            <p class="not-found-message">Oops! The page you're looking for doesn't exist.</p>
            <router-link to="/" class="back-home-btn">Go to Homepage</router-link>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: 'Roboto', sans-serif;
    transition: all 0.3s ease;
}

.not-found-content {
    text-align: center;
    padding: 40px;
    border-radius: 10px;
    background-color: var(--card-bg-color);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.not-found-title {
    font-size: 100px;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.not-found-message {
    font-size: 18px;
    margin-bottom: 30px;
    color: var(--secondary-color);
}

.back-home-btn {
    font-size: 16px;
    font-weight: 600;
    color: var(--link-color);
    padding: 12px 24px;
    background-color: var(--button-bg-color);
    border-radius: 5px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.back-home-btn:hover {
    background-color: var(--button-hover-bg-color);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .not-found-title {
        font-size: 80px;
    }

    .not-found-message {
        font-size: 16px;
    }

    .back-home-btn {
        font-size: 14px;
        padding: 10px 20px;
    }
}
</style>