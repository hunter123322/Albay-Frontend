<!-- pages/terminals/index.vue -->
<template>
    <PublicLayout>
        <div class="max-w-7xl mx-auto px-4 py-8">

            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-blue-700">
                    Transport Terminals
                </h1>
                <p class="text-sm text-gray-500 mt-2">
                    Find bus, jeepney, van, and transport terminals across Albay.
                </p>
            </div>

            <!-- Premium Terminals -->
            <section v-if="premiumTerminals.length" class="mb-12">
                <h2 class="text-xl font-semibold text-blue-700 mb-6">
                    Featured Terminals
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PremiumCard v-for="terminal in premiumTerminals" :key="terminal._id" :listing="terminal" />
                </div>
            </section>

            <!-- Terminals Grid -->
            <section>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ListingCard v-for="terminal in paginatedTerminals" :key="terminal._id" :listing="terminal" />
                </div>
            </section>

            <!-- Inline Ad -->
            <div class="mt-12">
                <AdSlot identifier="AD_TERMINALS_INLINE" />
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

interface Terminal {
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

const rawTerminals = [
    'Legazpi Grand Terminal',
    'Daraga Jeepney Terminal',
    'Tabaco City Bus Terminal',
    'Ligao Van Terminal',
    'Guinobatan Transport Hub',
    'Polangui Central Terminal'
]

const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const terminals = ref<Terminal[]>(
    rawTerminals.map((name, index) => ({
        _id: String(index + 1),
        slug: generateSlug(name),
        title: name,
        cover_image: '/img/hero.jpg',
        description: `${name} serves as a primary transport hub for commuters and travelers in Albay.`,
        category: ['terminals'],
        municipality: 'Albay',
        geo_lat: 13.13 + index * 0.015,
        geo_lng: 123.73 + index * 0.015,
        activity_tags: ['Bus', 'Jeepney', 'Van'],
        contact_info: {},
        social_links: {},
        pricing_lowest: null,
        operating_hours: '24/7',
        rating: null,
        is_premium: index < 1,
        view_count: 300 - index * 15,
        created_at: new Date()
    }))
)

const page = ref(1)
const perPage = 12

const premiumTerminals = computed(() =>
    terminals.value.filter(t => t.is_premium).slice(0, 4)
)

const nonPremiumTerminals = computed(() =>
    terminals.value.filter(t => !t.is_premium)
)

const totalPages = computed(() =>
    Math.ceil(nonPremiumTerminals.value.length / perPage)
)

const paginatedTerminals = computed(() => {
    const start = (page.value - 1) * perPage
    return nonPremiumTerminals.value.slice(start, start + perPage)
})
</script>
