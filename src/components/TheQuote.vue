<script setup>
import { useMainStore } from '@/store/store'

const mainStore = useMainStore()
</script>

<template>
  <div class="quote p-2">
    <div class="quote-header d-flex flex-column justify-content-center
    align-items-center mb-2">
      <h3 class="fw-bolder mb-4">Quote of the day</h3>
      <div class="tags-row d-flex flex-row align-items-center flex-wrap justify-content-center">
        <div class="bg-warning py-1 px-2 rounded me-1 mb-1" v-for="(item, key) in mainStore.quote.tags" :key="key">
          <strong>{{ item }}</strong>
        </div>
      </div>
    </div>
    <p class="text-center m-0">{{ mainStore.quote.quote }}</p>
    <div class="w-100 d-flex justify-content-end">
      <i class="pe-2">Author: {{ mainStore.quote.author }}</i>
    </div>
  </div>
</template>