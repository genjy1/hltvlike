import Events from '@/components/Events.vue'
import Home from '@/components/Home.vue'
import PlayerRankings from '@/components/PlayerRankings.vue'
import Rankings from '@/components/Rankings.vue'
import ShowPlayer from '@/components/ShowPlayer.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/rankings',
      name:'rankings',
      component:Rankings
    },
    {
      path:'/rankings/players',
      name:'rankings.players',
      component:PlayerRankings
    },
    {
      path:'/events',
      name:'events',
      component:Events
    },
    {
      path:'/player/:id/:name',
      name:'showPlayer',
      component: ShowPlayer
    }
  ],
})

export default router
