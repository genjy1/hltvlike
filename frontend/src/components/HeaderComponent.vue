<template>
  <header :class="{'scrolled': isScrolled}" class="fixed ">
    <div class="header-container w-4/5 mx-auto  py-2 flex justify-between border rounded px-4 bg-white top-0">
      <div class="logo-wrapper">
        <RouterLink to="/" class="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          ESNHub
        </RouterLink>
      </div>
      <nav class="header-nav hidden sm:block">
        <ul class="nav-list flex justify-between gap-8">
          <li>
            <RouterLink to="/rankings">Team Ranking</RouterLink>
          </li>
          <li>
            <RouterLink to="/rankings/players">Player Ranking</RouterLink>
          </li>
          <li>
            <RouterLink to="/events">Events</RouterLink>
          </li>
        </ul>
      </nav>
      <div class="burger-wrapper flex justify-between flex-col sm:hidden"><span class="block h-1 w-8 bg-black"></span><span class="block h-1 w-8 bg-black"></span><span class="block h-1 w-8 bg-black"></span></div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

// Добавляем обработчик для отслеживания прокрутки
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50; // Фиксируем шапку после 50px прокрутки
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Анимация появления хедера */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  animation: fadeIn 0.8s ease-in-out;
  transform: translateY(0);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Стили для ссылок */
a:hover:not(.logo) {
  text-decoration: underline 2px;
  text-underline-offset: 16px;
}

.logo:hover {
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
}

.burger-wrapper > span{
  border-radius: 4px;
}
</style>
