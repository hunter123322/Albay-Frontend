<template>
  <PublicLayout>
    <!-- ================= HERO SECTION ================= -->
    <section class="relative min-h-[95vh] flex items-center text-white">

      <!-- Background -->
      <img src="/img/hero.jpg" alt="Albay Tourism" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      <!-- Content Container -->
      <div class="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-16 animate-on-scroll">
        <div class="max-w-2xl">

          <div class="w-16 h-[2px] bg-white/70 mb-6"></div>
          <h1 class="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-6 ">
            Discover <span class="font-semibold">Albay</span>
          </h1>
          <p class="text-lg md:text-xl text-white/80 mb-10 tracking-wide">
            Heart of Bicol. Soul of Adventure.
          </p>

          <div class="relative max-w-md">
            <input v-model="searchQuery" type="text" placeholder="Search destinations..."
              class="w-full px-6 py-3 rounded-md bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-300"
              @input="handleAutocomplete" @keyup.enter="submitSearch" />

            <div v-if="suggestions.length" class="absolute left-0 right-0 mt-3
                 bg-white text-gray-800
                 rounded-md shadow-xl
                 overflow-hidden">
              <div v-for="item in suggestions" :key="item" @click="selectSuggestion(item)" class="px-5 py-3 hover:bg-gray-100 cursor-pointer
                   text-sm transition-colors border-b border-gray-100 last:border-0">
                {{ item }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ================= TOP TOURIST ATTRACTIONS (Auto-scroll) ================= -->
    <section class="w-full max-w-7xl mx-auto px-4 pt-20">

      <!-- Section Header -->
      <div class="mb-8 animate-on-scroll">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
          Top Attractions
        </h1>
        <p class="mt-2 hidden md:flex text-gray-500 text-sm md:text-base">
          Discover the most popular places travelers love to visit
        </p>
      </div>

      <ClientOnly>
        <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :loop="true" :speed="1000" :autoplay="{
          delay: 3000,
          disableOnInteraction: false
        }" :pagination="{
          clickable: true,
          dynamicBullets: true
        }" class="top-attractions-swiper rounded-2xl overflow-hidden shadow-xl animate-on-scroll">
          <SwiperSlide v-for="spot in topAttractions" :key="spot.id">
            <TopAttractionCard :listing="spot" />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </section>



    <!-- ================= TRENDING SPOTS ================= -->
    <section class="max-w-7xl mx-auto px-4 mt-24">
      <div class="flex items-end justify-between mb-10 animate-on-scroll">
        <div>
          <span class="text-blue-600 font-bold uppercase tracking-widest text-xs">Recommended</span>
          <h2 class="md:text-2xl lg:text-4xl text-xl font-black text-slate-900">Trending Spots</h2>
        </div>
        <NuxtLink to="/tourist-spots" class="text-blue-600 font-bold hover:underline flex items-center gap-1">
          More
          <ArrowUpRight class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ListingCard v-for="(spot, index) in trendingSpots" :key="spot.id" :listing="spot" :index="index" />
      </div>
    </section>

    <!-- ================= FEATURED BUSINESSES ================= -->
    <section class="mt-32 py-24 animate-on-scroll">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-black text-slate-900 mb-10">Premium Stays & Dining</h2>

        <ClientOnly>
          <Swiper :modules="[Autoplay, FreeMode]" slides-per-view="auto" :space-between="32" :loop="true" :speed="6000"
            :autoplay="{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }" :free-mode="{
              enabled: true,
              momentum: false
            }" class="pb-10">
            <SwiperSlide v-for="item in featuredBusinesses" :key="item.id" class="!w-[320px]">
              <PremiumCard :listing="item" />
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
    </section>

    <!-- ================= CATEGORY CARDS ================= -->
    <section class="max-w-7xl mx-auto px-4 mt-32 animate-on-scroll">
      <h2 class="text-3xl font-black text-slate-900 mb-10">Explore Categories</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <NuxtLink v-for="cat in categories" :key="cat.name" :to="cat.link"
          class="group relative h-48 rounded-3xl overflow-hidden shadow-lg border border-slate-100">
          <img :src="cat.image"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
          <div class="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/20 transition-colors duration-500" />
          <div
            class="relative z-10 h-full flex items-center justify-center text-white font-bold text-xl drop-shadow-md">
            {{ cat.name }}
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ================= TRANSPORT TERMINALS ================= -->
    <section class="max-w-7xl mx-auto px-4 my-32 animate-on-scroll">
      <div class="flex items-center gap-3 mb-10">
        <div class="bg-blue-100 p-3 rounded-2xl">
          <MapPin class="w-6 h-6 text-blue-600" />
        </div>
        <h2 class="text-3xl font-black text-slate-900">Transport Hubs</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <TerminalCard v-for="terminal in terminals" :key="terminal.id" :terminal="terminal" />
      </div>
    </section>

  </PublicLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MapPin, ArrowUpRight } from 'lucide-vue-next'
import PublicLayout from '~/layouts/PublicLayout.vue'
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import ListingCard from '~/components/cards/ListingCard.vue'
import PremiumCard from '~/components/cards/PremiumCard.vue'
import TopAttractionCard from '~/components/cards/TopAttractionCard.vue'
import TerminalCard from '~/components/cards/TerminalCard.vue'

const router = useRouter()
const searchQuery = ref('')
const suggestions = ref([])

const topAttractions = ref([])
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
  // Mock Data
  topAttractions.value = [
    { id: 4, title: 'Mayon Sky Line', municipality: 'Tabaco', slug: 'mayon-sky-line', cover_image: '/img/topAttraction/mayonskyline.jpg' },
    { id: 2, title: 'Cagsawa Ruins', municipality: 'Daraga', slug: 'cagsawa-ruins', cover_image: '/img/topAttraction/cagsawaruins.jpg' },
    { id: 3, title: 'Sumlang Lake', municipality: 'Camalig', slug: 'sumlang-lake', cover_image: '/img/topAttraction/sumlanglake.jpg' },
  ]
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slideUp'); // triggers Tailwind animation
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.05 } // trigger when 10% visible
  );

  elements.forEach(el => observer.observe(el));

  trendingSpots.value = [
    {
      _id: 1,
      title: "7-Eleven Salugan",
      municipality: "Camalig",
      slug: "7-eleven-salugan",
      pricing_lowest: " Free",
      category: ["instagrammable"],
      cover_image: "/img/tendingSpots/7-11.jpg",
      description: "The viral Mayon-view convenience store, dubbed the Pinoy version of the Fuji-Lawson photo spot."
    },
    {
      _id: 2,
      title: "Farm Plate",
      municipality: "Daraga",
      pricing_lowest: "85",
      slug: "farm-plate-daraga",
      category: ["instagrammable"],
      cover_image: "/img/tendingSpots/farmplate.jpg",
      description: "A scenic farm destination featuring a red chapel, picnic grounds, and stunning Mayon views."
    },
    {
      _id: 3,
      title: "Sumlang Lake",
      municipality: "Camalig",
      slug: "sumlang-lake",
      pricing_lowest: "50",
      category: ["instagrammable", "nature"],
      cover_image: "/img/tendingSpots/sumlanglake.jpg",
      description: "Famous for bamboo rafts and breathtaking reflections of Mayon Volcano."
    },
    {
      _id: 4,
      title: "National Museum of the Philippines - Bicol",
      municipality: "Daraga",
      slug: "national-museum-bicol",
      pricing_lowest: "30",
      category: ["heritage"],
      cover_image: "/img/tendingSpots/museum.jpg",
      description: "A renovated architectural landmark showcasing Bicol's history and geology."
    },
    {
      _id: 5,
      title: "Mayon Black Lava ATV Trails",
      municipality: "Legazpi City",
      slug: "mayon-black-lava-atv-trails",
      pricing_lowest: "50",
      category: ["adventure"],
      cover_image: "/img/tendingSpots/blacklava.jpg",
      description: "An adrenaline-filled ride across Mayon's dramatic lava trails."
    },
    {
      _id: 6,
      title: "Cagsawa Ruins",
      municipality: "Daraga",
      slug: "cagsawa-ruins",
      pricing_lowest: "30",
      category: ["heritage"],
      cover_image: "/img/tendingSpots/cagsawaruins.jpg",
      description: "The iconic 16th-century belfry buried by Mayon’s eruption."
    },
    {
      _id: 7,
      title: "Quitinday Green Hills",
      municipality: "Camalig",
      slug: "quitinday-green-hills",
      pricing_lowest: " N/A",
      category: ["nature"],
      cover_image: "/img/tendingSpots/albayhills.jpg",
      description: "Rolling green hills offering panoramic views of Albay and Mayon."
    },
    {
      _id: 8,
      title: "Vera Falls",
      municipality: "Malinao",
      slug: "vera-falls",
      pricing_lowest: "20",
      category: ["nature"],
      cover_image: "/img/tendingSpots/verafalls.jpg",
      description: "A refreshing waterfall nestled at the foot of Mt. Malinao."
    }
  ]

  featuredBusinesses.value = [
    {
      _id: 2,
      title: 'Kuya Jims Ice Cream',
      municipality: 'Bacacay Albay',
      slug: 'Ice-Cream',
      cover_image: '/img/icecream.png'
    },
    {
      _id: 1,
      title: 'Cake Amiga',
      municipality: 'Bacacay Albay',
      slug: 'Cake-Amiga',
      cover_image: '/img/cakeAmiga.png'
    }

  ]

  terminals.value = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    name: `Terminal ${i + 1}`,
    municipality: 'Legazpi',
    cover_image: '/img/terminals/legazpiterminal.jpg'
  }))
})
</script>

<style>
.top-attractions-swiper .swiper-pagination-bullet-active {
  background: white !important;
}

.top-attractions-swiper .swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.5);
}
</style>