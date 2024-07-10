/* Importiert die notwendigen Funktionen und Bibliotheken */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

/* Definiert den Haupt-Store */
export const useMainStore = defineStore('main', () => {
  /* Definiert die reaktiven Zustände für Zitate, Artikel und Journal-Daten */
  const quote = ref({
    title: null,
    quote: null,
    author: null,
    tags: null,
    error: false,
    isLoading: false,
    createdAt: null
  })

  const articles = ref({
    articles: [],
    isLoading: false,
    createdAt: null
  })

  const journalData = ref([])

  const journalDataByTag = ref([])

  const journalTags = ref(new Set())

  /* Lädt das Zitat des Tages */
  const loadQuoteOfTheDay = async () => {
    try {
      const date = new Date()
      const createdAt = date.toISOString().split('T')[0]
      quote.value.isLoading = true
      quote.value.error = false

      const getQuote = await axios.get('https://api.api-ninjas.com/v1/quotes?category=success', {
        headers: {
          'X-Api-Key': 'hrpodQKY6lgmMf+Lzq8qSA==xS5phOt6F4IIxLhU'
        }
      })
      if (getQuote.status !== 200) {
        throw new Error('Network response was not ok')
      }

      const result = getQuote.data

      if (result.length) {
        quote.value.quote = result[0].quote
        quote.value.author = result[0].author
        quote.value.tags = [result[0].category]
        quote.value.createdAt = createdAt
      } else {
        quote.value.error = true
      }
      quote.value.isLoading = false
    } catch (e) {
      console.log('Fetch error: ', e)
      quote.value.error = true
      quote.value.isLoading = false
    }
  }

  /* Lädt die täglichen Artikel */
  const loadDailyArticles = async () => {
    try {
      const dateForQ = new Date(Date.now() - 86400000)
      const yesterday = dateForQ.toISOString().split('T')[0]

      articles.value.error = false
      articles.value.isLoading = true

      const getActualNewsLink = `https://newsapi.org/v2/everything?q=luck&from=${yesterday}&sortBy=publishedAt&apiKey=a2e4ea73f6544cb894ed7323f416be87`
      const getActualNews = await axios.get(getActualNewsLink)

      if (getActualNews.status !== 200) {
        throw new Error('Network response was not ok')
      }

      const result = getActualNews.data

      if (result.status === 'ok' && result.articles.length) {
        let i = -1
        while (articles.value.articles.length < 9 && i < result.articles.length - 1) {
          i++
          if (result.articles[i].description.length < 100) {
            continue
          }
          articles.value.articles.push(result.articles[i])
        }
      } else {
        articles.value.error = true
      }
      articles.value.isLoading = false
    } catch (e) {
      console.log('Fetch error: ', e)
      articles.value.error = true
      articles.value.isLoading = false
    }
  }

  /* Lädt die Journal-Daten aus dem lokalen Speicher */
  const loadJournal = () => {
    const journalObject = localStorage.getItem('journal')

    if (journalObject) {
      const journalObjectParsed = JSON.parse(journalObject)
      journalData.value = journalObjectParsed
      getJournalDataByTag()
      getTagsFromJournal()
    }
  }

  /* Extrahiert die Tags aus den Journal-Daten */
  const getTagsFromJournal = () => {
    journalTags.value = new Set()
    for (const journalEntry of journalData.value) {
      journalEntry.tags?.forEach(tag => {
        journalTags.value.add(tag)
      });
    }
  }

  /* Fügt neue Daten zum Journal hinzu */
  const addDataToJournal = (data) => {
    if (!journalData.value.length) {
      loadJournal()
    }
    data.createdAt = Date.now()

    journalData.value.push(data)
    getJournalDataByTag()
    getTagsFromJournal()

    localStorage.setItem('journal', JSON.stringify(journalData.value))
  }

  /* Filtert die Journal-Daten nach einem bestimmten Tag */
  const getJournalDataByTag = (tag) => {
    if (!tag) {
      journalDataByTag.value = journalData.value
      return
    }

    journalDataByTag.value = journalData.value.filter(r => r.tags?.includes(tag))
  }

  /* Löscht einen Journal-Eintrag nach ID */
  const deleteJournalEntry = (id) => {
    journalData.value = journalData.value.filter(r => r.createdAt !== id)

    getTagsFromJournal()
    getJournalDataByTag()

    localStorage.setItem('journal', JSON.stringify(journalData.value))
  }

  /* Holt einen Journal-Eintrag nach ID */
  const getJournalEntryById = (id) => {
    return journalData.value.find(r => r.createdAt === parseInt(id))
  }

  /* Holt die zu teilenden Daten nach Typ und ID */
  const getShareDataById = (type, id) => {
    if (type === 'journal') {
      const journalEntry = journalData.value.find(r => r.createdAt === parseInt(id))
      if (!journalEntry) {
        return null
      }
      return {
        title: 'Daily Inspire App: My journal entry',
        text: 'I want to share with you my journal entry!',
        url: `http://${window.location.host}/journal/${id}`
      }
    }
    return null
  }

  /* Gibt die Funktionen und Zustände des Stores zurück, um sie in der Anwendung zu nutzen */
  return {
    loadQuoteOfTheDay, loadDailyArticles, addDataToJournal,
    loadJournal, getJournalDataByTag, deleteJournalEntry,
    getShareDataById, getJournalEntryById,
    quote, articles, journalDataByTag, journalTags
  }
})
