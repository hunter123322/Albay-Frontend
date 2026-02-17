<!-- pages/tourist-spots/index.vue -->
<template>
  <PublicLayout>
    <div class="max-w-7xl mx-auto px-4 py-8">

      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-blue-700">
          Tourist Spots
        </h1>
        <p class="text-sm text-gray-500 mt-2">
          Explore natural attractions and destinations across Albay.
        </p>
      </div>

      <!-- Premium Carousel -->
      <div v-if="premiumListings.length" class="mb-12">
        <h2 class="text-xl font-semibold text-blue-700 mb-6">
          Sponsored
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PremiumCard v-for="item in premiumListings" :key="item._id" :listing="item" />
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ListingCard v-for="item in paginatedListings" :key="item._id" :listing="item" />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-12 gap-2">
        <button class="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 text-sm" :disabled="page === 1" @click="page--">
          Prev
        </button>

        <span class="px-4 py-2 text-sm text-gray-600">
          Page {{ page }} of {{ totalPages }}
        </span>

        <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm" :disabled="page === totalPages"
          @click="page++">
          Next
        </button>
      </div>

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
  createdAt: Date
  updatedAt: Date
}

const rawNames = [
  'Mayon Volcano Natural Park',
  'Lignon Hill Nature Park',
  'Quitinday Green Hills',
  'Sumlang Lake',
  'Busay Falls',
  'Vera Falls',
  'Muladbucad Grande Falls',
  'Calabidongan Cave',
  'Hoyop-Hoyopan Cave',
  'Mount Masaraga',
  'Mount Malinao'
]

const generateSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const listings = ref<Listing[]>(
  rawNames.map((name, index) => ({
    _id: String(index + 1),
    slug: generateSlug(name),
    title: name,
    cover_image: '/img/hero.jpg',
    description: `${name} is one of the well-known attractions in Albay offering scenic views and outdoor activities.`,
    category: ['tourist-spots'],
    municipality: 'Albay',
    geo_lat: 13.1 + index * 0.01,
    geo_lng: 123.7 + index * 0.01,
    activity_tags: ['Nature', 'Hiking'],
    contact_info: {},
    social_links: {},
    pricing_lowest: null,
    operating_hours: null,
    rating: Math.random() > 0.5 ? 4 + Math.random() : null,
    is_premium: index < 2,
    view_count: 100 - index * 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }))
)

const page = ref(1)
const perPage = 12

const premiumListings = computed(() =>
  listings.value.filter(l => l.is_premium).slice(0, 4)
)

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
