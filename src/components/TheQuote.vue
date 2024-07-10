<script setup>
/* Importiert den Haupt-Store, der verwendet wird, um den globalen Zustand der Anwendung zu verwalten */
import { useMainStore } from '@/store/store'

/* Initialisiert den Haupt-Store und speichert ihn in der Variable mainStore */
const mainStore = useMainStore()
</script>

<template>
  <div class="quote p-2">
    <!-- Header-Bereich des Zitats -->
    <div class="quote-header d-flex flex-column justify-content-center align-items-center mb-2">
      <!-- Überschrift für das Zitat des Tages -->
      <h3 class="fw-bolder mb-4">Quote of the day</h3>
      <!-- Anzeige der Tags des Zitats -->
      <div class="tags-row d-flex flex-row align-items-center flex-wrap justify-content-center">
        <!-- Jeder Tag wird in einem eigenen div dargestellt -->
        <div class="bg-warning py-1 px-2 rounded me-1 mb-1" v-for="(item, key) in mainStore.quote.tags" :key="key">
          <strong>{{ item }}</strong>
        </div>
      </div>
    </div>
    <!-- Anzeige des Zitats -->
    <p class="text-center m-0">{{ mainStore.quote.quote }}</p>
    <!-- Anzeige des Autors -->
    <div class="w-100 d-flex justify-content-end">
      <i class="pe-2">Author: {{ mainStore.quote.author }}</i>
    </div>
  </div>
</template>
