<!-- pages/tourist-spots/[slug].vue -->
<template>
    <div v-if="listing" class="max-w-6xl mx-auto px-4 py-8">

        <!-- ================= HERO SECTION ================= -->
        <section class="relative rounded-3xl overflow-hidden mb-12">
            <img :src="mockListings[0]!.cover_image" :alt="listing.title" class="w-full h-[350px] md:h-[450px] object-cover" />

            <div class="absolute bottom-0 left-0 p-6 text-white space-y-3">
                <h1 class="text-2xl md:text-4xl font-bold">
                    {{ listing.title }}
                </h1>

                <div class="flex flex-wrap items-center gap-4 text-sm opacity-95">
                    <span class="flex items-center gap-1">
                        <MapPin class="w-4 h-4" />
                        {{ listing.municipality }}
                    </span>

                    <span v-if="listing.rating" class="flex items-center gap-1">
                        <Star class="w-4 h-4 fill-white" />
                        {{ listing.rating.toFixed(1) }}
                    </span>

                    <span v-if="listing.pricing_lowest">
                        Starts at ₱{{ listing.pricing_lowest.toLocaleString() }}
                    </span>
                </div>
            </div>
        </section>

        <!-- ================= DESCRIPTION ================= -->
        <section class="mb-10">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                About
            </h2>
            <p class="text-gray-700 leading-relaxed">
                {{ listing.description }}
            </p>
        </section>

        <!-- ================= ACTIVITY TAGS ================= -->
        <section v-if="listing.activity_tags.length" class="mb-10">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Activities
            </h2>
            <div class="flex flex-wrap gap-3">
                <NuxtLink v-for="tag in listing.activity_tags" :key="tag"
                    :to="`/tourist-spots?tag=${encodeURIComponent(tag)}`"
                    class="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition">
                    {{ tag }}
                </NuxtLink>
            </div>
        </section>

        <!-- ================= MAP SECTION ================= -->
        <section class="mb-12">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Location
            </h2>

            <div class="rounded-2xl overflow-hidden shadow-md">
                <iframe :src="mapUrl" width="100%" height="350" style="border:0;" allowfullscreen='true' loading="lazy" />
            </div>
        </section>

        <!-- ================= REVIEWS (Placeholder) ================= -->
        <section class="mb-12">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Reviews
            </h2>

            <div class="bg-blue-50 rounded-2xl p-6 text-sm text-gray-600">
                No reviews yet.
            </div>
        </section>

        <!-- ================= INLINE AD ================= -->
        <AdSlot identifier="AD_DETAIL_INLINE" />

    </div>

    <div v-else class="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
        Listing not found.
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MapPin, Star } from 'lucide-vue-next'
import AdSlot from '~/components/ads/AdSlot.vue'

interface Listing {
    _id: string
    slug: string
    title: string
    cover_image: string,
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

const mockListings: Listing[] = [
    {
        _id: '1',
        slug: 'mayon-volcano-natural-park',
        title: 'Mayon Volcano Natural Park',
        cover_image: '/img/hero.jpg',
        description: 'Iconic volcano known for its perfect cone shape and scenic landscapes.',
        category: ['tourist-spots'],
        municipality: 'Albay',
        geo_lat: 13.257,
        geo_lng: 123.685,
        activity_tags: ['Hiking', 'Sightseeing'],
        contact_info: {},
        social_links: {},
        pricing_lowest: null,
        operating_hours: null,
        rating: 4.8,
        is_premium: true,
        view_count: 100,
        created_at: new Date()
    }
]

const listing = computed(() =>
    mockListings.find(l => l.slug === route.params.slug)
)

const coverImage = computed(() =>
    `/images/${listing.value?.slug || 'placeholder'}.jpg`
)

const mapUrl = computed(() => {
    if (!listing.value) return ''
    return `https://www.google.com/maps?q=${listing.value.geo_lat},${listing.value.geo_lng}&output=embed`
})
</script>
