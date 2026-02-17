<!-- pages/index.vue -->
<template>
  <PublicLayout>

    <!-- ================= HERO SECTION ================= -->
    <section class="relative min-h-screen flex items-center justify-center text-white">
      <img src="/img/hero.jpg" alt="Albay Tourism" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/70" />

      <div class="relative z-10 w-full max-w-3xl px-4 text-center">

        <h1 class="text-3xl md:text-5xl font-bold mb-6 tracking-wide">
          Discover Albay
        </h1>

        <!-- Search -->
        <div class="relative">
          <input v-model="searchQuery" type="text" placeholder="Search places, activities, municipality..."
            class="w-full px-5 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400"
            @input="handleAutocomplete" @keyup.enter="submitSearch" />

          <!-- Autocomplete Dropdown -->
          <div v-if="suggestions.length"
            class="absolute left-0 right-0 mt-2 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden z-20">
            <div v-for="item in suggestions" :key="item" @click="selectSuggestion(item)"
              class="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm">
              {{ item }}
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ================= AD SLOT TOP ================= -->
    <div class="max-w-7xl mx-auto px-4 mt-10">
      <AdSlot identifier="AD_HOME_TOP" />
    </div>

    <!-- ================= TRENDING SPOTS ================= -->
    <section class="max-w-7xl mx-auto px-4 mt-16">
      <h2 class="text-2xl font-semibold text-blue-700 mb-6">
        Trending Spots
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ListingCard v-for="spot in trendingSpots" :key="spot.id" :listing="spot" />
      </div>
    </section>

    <!-- ================= CATEGORY CARDS ================= -->
    <section class="max-w-7xl mx-auto px-4 mt-20">
      <h2 class="text-2xl font-semibold text-blue-700 mb-8">
        Explore Categories
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <NuxtLink v-for="cat in categories" :key="cat.name" :to="cat.link"
          class="group relative h-40 rounded-xl overflow-hidden shadow-md">
          <img :src="cat.image"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div class="absolute inset-0 bg-blue-900/50 group-hover:bg-blue-900/60 transition" />
          <div class="relative z-10 h-full flex items-center justify-center text-white font-semibold text-lg">
            {{ cat.name }}
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ================= FEATURED BUSINESSES ================= -->
    <section class="max-w-7xl mx-auto px-4 mt-20">
      <h2 class="text-2xl font-semibold text-blue-700 mb-6">
        Featured Businesses
      </h2>

      <ClientOnly>
        <Swiper :modules="[Autoplay, FreeMode]" slides-per-view="auto" :space-between="24" :loop="true" :speed="6000"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }" :free-mode="{
          enabled: true,
          momentum: false
        }" :allow-touch-move="true" :grab-cursor="true" class="pb-6">
          <SwiperSlide v-for="item in featuredBusinesses" :key="item.id" class="!w-[280px]">
            <PremiumCard :listing="item" />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </section>

    <!-- ================= TERMINALS PREVIEW ================= -->
    <section class="max-w-7xl mx-auto px-4 mt-20 over">
      <h2 class="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
        <MapPin class="w-5 h-5" />
        Transport Terminals
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TerminalCard v-for="terminal in terminals" :key="terminal.id" :terminal="terminal" />
      </div>
    </section>

    <!-- ================= AD SLOT INLINE ================= -->
    <div class="max-w-7xl mx-auto px-4 mt-16">
      <!-- <AdSlot identifier="AD_HOME_INLINE" /> -->
    </div>

  </PublicLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MapPin } from 'lucide-vue-next'
import PublicLayout from '~/layouts/PublicLayout.vue';
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, FreeMode } from "swiper/modules"

import "swiper/css"
import "swiper/css/free-mode"

import ListingCard from '~/components/cards/ListingCard.vue'
import PremiumCard from '~/components/cards/PremiumCard.vue'
import TerminalCard from '~/components/cards/TerminalCard.vue'
// import AdSlot from '~/components/cards/AdSlot.vue'

const appConfig = useAppConfig()
const router = useRouter()

const searchQuery = ref('')
const suggestions = ref([])

const trendingSpots = ref([])
const featuredBusinesses = ref([])
const terminals = ref([])

const categories = [
  { name: 'Tourist Spots', link: '/tourist-spots', image: '/img/hero.jpg' },
  { name: 'Restaurants', link: '/restaurants', image: '/img/hero.jpg' },
  { name: 'Hotels', link: '/hotels', image: '/img/hero.jpg' },
  { name: 'Terminals', link: '/terminals', image: '/img/hero.jpg' },
  { name: 'Tour Guides', link: '/tour-guides', image: '/img/hero.jpg' },
]

const handleAutocomplete = () => {
  if (!searchQuery.value) {
    suggestions.value = []
    return
  }

  suggestions.value = [
    searchQuery.value,
    `${searchQuery.value} in Legazpi`,
    `${searchQuery.value} activities`,
    `Hotels in ${searchQuery.value}`
  ].slice(0, 5)
}

const selectSuggestion = (value) => {
  searchQuery.value = value
  submitSearch()
}

const submitSearch = () => {
  if (!searchQuery.value) return
  router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
}

onMounted(async () => {
  trendingSpots.value = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: `Trending Spot ${i + 1}`
  }))

  featuredBusinesses.value = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `Featured Business ${i + 1}`
  }))

  terminals.value = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    name: `Terminal ${i + 1}`
  }))
})

const carousel = ref(null);

const scrollLeft = () => {
  carousel.value.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRight = () => {
  carousel.value.scrollBy({ left: 300, behavior: "smooth" });
};
</script>