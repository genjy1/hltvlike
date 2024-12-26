<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const player = ref({});
const isOpenTeams = ref(false);
const isOpenAchievements = ref(false);

const getPlayer = async(id) => {
  const response = await axios.get(`/player/${id}`);
  player.value = response.data;
};

onMounted(() => getPlayer(id));
</script>

<template>
  <div class="grid sm:grid-cols-2 grid-rows-2 mx-auto mt-16 w-4/5 border rounded-2xl container aspect-[21 / 3]">
    <img :src="player.image" alt="" />
    <div class="info mt-4">
      <ul class="px-4">
        <li class="">{{ player.name }}</li>
        <li class="my-4 flex justify-between">
          <span>{{ player.ign }}</span>
          <span>{{ player.statistics?.rating }}</span>
        </li>
      </ul>

      <!-- Teams Section -->
      <ul class="mr-4">
        <li @click="isOpenTeams = !isOpenTeams" class="cursor-pointer px-4 py-2 border border-transparent hover:border-[#eee] rounded-2xl mb-2">
          Teams
        </li>
        <transition name="expand-fade">
          <ul v-if="isOpenTeams" :class="isOpenTeams ? 'h-[240px] overflow-y-auto achievements-list bg-white rounded-b' : 'h-0'">
            <li
              v-for="(team, index) in player.teams"
              :key="index"
              class="px-6 mb-4 grid grid-cols-4 bg-white"
            >
              <span>{{ team.name }}</span>
              <span class="text-center">{{ new Date(team.startDate).toLocaleDateString('ru') }}</span>
              <span class="text-center">-</span>
              <span v-if="team.leaveDate">
                {{ new Date(team.leaveDate).toLocaleDateString('ru') }}
              </span>
              <span v-else>Present</span>
            </li>
          </ul>
        </transition>
      </ul>

      <!-- Achievements Section -->
      <ul v-if="player.achievements?.length > 1" class="mr-4">
        <li @click="isOpenAchievements = !isOpenAchievements" class="cursor-pointer px-4 py-2 border border-transparent hover:border-[#eee] rounded-2xl mb-2">
          Achievements
        </li>
        <transition name="expand-fade">
          <ul v-if="isOpenAchievements" :class="isOpenAchievements ? 'h-[240px] overflow-y-auto bg-white rounded-b' : 'h-0'">
            <li v-for="(achievement, index) in player.achievements" :key="index">
              <p class="grid grid-cols-2 justify-between px-6 mb-4">
                <span>{{ achievement.event.name }}</span>
                <span class="text-right">{{ achievement.place }}</span>
              </p>
            </li>
          </ul>
        </transition>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Fade-in effect */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Expand effect */
.expand-fade-enter-active, .expand-fade-leave-active {
  transition: height 0.5s ease, opacity 0.5s ease;
}
.expand-fade-enter, .expand-fade-leave-to {
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.achievements-list{
  scrollbar-width: 2px;
  scrollbar-color: transparent;
  -webkit-user-drag: auto;
}
</style>
