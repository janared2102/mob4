<script setup>
/* Importiert die ref-Funktion aus Vue, um reaktive Referenzen zu erstellen */
import { ref } from 'vue'
/* Importiert den Haupt-Store, der verwendet wird, um den globalen Zustand der Anwendung zu verwalten */
import { useMainStore } from '@/store/store'

/* Definiert die empfangenen Eigenschaften (Props) für die Komponente, in diesem Fall type und id */
const props = defineProps(['type', 'id'])
/* Initialisiert den Haupt-Store und speichert ihn in der Variable mainStore */
const mainStore = useMainStore()

/* Erstellt eine reaktive Referenz für die Daten, die geladen werden sollen */
const data = ref({
  isJournal: props.type === 'journal', /* Überprüft, ob der Typ 'journal' ist */
  data: null /* Initialisiert die Daten mit null */
})

/* Lädt die Journal-Daten, wenn der Typ 'journal' ist */
if (data.value.isJournal) {
  data.value.data = mainStore.getJournalEntryById(props.id)
}
</script>

<template>
  <main>
    <!-- Anzeige der Journal-Daten, wenn der Typ 'journal' ist und Daten vorhanden sind -->
    <div class="journal-saves d-flex flex-column" v-if="data.isJournal && data.data">
      <div class="journal-save d-flex flex-column align-items-stretch justify-content-between py-2 px-3">
        <span>
          <!-- Titel und Text des Journal-Eintrags -->
          <h5 class="text-start">{{ data.data.title }}</h5>
          <p class="text-start">{{ data.data.text }}</p>
        </span>
        <!-- Anzeige der Tags des Journal-Eintrags -->
        <div class="d-flex flex-row align-items-center justify-content-between">
          <div class="d-flex flex-row flex-wrap">
            <div class="tag bg-warning p-2 me-1 rounded" v-for="(tag, key) in data.data.tags" :key="key">
              <strong>{{ tag }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
