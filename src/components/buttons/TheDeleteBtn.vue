<script setup>
/* Importiert den Haupt-Store, der verwendet wird, um den globalen Zustand der Anwendung zu verwalten */
import { useMainStore } from '@/store/store'

/* Definiert die empfangenen Eigenschaften (Props) für die Komponente, in diesem Fall die entryId */
const props = defineProps(['entryId'])
/* Initialisiert den Haupt-Store und speichert ihn in der Variable mainStore */
const mainStore = useMainStore()
</script>

<template>
  <!-- Schaltfläche zum Löschen eines Journal-Eintrags -->
  <button class="delete-journal-entry btn bg-none p-0" @click="mainStore.deleteJournalEntry(props.entryId)">
    <!-- Icon für die Löschen-Schaltfläche -->
    <img src="@/assets/icons/delete.svg" alt="Delete icon" class="img-fluid">
  </button>
</template>
