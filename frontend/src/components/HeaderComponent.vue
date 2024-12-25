<template>
  <header>
    <div class="header-container w-4/5 mx-auto my-0 py-2 flex justify-between">
      <div class="logo-wrapper">
        <RouterLink to="/" class="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          ESNHub
        </RouterLink>
    </div>
    <nav class="header-nav">
      <ul class="nav-list flex justify-between gap-8">
        <li>
          <RouterLink to="#">Team Ranking</RouterLink>
        </li>
        <li>
          <RouterLink to="#">Player Ranking</RouterLink>
        </li>
        <li>
          <RouterLink to="#">Events</RouterLink>
        </li>
      </ul>
    </nav>
    </div>
  </header>
</template>
<script setup></script>
<style scoped>
 a:hover:not(.logo){
    text-decoration: underline 2px;
    text-underline-offset: 16px;
 }


 .logo:hover{
  -webkit-text-fill-color:transparent;
  background-clip: text;
  -webkit-background-clip:text;
  background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff)
 }
</style>
