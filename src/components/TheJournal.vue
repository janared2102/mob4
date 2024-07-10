<script setup>
/* Importiert die ref-Funktion aus Vue, um reaktive Referenzen zu erstellen */
import { ref } from 'vue'
/* Importiert den Haupt-Store, der verwendet wird, um den globalen Zustand der Anwendung zu verwalten */
import { useMainStore } from '@/store/store'

/* Importiert benutzerdefinierte Komponenten für Teilen und Löschen-Buttons */
import TheShareBtn from '@/components/buttons/TheShareBtn.vue'
import TheDeleteBtn from '@/components/buttons/TheDeleteBtn.vue'

/* Definiert den Typ der zu teilenden Daten */
const shareDataType = 'journal'
/* Erstellt eine reaktive Referenz für die Journal-Daten */
const journalData = ref({
  title: null,
  text: null,
  tags: null
})
/* Erstellt eine reaktive Referenz für die Anzeige des Journal-Hinzufügeformulars */
const showJournalAddForm = ref(false)
/* Initialisiert den Haupt-Store und speichert ihn in der Variable mainStore */
const mainStore = useMainStore()

/* Definiert eine Funktion zum Speichern der Journal-Daten */
const saveToJournal = () => {
  /* Trennt die Tags durch Kommas und filtert leere Einträge */
  journalData.value.tags = journalData.value.tags?.split(',').filter(r => r.length)
      .map(item => item.trim())

  /* Fügt die Journal-Daten dem Store hinzu */
  mainStore.addDataToJournal(Object.assign({}, journalData.value))

  /* Setzt die Journal-Daten zurück */
  for (const key in journalData.value) {
    journalData.value[key] = null
  }
  /* Verbirgt das Journal-Hinzufügeformular */
  showJournalAddForm.value = false
}
</script>

<template>
  <div class="journal p-2">
    <!-- Überschrift für das Journal -->
    <h3 class="fw-bolder mb-4">Journal</h3>
    <div class="d-flex flex-row justify-content-between align-items-end mb-3">
      <!-- Zeigt die Tags an, wenn Journal-Einträge vorhanden sind und das Formular nicht angezeigt wird -->
      <div class="d-flex flex-column flex-wrap" v-if="mainStore.journalDataByTag.length && !showJournalAddForm">
        <div class="d-flex flex-row flex-wrap">
          <!-- Schaltfläche für jeden Tag -->
          <button class="tag btn btn-warning me-1 mb-1" v-for="(item, key) in mainStore.journalTags" :key="key"
                  @click="mainStore.getJournalDataByTag(item)">
            <strong>{{ item }}</strong>
          </button>
          <!-- Schaltfläche zum Aktualisieren -->
          <button class="btn btn-success mb-1" @click="mainStore.getJournalDataByTag(item)">Refresh</button>
        </div>
      </div>
      <!-- Schaltfläche zum Hinzufügen eines neuen Eintrags -->
      <button class="btn btn-success" @click="showJournalAddForm = true"
              :class="{ 'mx-auto': !mainStore.journalDataByTag.length }" v-show="!showJournalAddForm">
        Add new entry
      </button>
      <!-- Schaltfläche zum Schließen des Formulars -->
      <button class="btn btn-danger mx-auto" @click="showJournalAddForm = false" v-show="showJournalAddForm">
        Close form
      </button>
    </div>

    <!-- Formular zum Hinzufügen eines neuen Journal-Eintrags -->
    <form @submit.prevent class="d-flex flex-column" v-if="showJournalAddForm">
      <label for="title" class="text-start">Enter title:</label>
      <input type="text" class="form-control mb-2" v-model="journalData.title">
      <label for="text" class="text-start">Enter text:</label>
      <textarea name="text" id="txt" class="form-control mb-2" cols="30" rows="10"
                v-model="journalData.text"></textarea>
      <label for="tags" class="text-start">Enter tags (separated with ','):</label>
      <input type="text" class="form-control mb-2" v-model="journalData.tags">
      <button @click="saveToJournal" class="mt-3 btn btn-success">Save to journal</button>
    </form>

    <!-- Anzeige der gespeicherten Journal-Einträge -->
    <div class="journal-saves d-flex flex-column" v-if="!showJournalAddForm">
      <div class="journal-saves-plates" v-if="mainStore.journalDataByTag.length">
        <!-- Jeder gespeicherte Journal-Eintrag -->
        <div class="journal-save d-flex flex-column align-items-stretch justify-content-between py-2 px-3"
             v-for="(item, key) in mainStore.journalDataByTag" :key="key">
          <span>
            <h5 class="text-start">{{ item.title }}</h5>
            <p class="text-start">{{ item.text }}</p>
          </span>
          <div class="d-flex flex-row align-items-center justify-content-between">
            <!-- Tags des Eintrags -->
            <div class="d-flex flex-row flex-wrap">
              <div class="tag bg-warning p-2 me-1 rounded" v-for="(tag, key) in item.tags" :key="key">
                <strong>{{ tag }}</strong>
              </div>
            </div>
            <!-- Schaltflächen für Teilen und Löschen -->
            <span class="d-flex flex-row">
              <TheShareBtn :dataType="shareDataType" :dataId="item.createdAt" />
              <TheDeleteBtn :entryId="item.createdAt" />
            </span>
          </div>
        </div>
      </div>
      <!-- Nachricht, wenn keine Journal-Einträge vorhanden sind -->
      <div v-if="!mainStore.journalDataByTag.length">
        <strong class="text-muted">Journal is empty</strong>
      </div>
    </div>
  </div>
</template>
