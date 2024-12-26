<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const events = ref([]);
const featured = ref(false)

const getEvents = async () => {
  try {
    const request = await axios.get('/events');

    console.log(request.data)
    events.value = request.data;
    console.log('events ref variable value', events.value);

  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

onMounted(getEvents);
</script>

<template>
  <div class="mx-auto my-0 w-4/5">
    <div v-for="event in events">
      <ul v-if="event.location && event.location.code == 'KZ'">
        <li>{{ event.name + ' '}}</li>
        <li v-if="event.location">Location: {{ event.location?.name || '' }} <img :src="`https://hltv.org/img/static/flags/30x20/${event.location.code}.gif`" v-if="event.location?.code">  </li>
      </ul>
    </div>
  </div>
</template>
