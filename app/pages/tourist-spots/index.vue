<!-- pages/tourist-spots/index.vue -->
<template>
  <PublicLayout>
    <div class="bg-gray-50 min-h-screen">
      <!-- Hero Header -->
      <header class="bg-white border-b border-gray-100 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <nav class="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-600 uppercase mb-3">
                <span>Explore</span>
                <span class="w-1 h-1 rounded-full bg-blue-200"></span>
                <span>Destinations</span>
              </nav>
              <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Tourist <span
                  class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Spots</span>
              </h1>
              <p class="text-base md:text-lg text-slate-500 mt-4 max-w-2xl leading-relaxed">
                Discover the majestic natural wonders and hidden gems across the province of Albay, from volcanic
                landscapes to serene lakes.
              </p>
            </div>

            <!-- Quick Filter/Stats (Optional Visual Interest) -->
            <div class="hidden lg:flex gap-8 border-l border-gray-100 pl-8">
              <div class="text-center">
                <span class="block text-2xl font-bold text-slate-900">{{ listings.length }}</span>
                <span class="text-xs font-medium text-slate-400 uppercase">Total Spots</span>
              </div>
              <div class="text-center">
                <span class="block text-2xl font-bold text-slate-900">4.5+</span>
                <span class="text-xs font-medium text-slate-400 uppercase">Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-6 py-12">
        <!-- Premium Section -->
        <section v-if="premiumListings.length" class="mb-16">
          <div class="flex items-center gap-4 mb-8">
            <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              Featured Destinations
            </h2>
            <div class="h-px w-full bg-gradient-to-r from-gray-200 to-transparent"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PremiumCard v-for="(item, index) in premiumListings" :key="item._id" :listing="item" :index="index"
              class="transform hover:-translate-y-1 transition-transform duration-300 shadow-xl shadow-blue-900/5" />
          </div>
        </section>

        <!-- Main Listing Section -->
        <section>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 class="text-2xl font-bold text-slate-800">Popular Attractions</h2>

            <!-- Grid Layout Controls/Filters can go here -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-500 font-medium">Sort by:</span>
              <select
                class="text-sm border-none bg-white rounded-lg px-3 py-1.5 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Popularity</option>
                <option>Highest Rated</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ListingCard v-for="(item, index) in paginatedListings" :key="item._id" :listing="item" :index="index"
              class="hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 rounded-2xl overflow-hidden bg-white" />
          </div>

          <!-- Professional Pagination -->
          <nav class="mt-16 flex items-center justify-between border-t border-gray-200 pt-8 px-2">
            <div class="hidden sm:block">
              <p class="text-sm text-slate-500">
                Showing <span class="font-medium text-slate-900">{{ (page - 1) * perPage + 1 }}</span> to
                <span class="font-medium text-slate-900">{{ Math.min(page * perPage, nonPremiumListings.length)
                }}</span> of
                <span class="font-medium text-slate-900">{{ nonPremiumListings.length }}</span> results
              </p>
            </div>

            <div class="flex items-center gap-3">
              <button
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                :disabled="page === 1" @click="page--">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                Previous
              </button>

              <div class="flex items-center gap-1">
                <template v-for="n in totalPages" :key="n">
                  <button @click="page = n"
                    class="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all"
                    :class="page === n ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-100'">
                    {{ n }}
                  </button>
                </template>
              </div>

              <button
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-100"
                :disabled="page === totalPages" @click="page++">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </nav>
        </section>
      </main>
    </div>


  </PublicLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ListingCard from '~/components/cards/ListingCard.vue'
import PremiumCard from '~/components/cards/PremiumCard.vue'
import PublicLayout from '~/layouts/PublicLayout.vue'

interface Listing {
  _id: string
  slug: string
  title: string
  cover_image: string
  description: string
  category: string[]
  municipality: string
  geo_lat: number
  geo_lng: number
  activity_tags: string[]
  contact_info: {
    phone?: string
    email?: string
    website?: string
  }
  social_links: {
    facebook?: string
    instagram?: string
  }
  pricing_lowest: number | null
  operating_hours: string | null
  rating: number | null
  is_premium: boolean
  view_count: number
  gradient: boolean
  createdAt: Date
  updatedAt: Date
}

const listings = ref<Listing[]>([
  {
    _id: "3",
    slug: "quitinday-green-hills",
    title: "Quitinday Green Hills",
    cover_image: "/Albay-Frontend/img/tendingSpots/albayHills.jpg",
    description:
      "Quitinday Green Hills is known for its scenic rolling hills and relaxing environment.",
    category: ["tourist-spots"],
    municipality: "Albay",
    geo_lat: 13.200,
    geo_lng: 123.600,
    activity_tags: ["Nature", "Hiking"],
    contact_info: {},
    social_links: {},
    pricing_lowest: null,
    operating_hours: null,
    rating: 4.4,
    is_premium: false,
    view_count: 90,
    gradient: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "4",
    slug: "sumlang-lake",
    title: "Sumlang Lake",
    cover_image: "/Albay-Frontend/img/tendingSpots/sumlanglake.jpg",
    description:
      "Sumlang Lake offers peaceful lake views with a perfect backdrop of Mayon Volcano.",
    category: ["tourist-spots"],
    municipality: "Albay",
    geo_lat: 13.180,
    geo_lng: 123.720,
    activity_tags: ["Nature", "Boating"],
    contact_info: {},
    social_links: {},
    pricing_lowest: null,
    operating_hours: null,
    rating: 4.6,
    is_premium: false,
    view_count: 88,
    gradient: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "5",
    slug: "busay-falls",
    title: "Busay Falls",
    cover_image: "/Albay-Frontend/img/tendingSpots/verafalls.jpg",
    description:
      "Busay Falls is a refreshing waterfall destination surrounded by lush greenery.",
    category: ["tourist-spots"],
    municipality: "Albay",
    geo_lat: 13.050,
    geo_lng: 123.650,
    activity_tags: ["Nature", "Waterfalls"],
    contact_info: {},
    social_links: {},
    pricing_lowest: null,
    operating_hours: null,
    rating: 4.3,
    is_premium: false,
    view_count: 80,
    gradient: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "1",
    slug: "mayon-volcano-natural-park",
    title: "Mayon Volcano Natural Park",
    cover_image: "/Albay-Frontend/img/hero.jpg",
    description:
      "Mayon Volcano Natural Park is one of the well-known attractions in Albay offering scenic views and outdoor activities.",
    category: ["tourist-spots"],
    municipality: "Albay",
    geo_lat: 13.257,
    geo_lng: 123.685,
    activity_tags: ["Nature", "Hiking"],
    contact_info: {},
    social_links: {},
    pricing_lowest: null,
    operating_hours: null,
    rating: 4.8,
    is_premium: false,
    view_count: 100,
    gradient: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    slug: "lignon-hill-nature-park",
    title: "Lignon Hill Nature Park",
    cover_image: "/Albay-Frontend/img/tendingSpots/hills.jpg",
    description:
      "Lignon Hill Nature Park offers panoramic views of Mayon and exciting outdoor activities.",
    category: ["tourist-spots"],
    municipality: "Albay",
    geo_lat: 13.143,
    geo_lng: 123.735,
    activity_tags: ["Nature", "Sightseeing"],
    contact_info: {},
    social_links: {},
    pricing_lowest: null,
    operating_hours: null,
    rating: 4.5,
    is_premium: false,
    view_count: 95,
    gradient: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
const page = ref(1)
const perPage = 12

const premiumListings = [
  {
    _id: 1,
    slug: 'quituinan-ranch',
    title: 'Quituinan Ranch',
    cover_image: '/Albay-Frontend/img/touristSpots/quituinan.jpg',
    description: 'Quituinan Ranch in Camalig, Albay offers panoramic views of Mayon Volcano surrounded by vast green fields and grazing cattle. Known for its peaceful countryside atmosphere, it is a favorite for photography, sightseeing, and sunset viewing with the iconic volcano as backdrop.',
    category: ['tourist-spots'],
    municipality: 'Camalig',
    geo_lat: 13.1825,
    geo_lng: 123.6421,
    activity_tags: ['Sightseeing', 'Photography', 'Nature', 'Farm Experience'],
    contact_info: {
      phone: '+63 917 123 4567'
    },
    pricing_lowest: 50, // entrance fee estimate
    operating_hours: '8:00 AM – 6:00 PM',
    rating: 4.6,
    is_premium: true,
    view_count: 287,
    gradient: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 2,
    slug: 'farm-plate-daraga',
    title: 'FarmPlate',
    cover_image: '/Albay-Frontend/img/touristSpots/farmplate.jpg',
    description: 'FarmPlate in Daraga, Albay is a beautifully landscaped agri-tourism destination featuring a red mini chapel, picnic grounds, pigeon houses, and scenic views of Mayon Volcano. It blends rural charm with curated photo spots, making it one of the most Instagrammable attractions in the province.',
    category: ['tourist-spots'],
    municipality: 'Daraga',
    geo_lat: 13.1483,
    geo_lng: 123.6932,
    activity_tags: ['Photography', 'Picnic', 'Agri-Tourism', 'Sightseeing'],
    contact_info: {
      phone: '+63 928 456 7890'
    },
    pricing_lowest: 100, // entrance fee estimate
    operating_hours: '9:00 AM – 7:00 PM',
    rating: 4.7,
    is_premium: true,
    view_count: 312,
    gradient: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]


const nonPremiumListings = computed(() =>
  listings.value.filter(l => !l.is_premium)
)

const totalPages = computed(() =>
  Math.ceil(nonPremiumListings.value.length / perPage)
)

const paginatedListings = computed(() => {
  const start = (page.value - 1) * perPage
  return nonPremiumListings.value.slice(start, start + perPage)
})
</script>
