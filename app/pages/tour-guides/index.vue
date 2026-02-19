<!-- pages/tour-guides/index.vue -->
<template>
    <PublicLayout>
        <div class="max-w-7xl mx-auto px-4 py-8">

            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-5xl font-bold text-red-600">
                    Under Development
                </h1>
                <h1 class="text-3xl font-bold text-blue-700">
                    Tour Guides
                </h1>
                <p class="text-sm text-gray-500 mt-2">
                    Discover accredited and local tour guides across Albay.
                </p>
            </div>

            <!-- Premium Guides -->
            <section v-if="premiumGuides.length" class="mb-12">
                <h2 class="text-xl font-semibold text-blue-700 mb-6">
                    Featured Guides
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PremiumCard v-for="(guide, index) in premiumGuides" :key="guide._id" :listing="guide"
                        :index="index" />
                </div>
            </section>

            <!-- Guide Grid -->
            <section>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ListingCard v-for="(guide, index) in paginatedGuides" :key="guide._id" :listing="guide"
                        :index="index" />
                </div>
            </section>

            <!-- Inline Ad -->
            <div class="mt-12">
                <AdSlot identifier="AD_TOUR_GUIDES_INLINE" />
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

interface Guide {
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

const rawGuides = [
    'Mayon Volcano Trek Guide',
    'Donsol Whale Shark Guide',
    'Legazpi City Heritage Guide',
    'Cagraray Island Guide',
    'Quitinday Hills Guide',
    'Sumlang Lake Tour Guide'
]

const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const guides = ref<Guide[]>(
    rawGuides.map((name, index) => ({
        _id: String(index + 1),
        slug: generateSlug(name),
        title: name,
        cover_image: '/img/hero.jpg',
        description: `${name} provides professional local guiding services for tourists visiting Albay.`,
        category: ['tour-guides'],
        municipality: 'Albay',
        geo_lat: 13.13 + index * 0.02,
        geo_lng: 123.73 + index * 0.02,
        activity_tags: ['Adventure', 'Local Experience'],
        contact_info: {},
        social_links: {},
        pricing_lowest: 1500 + index * 300,
        operating_hours: 'By appointment',
        rating: 4.2 + Math.random() * 0.6,
        is_premium: index < 2,
        view_count: 180 - index * 8,
        created_at: new Date()
    }))
)

const page = ref(1)
const perPage = 12

const premiumGuides = computed(() =>
    guides.value.filter(g => g.is_premium).slice(0, 4)
)

const nonPremiumGuides = computed(() =>
    guides.value.filter(g => !g.is_premium)
)

const totalPages = computed(() =>
    Math.ceil(nonPremiumGuides.value.length / perPage)
)

const paginatedGuides = computed(() => {
    const start = (page.value - 1) * perPage
    return nonPremiumGuides.value.slice(start, start + perPage)
})
</script>
