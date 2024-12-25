<template>
  <div v-for="article in news" class="container mx-auto my-0 w-4/5">
    <h2>{{ article.title }}</h2>
  </div>
</template>
<script setup>
import { reactive, onMounted, ref } from 'vue';
import axios from 'axios';

let news = ref({})

const getNews = async() => {
  const request = await axios.get('http://localhost:5000/api/news')
  const requestedNews = request.data

  news.value = requestedNews
}


onMounted(getNews)

</script>
