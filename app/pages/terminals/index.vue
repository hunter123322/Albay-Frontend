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

            <!-- Terminals Grid (Public Only) -->
            <section>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div v-for="terminal in paginatedTerminals" :key="terminal._id"
                        class="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
                        <img :src="terminal.cover_image" :alt="terminal.title" class="w-full h-40 object-cover" />

                        <div class="p-4 space-y-2">
                            <h2 class="font-semibold text-blue-700">
                                {{ terminal.title }}
                            </h2>

                            <p class="text-xs text-gray-500">
                                {{ terminal.municipality }}
                            </p>

                            <p class="text-sm text-gray-600 line-clamp-2">
                                {{ terminal.description }}
                            </p>

                            <div class="flex flex-wrap gap-2 pt-2">
                                <span v-for="tag in terminal.activity_tags" :key="tag"
                                    class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    {{ tag }}
                                </span>
                            </div>

                            <a :href="`/terminals/${terminal.slug}`"
                                class="inline-block mt-3 text-sm text-blue-600 hover:underline">
                                View Details →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

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
        is_premium: false,
        view_count: 300 - index * 15,
        created_at: new Date()
    }))
)

const page = ref(1)
const perPage = 12

const totalPages = computed(() =>
    Math.ceil(terminals.value.length / perPage)
)

const paginatedTerminals = computed(() => {
    const start = (page.value - 1) * perPage
    return terminals.value.slice(start, start + perPage)
})
</script>
