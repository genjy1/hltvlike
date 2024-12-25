<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const events = ref([]);
const featured = ref(false)

const getEvents = async () => {
  try {
    const request = await axios.get('/events');
    events.value = request.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

onMounted(getEvents);
</script>

<template>
  <div class="mx-auto my-0 w-4/5">
    <div class="filter flex justify-between w-2/5 mb-4">
      <button class="filter-btn border px-4 py-2 rounded-xl" @click="featured = false">Прошедшие</button><button class="filter-btn border px-4 py-2 rounded-xl">Идущие</button><button class="filter-btn border px-4 py-2 rounded-xl" @click="featured = true">Будущие</button>
    </div>
    <ul class="grid grid-cols-6 gap-4">
      <li v-for="event in events" :key="event.id" class="border p-4" v-if="featured">
        {{ event.name }}
        {{ new Date(event.dateStart).toLocaleDateString('ru') }}
        <!-- Проверяем наличие location перед попыткой вывода -->
        {{ event.location?.name || '' }}
      </li>
    </ul>
  </div>
</template>
