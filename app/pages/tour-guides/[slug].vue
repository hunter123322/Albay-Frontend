<!-- pages/tour-guides/[slug].vue -->
<template>
    <div v-if="guide" class="max-w-6xl mx-auto px-4 py-8">

        <!-- Hero -->
        <section class="relative rounded-3xl overflow-hidden mb-12">
            <img :src="coverImage" :alt="guide.title" class="w-full h-[320px] md:h-[420px] object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />

            <div class="absolute bottom-0 left-0 p-6 text-white space-y-3">
                <h1 class="text-2xl md:text-4xl font-bold">
                    {{ guide.title }}
                </h1>

                <div class="flex flex-wrap items-center gap-4 text-sm opacity-95">
                    <span>{{ guide.municipality }}</span>

                    <span v-if="guide.rating">
                        ⭐ {{ guide.rating.toFixed(1) }}
                    </span>

                    <span v-if="guide.pricing_lowest">
                        From ₱{{ guide.pricing_lowest.toLocaleString() }}
                    </span>
                </div>
            </div>
        </section>

        <!-- About -->
        <section class="mb-10">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                About the Guide
            </h2>
            <p class="text-gray-700 leading-relaxed">
                {{ guide.description }}
            </p>
        </section>

        <!-- Services -->
        <section v-if="guide.activity_tags?.length" class="mb-10">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Specialties
            </h2>
            <div class="flex flex-wrap gap-3">
                <span v-for="tag in guide.activity_tags" :key="tag"
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
                <div v-if="guide.contact_info.phone">
                    📞 {{ guide.contact_info.phone }}
                </div>

                <div v-if="guide.contact_info.email">
                    ✉️ {{ guide.contact_info.email }}
                </div>

                <div v-if="guide.contact_info.website">
                    🌐
                    <a :href="guide.contact_info.website" target="_blank" class="text-blue-600 hover:underline">
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
                <iframe :src="mapUrl" width="100%" height="350" style="border:0;" allowfullscreen='true'
                    loading="lazy" />
            </div>
        </section>

        <!-- Inline Ad -->
        <AdSlot identifier="AD_TOUR_GUIDE_DETAIL_INLINE" />

    </div>

    <div v-else class="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
        Guide not found.
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdSlot from '~/components/ads/AdSlot.vue'

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

const route = useRoute()

const mockGuides: Guide[] = [
    {
        _id: '1',
        slug: 'mayon-volcano-trek-guide',
        title: 'Mayon Volcano Trek Guide',
        cover_image: '/Albay-Frontend/img/hero.jpg',
        description: 'Professional trekking guide specializing in Mayon Volcano trails and adventure tours.',
        category: ['tour-guides'],
        municipality: 'Legazpi City',
        geo_lat: 13.257,
        geo_lng: 123.685,
        activity_tags: ['Volcano Trek', 'Adventure', 'Hiking'],
        contact_info: {
            phone: '+63 900 555 1234'
        },
        social_links: {},
        pricing_lowest: 2500,
        operating_hours: 'By appointment',
        rating: 4.8,
        is_premium: true,
        view_count: 320,
        created_at: new Date()
    }
]

const guide = computed(() =>
    mockGuides.find(g => g.slug === route.params.slug)
)

const coverImage = computed(() =>
    `/images/${guide.value?.slug || 'placeholder'}.jpg`
)

const mapUrl = computed(() => {
    if (!guide.value) return ''
    return `https://www.google.com/maps?q=${guide.value.geo_lat},${guide.value.geo_lng}&output=embed`
})

const hasContactInfo = computed(() =>
    guide.value &&
    (guide.value.contact_info.phone ||
        guide.value.contact_info.email ||
        guide.value.contact_info.website)
)
</script>
