<script setup>
/* Importiert den Haupt-Store, der verwendet wird, um den globalen Zustand der Anwendung zu verwalten */
import { useMainStore } from '@/store/store'

/* Initialisiert den Haupt-Store und speichert ihn in der Variable mainStore */
const mainStore = useMainStore()

/* Definiert eine Funktion, um eine zufällige Farbe aus einem vordefinierten Farbsatz zurückzugeben */
const getPlateColor = () => {
  const colors = ['#74b9ff', '#a29bfe', '#81ecec', '#ffeaa7'] /* Vordefinierte Farben */
  const randomId = Math.floor(Math.random() * 4) /* Generiert eine zufällige Zahl zwischen 0 und 3 */
  return colors[randomId] /* Gibt die zufällig ausgewählte Farbe zurück */
}
</script>

<template>
  <div class="articles p-2">
    <!-- Überschrift für die täglichen Artikel -->
    <h3 class="fw-bolder mb-4">Daily Articles</h3>
    <div>
      <!-- Schleife durch die Artikel im Store, um jeden Artikel darzustellen -->
      <div class="article d-flex flex-column align-items-stretch justify-content-between py-2 px-3"
           v-for="(item, key) in mainStore.articles.articles" :key="key" :style="{ background: getPlateColor() }">
        <span>
          <!-- Titel des Artikels mit Link -->
          <h5 class="text-start">
            <a :href="item.url">{{ item.title }}</a>
          </h5>
          <!-- Beschreibung des Artikels -->
          <p class="text-start m-0 text-wrap">{{ item.description }}</p>
        </span>
        <!-- Autor des Artikels, falls vorhanden, ansonsten 'No Author' anzeigen -->
        <i class="text-end">Author: {{ item.author ? item.author : 'No Author' }}</i>
      </div>
    </div>
  </div>
</template>
