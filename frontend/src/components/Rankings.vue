<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const rankings = ref()

const getRankings = async() =>{
  const request = axios.get('teamRanking')

  rankings.value = (await request).data
}
onMounted(getRankings)

</script>
<template>
  <div class="mx-auto my-0 w-4/5" >
    <ul>
      <li v-for="rank in rankings" v-bind:key="rank" class="flex justify-between"><span class="sm:w-44">{{ rank.team.name }}</span><span :title="`Ранг изменился на ${Number(rank.change)} позиций`">{{ rank.points }}</span></li>
    </ul>
  </div>
</template>
