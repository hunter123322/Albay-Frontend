<!-- pages/terminals/[slug].vue -->
<template>
    <div v-if="terminal" class="max-w-6xl mx-auto px-4 py-8">

        <!-- Hero -->
        <section class="relative rounded-3xl overflow-hidden mb-12">
            <img :src="coverImage" :alt="terminal.title" class="w-full h-[320px] md:h-[420px] object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />

            <div class="absolute bottom-0 left-0 p-6 text-white space-y-3">
                <h1 class="text-2xl md:text-4xl font-bold">
                    {{ terminal.title }}
                </h1>

                <div class="flex flex-wrap items-center gap-4 text-sm opacity-95">
                    <span>{{ terminal.municipality }}</span>

                    <span v-if="terminal.operating_hours">
                        Open: {{ terminal.operating_hours }}
                    </span>
                </div>
            </div>
        </section>

        <!-- Description -->
        <section class="mb-10">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                About the Terminal
            </h2>
            <p class="text-gray-700 leading-relaxed">
                {{ terminal.description }}
            </p>
        </section>

        <!-- Services -->
        <section v-if="terminal.activity_tags?.length" class="mb-10">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Available Transport
            </h2>
            <div class="flex flex-wrap gap-3">
                <span v-for="tag in terminal.activity_tags" :key="tag"
                    class="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {{ tag }}
                </span>
            </div>
        </section>

        <!-- Contact -->
        <section v-if="hasContactInfo" class="mb-12">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Contact Information
            </h2>

            <div class="space-y-2 text-sm text-gray-700">
                <div v-if="terminal.contact_info.phone">
                    📞 {{ terminal.contact_info.phone }}
                </div>

                <div v-if="terminal.contact_info.email">
                    ✉️ {{ terminal.contact_info.email }}
                </div>

                <div v-if="terminal.contact_info.website">
                    🌐
                    <a :href="terminal.contact_info.website" target="_blank" class="text-blue-600 hover:underline">
                        Visit Website
                    </a>
                </div>
            </div>
        </section>

        <!-- Map -->
        <section class="mb-12">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Location
            </h2>

            <div class="rounded-2xl overflow-hidden shadow-md">
                <iframe :src="mapUrl" width="100%" height="350" style="border:0;" allowfullscreen='true' loading="lazy" />
            </div>
        </section>

        <!-- Inline Ad -->
        <AdSlot identifier="AD_TERMINAL_DETAIL_INLINE" />

    </div>

    <div v-else class="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
        Terminal not found.
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdSlot from '~/components/ads/AdSlot.vue'

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

const route = useRoute()

const mockTerminals: Terminal[] = [
    {
        _id: '1',
        slug: 'legazpi-grand-terminal',
        title: 'Legazpi Grand Terminal',
        cover_image: '/img/hero.jpg',
        description: 'Main transportation hub in Legazpi City serving buses, jeepneys, and vans for provincial and local routes.',
        category: ['terminals'],
        municipality: 'Legazpi City',
        geo_lat: 13.143,
        geo_lng: 123.743,
        activity_tags: ['Bus', 'Jeepney', 'Van'],
        contact_info: {
            phone: '+63 900 888 1111'
        },
        social_links: {},
        pricing_lowest: null,
        operating_hours: '24/7',
        rating: null,
        is_premium: true,
        view_count: 520,
        created_at: new Date()
    }
]

const terminal = computed(() =>
    mockTerminals.find(t => t.slug === route.params.slug)
)

const coverImage = computed(() =>
    `/images/${terminal.value?.slug || 'placeholder'}.jpg`
)

const mapUrl = computed(() => {
    if (!terminal.value) return ''
    return `https://www.google.com/maps?q=${terminal.value.geo_lat},${terminal.value.geo_lng}&output=embed`
})

const hasContactInfo = computed(() =>
    terminal.value &&
    (terminal.value.contact_info.phone ||
        terminal.value.contact_info.email ||
        terminal.value.contact_info.website)
)
</script>
