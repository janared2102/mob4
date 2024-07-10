<script setup>
/* Importiert den Haupt-Store, der verwendet wird, um den globalen Zustand der Anwendung zu verwalten */
import { useMainStore } from '@/store/store'

/* Initialisiert den Haupt-Store und speichert ihn in der Variable mainStore */
const mainStore = useMainStore()

/* Lädt das Zitat des Tages, die Journal-Daten und die täglichen Artikel beim Laden der Komponente */
mainStore.loadQuoteOfTheDay()
mainStore.loadJournal()
mainStore.loadDailyArticles()
</script>

<template>
  <!-- Hauptcontainer der Anwendung -->
  <span class="container-fluid d-flex flex-column justify-content-start align-items-center">
    <!-- Header-Bereich der Anwendung -->
    <header class="d-flex flex-row justify-content-between align-items-center py-3">
      <!-- Titel der Anwendung -->
      <div class="d-flex justify-content-start">
        <h2 class="text-start fw-bold">Daily Inspire App</h2>
      </div>
      <!-- Navigationsbereich -->
      <nav>
        <!-- Link zur Startseite -->
        <router-link class="mx-2" :to="{ name: 'home' }">
          <strong>Home</strong>
        </router-link>
        <!-- Link zu den Artikeln -->
        <router-link class="mx-2" :to="{ name: 'articles' }">
          <strong>Articles</strong>
        </router-link>
      </nav>
    </header>
    <!-- Platz für die Anzeige der aktuellen Route -->
    <router-view></router-view>
  </span>
</template>

<style>
/* Importiert die Haupt-CSS-Datei */
@import url('./assets/main.css');
</style>
