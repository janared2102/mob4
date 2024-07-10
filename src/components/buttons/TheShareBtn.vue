<script setup>
import { useMainStore } from '@/store/store'
const props = defineProps(['dataType', 'dataId'])

const mainStore = useMainStore()

const copyToClipboard = (url) => {
  prompt("Suddenly your browser does not support Web Share API! Please, copy the share link from the field below!", url)
}

const shareContent = async (shareData) => {
  if (navigator.share) {
    try {
      await navigator.share(shareData)
      console.log('Shared successfully')
    } catch (e) {
      console.log('Error while sharing: ', e)
      copyToClipboard(shareData.url)
    }
  }
  else {
    copyToClipboard(shareData.url)
  }
}

const shareData = async () => {
  const dataToShare = mainStore.getShareDataById(props.dataType, props.dataId)
  if (!dataToShare) {
    console.log(`Error: no data with id ${props.dataId} was found`)
    return
  }

  shareContent(dataToShare)
}
</script>

<template>
  <button class="share-button btn bg-none p-0">
    <img src="@/assets/icons/share.svg" alt="Share" class="img-fluid" @click="shareData()">
  </button>
</template>