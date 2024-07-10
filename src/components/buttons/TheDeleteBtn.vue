<script setup>
import { useMainStore } from '@/store/store'

const props = defineProps(['entryId'])
const mainStore = useMainStore()
</script>

<template>
  <button class="delete-journal-entry btn bg-none p-0" @click="mainStore.deleteJournalEntry(props.entryId)">
    <img src="@/assets/icons/delete.svg" alt="Delete icon" class="img-fluid">
  </button>
</template>