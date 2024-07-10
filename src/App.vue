<script setup>
import { useMainStore } from '@/store/store'

const mainStore = useMainStore()

mainStore.loadQuoteOfTheDay()
mainStore.loadJournal()
mainStore.loadDailyArticles()
</script>

<template>
  <span class="container-fluid d-flex flex-column justify-content-start align-items-center">
    <header class="d-flex flex-row justify-content-between align-items-center py-3">
      <div class="d-flex justify-content-start">
        <h2 class="text-start fw-bold">Daily Inspire App</h2>
      </div>
      <nav>
        <router-link class="mx-2" :to="{ name: 'home' }">
          <strong>Home</strong>
        </router-link>
        <router-link class="mx-2" :to="{ name: 'articles' }">
          <strong>Articles</strong>
        </router-link>
      </nav>
    </header>
    <router-view></router-view>
  </span>

</template>

<style>
@import url('./assets/main.css');
</style>
