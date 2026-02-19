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
    <section class="relative flex flex-col md:flex-row max-w-7xl mx-auto px-4 gap-12 pt-20 items-center">
      <div class="w-full md:w-1/2 order-2 md:order-2 hidden md:block">
        <p class="text-gray-600 text-sm md:text-base leading-relaxed animate-on-scroll">
          This comprehensive Albay travel guide introduces visitors to one of the most iconic provinces in the Bicol
          region, known for its dramatic landscapes and vibrant local culture. At the center of Mayon Volcano tourism
          stands the near-perfect cone of Mayon, a natural landmark that defines the province’s identity and attracts
          travelers seeking panoramic views, outdoor adventure, and cultural heritage experiences. From historic ruins
          and scenic lakes to coastal viewpoints and eco-parks, there are diverse things to do in Albay for nature
          enthusiasts, photographers, families, and adventure seekers alike.
        </p>
        <div class="w-1/2 h-[2px] bg-gray-400 my-2 animate-on-scroll"></div>

        <p class="mt-4 text-gray-600 text-sm md:text-base leading-relaxed animate-on-scroll">
          As one of the leading Bicol tourist destinations, Albay offers a balanced mix of heritage sites, culinary
          experiences, transport accessibility, and guided tours that make travel planning straightforward. Visitors can
          explore centuries-old churches, enjoy local delicacies, experience ATV rides around Mayon’s lava trails, or
          unwind in lakeside and seaside attractions. Whether planning a short weekend escape or a detailed regional
          itinerary, this Albay travel guide provides structured access to top attractions, curated listings, and
          essential travel insights to help maximize every visit.
        </p>
        <div class="w-2/5 h-[2px] bg-gray-400 my-2 animate-on-scroll"></div>
      </div>

      <div class="w-full md:w-1/2 order-1 md:order-1">

        <!-- Section Header -->
        <div class="mb-8 animate-on-scroll">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            Top Attractions
          </h1>
          <p class="mt-2 hidden md:block text-gray-500 text-sm md:text-base">
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
          }" class="rounded-2xl overflow-hidden shadow-xl animate-on-scroll">
            <SwiperSlide v-for="spot in topAttractions" :key="spot.id">
              <TopAttractionCard :listing="spot" />
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
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

    <!-- ================= FEATURED BUSINESSES ================= -->
    <section class="mt-32 py-20 animate-on-scroll bg-gray-200">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-black text-slate-900 mb-10">Sponsor</h2>

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
            <SwiperSlide v-for="(item, index) in featuredBusinesses" :key="item.id" class="!w-[320px]">
              <PremiumCard :listing="item" :index="index"/>
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>

      <div class="mt-12 max-w-7xl mx-auto">
        <AdSlot identifier="AD_CATEGORY_GRID_INLINE" />
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
import AdSlot from '~/components/ads/AdSlot.vue'

const router = useRouter()
const searchQuery = ref('')
const suggestions = ref([])

const topAttractions = ref([])
const trendingSpots = ref([])
const featuredBusinesses = ref([])
const terminals = ref([])

const categories = [
  { name: 'Tourist Spots', link: '/tourist-spots', image: '/Albay-Frontend/img/categories/spots.jpg' },
  { name: 'Restaurants', link: '/restaurants', image: '/Albay-Frontend/img/categories/restaurant.jpg' },
  { name: 'Hotels', link: '/hotels', image: '/Albay-Frontend/img/categories/hotels.jpeg' },
  { name: 'Terminals', link: '/terminals', image: '/Albay-Frontend/img/categories/terminals.jpg' },
  { name: 'Tour Guides', link: '/tour-guides', image: '/Albay-Frontend/img/categories/guides.jpg' },
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
  router.push(`/search`)
}

onMounted(async () => {
  // Mock Data
  topAttractions.value = [
    { id: 4, title: 'Mayon Sky Line', municipality: 'Tabaco', slug: 'mayon-skyline-view-deck', cover_image: '/Albay-Frontend/img/topAttraction/mayonskyline.jpg' },
    { id: 2, title: 'Cagsawa Ruins', municipality: 'Daraga', slug: 'cagsawa-ruins', cover_image: '/Albay-Frontend/img/topAttraction/cagsawaruins.jpg' },
    { id: 3, title: 'Sumlang Lake', municipality: 'Camalig', slug: 'sumlang-lake', cover_image: '/Albay-Frontend/img/topAttraction/sumlanglake.jpg' },
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
      category: ["tourist-spots"],
      cover_image: "/Albay-Frontend/img/tendingSpots/7-11.jpg",
      description: "The viral Mayon-view convenience store in Camalig has become one of the most photographed roadside stops in Albay. Positioned perfectly along the highway, it offers a clear and dramatic backdrop of Mayon Volcano, making it a favorite among travelers, cyclists, and motorists who want a quick yet stunning photo opportunity. Its resemblance to Japan’s famous Fuji-Lawson viewpoint earned it the nickname as the Pinoy version of that iconic spot.\n\nBeyond being a social media favorite, the location serves as a practical rest stop where visitors can grab snacks, drinks, and essentials while enjoying the scenery. Sunrise and late afternoon are the best times to visit, when the lighting enhances Mayon’s near-perfect cone and creates a postcard-worthy view right from the parking area."
    },
    {
      _id: 2,
      title: "Farm Plate",
      municipality: "Daraga",
      pricing_lowest: "85",
      slug: "farm-plate-daraga",
      category: ["tourist-spots"],
      cover_image: "/Albay-Frontend/img/tendingSpots/farmplate.jpg",
      description: "Farm Plate in Daraga is a charming farm-themed destination known for its wide open spaces and uninterrupted views of Mayon Volcano. The property features landscaped gardens, vegetable plots, and a striking red chapel that has become a popular backdrop for photos, prenups, and casual visits. Its elevated terrain allows guests to appreciate Mayon’s symmetry from multiple vantage points.\n\nVisitors can enjoy simple farm-to-table meals, relax in picnic areas, or explore the grounds at a leisurely pace. The peaceful rural setting, combined with cool breezes and scenic views, makes it ideal for families, couples, and anyone seeking a calm escape just minutes away from the town center."
    },
    {
      _id: 3,
      title: "Sumlang Lake",
      municipality: "Camalig",
      slug: "sumlang-lake",
      pricing_lowest: "50",
      category: ["tourist-spots", "nature"],
      cover_image: "/Albay-Frontend/img/tendingSpots/sumlanglake.jpg",
      description: "Sumlang Lake in Camalig is well known for its calm waters that mirror the majestic shape of Mayon Volcano. The lake’s bamboo rafts allow visitors to paddle gently across the surface while enjoying an unobstructed view of the volcano, especially during clear mornings when the reflection appears almost symmetrical.\n\nAside from rafting, the area offers landscaped gardens, view decks, and open-air dining spaces where guests can relax and take photos. The combination of still water, greenery, and Mayon’s dramatic presence makes Sumlang Lake one of the most photogenic and tranquil destinations in Albay."
    },
    {
      _id: 4,
      title: "National Museum of the Philippines - Bicol",
      municipality: "Daraga",
      slug: "national-museum-bicol",
      pricing_lowest: "30",
      category: ["tourist-spots"],
      cover_image: "/Albay-Frontend/img/tendingSpots/museum.jpg",
      description: "The National Museum of the Philippines – Bicol, located in Daraga, is housed in a beautifully restored historic building that stands as an architectural landmark in the region. The museum showcases exhibits on Bicol’s natural history, geology, archaeology, and cultural heritage, offering visitors a deeper understanding of the area’s identity and volcanic landscape.\n\nInside, curated galleries present artifacts, historical narratives, and scientific displays that explain the formation of Mayon Volcano and the resilience of local communities. The blend of heritage architecture and educational exhibits makes it a meaningful stop for travelers interested in history, culture, and regional development."
    },
    {
      _id: 5,
      title: "Mayon Black Lava ATV Trails",
      municipality: "Legazpi City",
      slug: "mayon-black-lava-atv-trails",
      pricing_lowest: "50",
      category: ["adventure"],
      cover_image: "/Albay-Frontend/img/tendingSpots/blacklava.jpg",
      description: "Mayon Black Lava ATV Trails in Legazpi City offers an adrenaline-driven experience across the rugged terrain shaped by Mayon Volcano’s past eruptions. Riders navigate through fields of hardened black lava rocks, ash trails, and off-road paths while heading closer to the volcano’s base.\n\nThe guided tours vary in difficulty, making the activity accessible for beginners and experienced riders alike. Along the route, scenic stops provide panoramic views of Mayon and the surrounding landscape, combining adventure with dramatic natural scenery."
    },
    {
      _id: 6,
      title: "Cagsawa Ruins",
      municipality: "Daraga",
      slug: "cagsawa-ruins",
      pricing_lowest: "30",
      category: ["tourist-spots"],
      cover_image: "/Albay-Frontend/img/tendingSpots/cagsawaruins.jpg",
      description: "Cagsawa Ruins in Daraga is one of the most iconic historical landmarks in Albay. The remaining bell tower of the 16th-century Franciscan church stands as a reminder of the devastating 1814 eruption of Mayon Volcano, which buried the original town of Cagsawa under volcanic debris.\n\nToday, the site functions as both a heritage park and a major viewpoint for Mayon Volcano. Visitors can walk around landscaped grounds, explore small museums and souvenir shops, and capture classic photographs of the belfry framed by Mayon’s near-perfect cone."
    },
    {
      _id: 7,
      title: "Quitinday Green Hills",
      municipality: "Camalig",
      slug: "quitinday-green-hills",
      pricing_lowest: " N/A",
      category: ["tourist-spots"],
      cover_image: "/Albay-Frontend/img/tendingSpots/albayhills.jpg",
      description: "Quitinday Green Hills in Camalig features rolling grassy mounds that resemble miniature versions of the famous Chocolate Hills. The gentle slopes create a layered landscape that becomes especially vibrant during the rainy season when the grass turns lush and bright green.\n\nFrom the top of the hills, visitors are rewarded with sweeping views of Albay’s countryside and a clear perspective of Mayon Volcano. The relatively short trek makes it accessible for casual hikers, while the panoramic scenery makes it a popular sunrise and sunset spot."
    },
    {
      _id: 8,
      title: "Vera Falls",
      municipality: "Malinao",
      slug: "vera-falls",
      pricing_lowest: "20",
      category: ["tourist-spots"],
      cover_image: "/Albay-Frontend/img/tendingSpots/verafalls.jpg",
      description: "Vera Falls in Malinao is a serene waterfall hidden at the foot of Mount Malinao, surrounded by dense greenery and cool mountain air. The cascading waters flow into a natural pool, offering visitors a refreshing place to swim and relax away from the busy urban areas.\n\nReaching the falls involves a short trek through forested paths, adding a sense of adventure to the visit. Its tranquil atmosphere and natural setting make Vera Falls an ideal destination for nature lovers seeking a quiet and scenic retreat."
    }
  ]


  featuredBusinesses.value = [
    {
      _id: 2,
      title: 'Kuya Jims Ice Cream',
      municipality: 'Bacacay Albay',
      slug: 'Ice-Cream',
      cover_image: '/Albay-Frontend/img/icecream.png',
      isBlack: true
    },
    {
      _id: 1,
      title: 'Cake Amiga',
      municipality: 'Bacacay Albay',
      slug: 'Cake-Amiga',
      cover_image: '/Albay-Frontend/img/cakeAmiga.png',
      isBlack: true

    },
    {
      _id: 3,
      title: 'A Not So Popular Kid',
      municipality: 'Philippines',
      slug: 'A-Not-So-Popular-Kid',
      cover_image: '/Albay-Frontend/img/sponsor1.jpg',
      isBlack: true

    }

  ]

  terminals.value = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    name: `Terminal ${i + 1}`,
    municipality: 'Legazpi',
    cover_image: '/Albay-Frontend/img/terminals/legazpiterminal.jpg'
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