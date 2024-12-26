<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Рефы для состояния
const players = ref([]); // Список игроков
const currentPage = ref(1); // Текущая страница
const isLoading = ref(false); // Флаг загрузки данных
const hasMore = ref(true); // Флаг наличия следующей страницы
const router = useRouter()

// Функция для получения изображения игрока по ID
const getPlayerImage = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/player/${id}/image`);
    return response.data.image || '/placeholder.svg'; // Возвращаем placeholder, если изображения нет
  } catch (error) {
    console.error(`Error fetching player image for ID ${id}:`, error);
    return '/placeholder.svg'; // Возвращаем placeholder в случае ошибки
  }
};

// Функция для загрузки данных о рейтинге игроков
const loadPlayers = async () => {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;
  try {
    const response = await axios.get(`http://localhost:5000/api/playerRanking?page=${currentPage.value}&limit=10`);
    const newPlayers = response.data.players;

    if (newPlayers.length === 0) {
      hasMore.value = false; // Если данных больше нет, отключаем кнопку "Load More"
      return;
    }

    // Загружаем изображения для новых игроков
    for (const player of newPlayers) {
      player.image = await getPlayerImage(player.player.id);
    }

    players.value.push(...newPlayers); // Добавляем новых игроков к уже существующему списку
    currentPage.value += 1; // Переходим на следующую страницу
  } catch (error) {
    console.error('Error fetching player rankings:', error);
  } finally {
    isLoading.value = false;
  }
};

// Загружаем первую страницу при инициализации
loadPlayers();
</script>

<template>
  <div class="mx-auto my-0 w-4/5">
    <ul>
      <li v-for="player in players" :key="player.player.id"  >
        <!-- Используем изображение игрока -->
         <RouterLink class="grid grid-cols-4 justify-between mb-2 items-center" :to="`/player/${player.player.id}/${player.player.name}`" >
          <img :src="player.image" alt="Player Image" class="w-24 h-24" />
          <div class="text-left">{{ player.player.name }}</div>
          <div class="text-center">{{ player.kd }} KD</div>
          <div class="text-right">{{ player.rating1 }} Rating</div>
         </RouterLink>
      </li>
    </ul>
    <button
      v-if="hasMore"
      :disabled="isLoading"
      @click="loadPlayers"
      class="bg-green-400 px-4 py-2 rounded w-full text-center my-4 text-white"
    >
      {{ isLoading ? 'Loading...' : 'Load More' }}
    </button>
    <p v-else class="text-center text-gray-500">No more players to load.</p>
  </div>
</template>
