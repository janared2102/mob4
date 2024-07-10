<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/store/store'

const props = defineProps(['type', 'id'])
const mainStore = useMainStore()

const data = ref({
  isJournal: props.type === 'journal',
  data: null
})

if (data.value.isJournal) {
  data.value.data = mainStore.getJournalEntryById(props.id)
}
</script>

<template>
  <main>
    <div class="journal-saves d-flex flex-column" v-if="data.isJournal && data.data">
      <div class="journal-save d-flex flex-column align-items-stretch justify-content-between py-2 px-3">
        <span>
          <h5 class="text-start">{{ data.data.title }}</h5>
          <p class="text-start">{{ data.data.text }}</p>
        </span>
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