<template>

</template>
<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const news = reactive({})

const getNews = async() => {
  const request = await axios.get('http://localhost:5000/api/news')

  Object.assign(news, request.data)
}

console.log(news);


onMounted(getNews)

</script>
