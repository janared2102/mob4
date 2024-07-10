<script setup>
/* Importiert den Haupt-Store, der verwendet wird, um den globalen Zustand der Anwendung zu verwalten */
import {useMainStore} from '@/store/store'

/* Definiert die empfangenen Eigenschaften (Props) für die Komponente, in diesem Fall dataType und dataId */
const props = defineProps(['dataType', 'dataId'])

/* Initialisiert den Haupt-Store und speichert ihn in der Variable mainStore */
const mainStore = useMainStore()

/* Funktion zum Kopieren des Inhalts in die Zwischenablage, wenn Web Share API nicht unterstützt wird */
const copyToClipboard = (url) => {
  prompt("Suddenly your browser does not support Web Share API! Please, copy the share link from the field below!", url)
}

/* Funktion zum Teilen des Inhalts mit der Web Share API */
const shareContent = async (shareData) => {
  if (navigator.share) {
    try {
      /* Versucht, den Inhalt zu teilen */
      await navigator.share(shareData)
      console.log('Shared successfully')
    } catch (e) {
      /* Fehlerbehandlung beim Teilen */
      console.log('Error while sharing: ', e)
      copyToClipboard(shareData.url)
    }
  } else {
    /* Fallback, wenn Web Share API nicht unterstützt wird */
    copyToClipboard(shareData.url)
  }
}

/* Funktion, um die zu teilenden Daten abzurufen und zu teilen */
const shareData = async () => {
  const dataToShare = mainStore.getShareDataById(props.dataType, props.dataId)
  if (!dataToShare) {
    /* Fehlerbehandlung, wenn keine Daten gefunden wurden */
    console.log(`Error: no data with id ${props.dataId} was found`)
    return
  }

  /* Teilt die abgerufenen Daten */
  shareContent(dataToShare)
}
</script>

<template>
  <!-- Schaltfläche zum Teilen des Inhalts -->
  <button className="share-button btn bg-none p-0">
    <img src="@/assets/icons/share.svg" alt="Share" className="img-fluid" @click="shareData()">
  </button>
</template>
