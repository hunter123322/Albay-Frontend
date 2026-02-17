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
          <PremiumCard v-for="(item, index) in premiumListings" :key="item._id" :listing="item" :index="index" />
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ListingCard v-for="(item, index) in paginatedListings" :key="item._id" :listing="item" :index="index" />
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
  gradient: boolean
  createdAt: Date
  updatedAt: Date
}

const listings = ref<Listing[]>([
  {
    _id: "1",
    slug: "mayon-volcano-natural-park",
    title: "Mayon Volcano Natural Park",
    cover_image: "/img/hero.jpg",
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
    cover_image: "/img/tendingSpots/hills.jpg",
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
  },
  {
    _id: "3",
    slug: "quitinday-green-hills",
    title: "Quitinday Green Hills",
    cover_image: "/img/tendingSpots/albayHills.jpg",
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
    cover_image: "/img/tendingSpots/sumlanglake.jpg",
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
    cover_image: "/img/tendingSpots/verafalls.jpg",
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
  }
])
const page = ref(1)
const perPage = 12

const premiumListings = [
  {
    _id: 1,
    slug: 'quituinan-ranch',
    title: 'Quituinan Ranch',
    cover_image: '/img/touristSpots/quituinan.jpg',
    description: 'Quituinan Ranch in Camalig, Albay offers panoramic views of Mayon Volcano surrounded by vast green fields and grazing cattle. Known for its peaceful countryside atmosphere, it is a favorite for photography, sightseeing, and sunset viewing with the iconic volcano as backdrop.',
    category: ['tourist-spots'],
    municipality: 'Camalig',
    geo_lat: 13.1825,
    geo_lng: 123.6421,
    activity_tags: ['Sightseeing', 'Photography', 'Nature', 'Farm Experience'],
    contact_info: {
      phone: '+63 917 123 4567'
    },
    social_links: {
      facebook: 'https://facebook.com/quitoinanranch'
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
    slug: 'farmplate-daraga',
    title: 'FarmPlate',
    cover_image: '/img/touristSpots/farmplate.jpg',
    description: 'FarmPlate in Daraga, Albay is a beautifully landscaped agri-tourism destination featuring a red mini chapel, picnic grounds, pigeon houses, and scenic views of Mayon Volcano. It blends rural charm with curated photo spots, making it one of the most Instagrammable attractions in the province.',
    category: ['tourist-spots'],
    municipality: 'Daraga',
    geo_lat: 13.1483,
    geo_lng: 123.6932,
    activity_tags: ['Photography', 'Picnic', 'Agri-Tourism', 'Sightseeing'],
    contact_info: {
      phone: '+63 928 456 7890'
    },
    social_links: {
      facebook: 'https://facebook.com/farmplatealbay',
      instagram: 'https://instagram.com/farmplate'
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
