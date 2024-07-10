<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/store/store'

import TheShareBtn from '@/components/buttons/TheShareBtn.vue'
import TheDeleteBtn from '@/components/buttons/TheDeleteBtn.vue'

const shareDataType = 'journal'
const journalData = ref({
  title: null,
  text: null,
  tags: null
})
const showJournalAddForm = ref(false)
const mainStore = useMainStore()

const saveToJournal = () => {
  journalData.value.tags = journalData.value.tags?.split(',').filter(r => r.length)
    .map(item => item.trim())

  mainStore.addDataToJournal(Object.assign({}, journalData.value))

  for (const key in journalData.value) {
    journalData.value[key] = null
  }
  showJournalAddForm.value = false
}
</script>

<template>
  <div class="journal p-2">
    <h3 class="fw-bolder mb-4">Journal</h3>
    <div class="d-flex flex-row justify-content-between align-items-end mb-3">
      <div class="d-flex flex-column flex-wrap" v-if="mainStore.journalDataByTag.length && !showJournalAddForm">
        <div class="d-flex flex-row flex-wrap">
          <button class="tag btn btn-warning me-1 mb-1" v-for="(item, key) in mainStore.journalTags" :key="key"
            @click="mainStore.getJournalDataByTag(item)">
            <strong>{{ item }}</strong>
          </button>
          <button class="btn btn-success mb-1" @click="mainStore.getJournalDataByTag(item)">Refresh</button>
        </div>
      </div>
      <button class="btn btn-success" @click="showJournalAddForm = true"
        :class="{ 'mx-auto': !mainStore.journalDataByTag.length }" v-show="!showJournalAddForm">
        Add new entry
      </button>
      <button class="btn btn-danger mx-auto" @click="showJournalAddForm = false" v-show="showJournalAddForm">
        Close form
      </button>
    </div>

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

    <div class="journal-saves d-flex flex-column" v-if="!showJournalAddForm">
      <div class="journal-saves-plates" v-if="mainStore.journalDataByTag.length">
        <div class="journal-save d-flex flex-column align-items-stretch justify-content-between py-2 px-3"
          v-for="(item, key) in mainStore.journalDataByTag" :key="key">
          <span>
            <h5 class="text-start">{{ item.title }}</h5>
            <p class="text-start">{{ item.text }}</p>
          </span>
          <div class="d-flex flex-row align-items-center justify-content-between">
            <div class="d-flex flex-row flex-wrap">
              <div class="tag bg-warning p-2 me-1 rounded" v-for="(tag, key) in item.tags" :key="key">
                <strong>{{ tag }}</strong>
              </div>
            </div>
            <span class="d-flex flex-row">
              <TheShareBtn :dataType="shareDataType" :dataId="item.createdAt" />
              <TheDeleteBtn :entryId="item.createdAt" />
            </span>
          </div>
        </div>
      </div>
      <div v-if="!mainStore.journalDataByTag.length">
        <strong class="text-muted">Journal is empty</strong>
      </div>
    </div>
  </div>
</template>