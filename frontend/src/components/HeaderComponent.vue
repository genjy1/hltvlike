<template>
  <header :class="{'scrolled': isScrolled}">
    <div class="header-container w-4/5 mx-auto my-0 py-2 flex justify-between border rounded px-4 bg-white">
      <div class="logo-wrapper">
        <RouterLink to="/" class="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          ESNHub
        </RouterLink>
      </div>
      <nav class="header-nav">
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

/* Эффект при прокрутке */
header.scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-10px); /* Поднимаем хедер чуть вверх */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Анимация появления */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

/* Дополнительные настройки для адаптивности */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .nav-list {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
