<!-- pages/hotels/[slug].vue -->
<template>
    <div v-if="listing" class="max-w-6xl mx-auto px-4 py-8">

        <!-- ================= HERO ================= -->
        <section class="relative rounded-3xl overflow-hidden mb-12">
            <img :src="coverImage" :alt="listing.title" class="w-full h-[320px] md:h-[420px] object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />

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

        <!-- ================= OPERATING HOURS ================= -->
        <section v-if="listing.operating_hours" class="mb-10">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Operating Hours
            </h2>
            <div class="flex items-center gap-2 text-gray-700 text-sm">
                <Clock class="w-4 h-4" />
                {{ listing.operating_hours }}
            </div>
        </section>

        <!-- ================= CONTACT INFO ================= -->
        <section v-if="hasContactInfo" class="mb-10">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Contact Information
            </h2>

            <div class="space-y-3 text-sm text-gray-700">
                <div v-if="listing.contact_info.phone" class="flex items-center gap-2">
                    <Phone class="w-4 h-4" />
                    {{ listing.contact_info.phone }}
                </div>

                <div v-if="listing.contact_info.email" class="flex items-center gap-2">
                    <Mail class="w-4 h-4" />
                    {{ listing.contact_info.email }}
                </div>

                <div v-if="listing.contact_info.website" class="flex items-center gap-2">
                    <Globe class="w-4 h-4" />
                    <a :href="listing.contact_info.website" target="_blank" class="text-blue-600 hover:underline">
                        Visit Website
                    </a>
                </div>
            </div>
        </section>

        <!-- ================= MAP ================= -->
        <section class="mb-12">
            <h2 class="text-xl font-semibold text-blue-700 mb-4">
                Location
            </h2>

            <div class="rounded-2xl overflow-hidden shadow-md">
                <iframe :src="mapUrl" width="100%" height="350" style="border:0;" allowfullscreen='true' loading="lazy" />
            </div>
        </section>

        <!-- ================= REVIEWS ================= -->
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
        Hotel not found.
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MapPin, Star, Clock, Phone, Mail, Globe } from 'lucide-vue-next'
import AdSlot from '~/components/ads/AdSlot.vue'

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

const route = useRoute()

const mockHotels: Listing[] = [
    {
        _id: '1',
        slug: 'legazpi-view-hotel',
        title: 'Legazpi View Hotel',
        cover_image: '/img/hero.jpg',
        description: 'Offers cozy rooms with stunning views of Mayon Volcano and modern amenities.',
        category: ['hotels'],
        municipality: 'Legazpi City',
        geo_lat: 13.131,
        geo_lng: 123.735,
        activity_tags: ['Stay', 'Relax'],
        contact_info: {
            phone: '+63 900 111 2222',
            website: 'https://legazpiviewhotel.com'
        },
        social_links: {},
        pricing_lowest: 1500,
        operating_hours: '24/7',
        rating: 4.6,
        is_premium: true,
        view_count: 400,
        created_at: new Date()
    }
]

const listing = computed(() =>
    mockHotels.find(h => h.slug === route.params.slug)
)

const coverImage = computed(() =>
    `/images/${listing.value?.slug || 'placeholder'}.jpg`
)

const mapUrl = computed(() => {
    if (!listing.value) return ''
    return `https://www.google.com/maps?q=${listing.value.geo_lat},${listing.value.geo_lng}&output=embed`
})

const hasContactInfo = computed(() =>
    listing.value &&
    (listing.value.contact_info.phone ||
        listing.value.contact_info.email ||
        listing.value.contact_info.website)
)
</script>
