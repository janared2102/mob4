<script setup>
import { useMainStore } from '@/store/store'

const mainStore = useMainStore()

const getPlateColor = () => {
  const colors = ['#74b9ff', '#a29bfe', '#81ecec', '#ffeaa7']
  const randomId = Math.floor(Math.random() * 4)
  return colors[randomId]
}
</script>

<template>
  <div class="articles p-2">
    <h3 class="fw-bolder mb-4">Daily Articles</h3>
    <div>
      <div class="article d-flex flex-column align-items-stretch justify-content-between py-2 px-3"
        v-for="(item, key) in mainStore.articles.articles" :key="key" :style="{ background: getPlateColor() }">
        <span>
          <h5 class="text-start">
            <a :href="item.url">{{ item.title }}</a>
          </h5>
          <p class="text-start m-0 text-wrap">{{ item.description }}</p>
        </span>
        <i class="text-end">Author: {{ item.author ? item.author : 'No Author' }}</i>
      </div>
    </div>
  </div>
</template>
