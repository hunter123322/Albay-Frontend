<!-- pages/hotels/index.vue -->
<template>
  <PublicLayout>
    <div class="max-w-7xl mx-auto px-4 py-8">

        <!-- Page Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-blue-700">
                Hotels
            </h1>
            <p class="text-sm text-gray-500 mt-2">
                Browse accommodations and stay options across Albay.
            </p>
        </div>

        <!-- Premium Section -->
        <section v-if="premiumListings.length" class="mb-12">
            <h2 class="text-xl font-semibold text-blue-700 mb-6">
                Sponsored
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PremiumCard v-for="item in premiumListings" :key="item._id" :listing="item" />
            </div>
        </section>

        <!-- Grid Listings -->
        <section>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <ListingCard v-for="item in paginatedListings" :key="item._id" :listing="item" />
            </div>
        </section>

        <!-- Inline Ad -->
        <div class="mt-12">
            <AdSlot identifier="AD_CATEGORY_GRID_INLINE" />
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-12 gap-3">
            <button class="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 text-sm disabled:opacity-40"
                :disabled="page === 1" @click="page--">
                Prev
            </button>

            <span class="px-4 py-2 text-sm text-gray-600">
                Page {{ page }} of {{ totalPages }}
            </span>

            <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm disabled:opacity-40"
                :disabled="page === totalPages" @click="page++">
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
import AdSlot from '~/components/ads/AdSlot.vue'
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
    created_at: Date
}

const rawNames = [
    'Legazpi View Hotel',
    'Misibis Bay Resort',
    'Bigg’s Hotel',
    'Oriental Hotel',
    'Hotel St. Ellis',
    'Casa Amparo Hotel',
    'Albay Park Hotel'
]

const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const listings = ref<Listing[]>(
    rawNames.map((name, index) => ({
        _id: String(index + 1),
        slug: generateSlug(name),
        title: name,
        cover_image: '/img/hero.jpg',
        description: `${name} provides comfortable accommodation and amenities for travelers in Albay.`,
        category: ['hotels'],
        municipality: 'Legazpi City',
        geo_lat: 13.13 + index * 0.01,
        geo_lng: 123.73 + index * 0.01,
        activity_tags: ['Stay', 'Accommodation'],
        contact_info: {},
        social_links: {},
        pricing_lowest: 1200 + index * 200,
        operating_hours: '24/7',
        rating: 4.0 + Math.random() * 0.5,
        is_premium: index < 2,
        view_count: 250 - index * 10,
        created_at: new Date()
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
