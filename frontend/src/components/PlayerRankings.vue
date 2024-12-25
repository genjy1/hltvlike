<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const players = ref()

const getRankings = async () => {
  const request = axios.get('/playerRanking')

  players.value = (await request).data
}

onMounted(getRankings)

</script>
<template>
  <div class="mx-auto my-0 w-4/5">
    <ul>
      <li v-for="player in players" v-bind:key="player">
        {{ player.player.name }}
        {{ player.kd }} kd
        {{ player.rating1 }} rating
      </li>
    </ul>
  </div>
</template>
