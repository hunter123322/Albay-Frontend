<!-- pages/tourist-spots/[slug].vue -->
<template>
    <div v-if="listing" class="max-w-6xl mx-auto px-4 py-8">

        <!-- ================= HERO SECTION ================= -->
        <section class="relative rounded-3xl overflow-hidden mb-12">
            <img :src="listing.cover_image" :alt="listing.title"
                class="w-full h-[350px] md:h-[450px] object-cover" />

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
                <iframe :src="mapUrl" width="100%" height="350" style="border:0;" allowfullscreen='true'
                    loading="lazy" />
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

let mockListings: Listing[] = [
    {
        _id: '1',
        slug: '7-eleven-salugan',
        title: '7-Eleven Salugan',
        cover_image: '/img/tendingSpots/7-11.jpg',
        description: 'The viral Mayon-view convenience store, dubbed the Pinoy version of the Fuji-Lawson photo spot.',
        category: ['instagrammable'],
        municipality: 'Camalig',
        geo_lat: 0,
        geo_lng: 0,
        activity_tags: [
            'Photography',
            'Sightseeing'
        ],
        contact_info: {
            phone: '',
            email: '',
            website: ''
        },
        social_links: {
            facebook: '',
            instagram: ''
        },
        pricing_lowest: 0,
        operating_hours: '',
        rating: 0,
        is_premium: false,
        view_count: 0,
        created_at: new Date()
    },
    {
        _id: '2',
        slug: 'farm-plate-daraga',
        title: 'Farm Plate',
        cover_image: '/img/tendingSpots/farmplate.jpg',
        description: 'A scenic farm destination featuring a red chapel, picnic grounds, and stunning Mayon views.',
        category: ['instagrammable'],
        municipality: 'Daraga',
        geo_lat: 0,
        geo_lng: 0,
        activity_tags: [
            'Photography',
            'Sightseeing',
            'Picnic'
        ],
        contact_info: {
            phone: '',
            email: '',
            website: ''
        },
        social_links: {
            facebook: '',
            instagram: ''
        },
        pricing_lowest: 85,
        operating_hours: '',
        rating: 0,
        is_premium: false,
        view_count: 0,
        created_at: new Date()
    },
    {
        _id: '3',
        slug: 'sumlang-lake',
        title: 'Sumlang Lake',
        cover_image: '/img/tendingSpots/sumlanglake.jpg',
        description: 'Famous for bamboo rafts and breathtaking reflections of Mayon Volcano.',
        category: ['instagrammable', 'nature'],
        municipality: 'Camalig',
        geo_lat: 0,
        geo_lng: 0,
        activity_tags: [
            'Sightseeing',
            'Photography',
            'Boating'
        ],
        contact_info: {
            phone: '',
            email: '',
            website: ''
        },
        social_links: {
            facebook: '',
            instagram: ''
        },
        pricing_lowest: 50,
        operating_hours: '',
        rating: 0,
        is_premium: false,
        view_count: 0,
        created_at: new Date()
    },
    {
        _id: '4',
        slug: 'national-museum-bicol',
        title: 'National Museum of the Philippines - Bicol',
        cover_image: '/img/tendingSpots/museum.jpg',
        description: "A renovated architectural landmark showcasing Bicol's history and geology.",
        category: ['heritage'],
        municipality: 'Daraga',
        geo_lat: 0,
        geo_lng: 0,
        activity_tags: [
            'Museum Visit',
            'Cultural Learning',
            'Sightseeing'
        ],
        contact_info: {
            phone: '',
            email: '',
            website: ''
        },
        social_links: {
            facebook: '',
            instagram: ''
        },
        pricing_lowest: 30,
        operating_hours: '',
        rating: 0,
        is_premium: false,
        view_count: 0,
        created_at: new Date()
    },
    {
        _id: '5',
        slug: 'mayon-black-lava-atv-trails',
        title: 'Mayon Black Lava ATV Trails',
        cover_image: '/img/tendingSpots/blacklava.jpg',
        description: "An adrenaline-filled ride across Mayon's dramatic lava trails.",
        category: ['adventure'],
        municipality: 'Legazpi City',
        geo_lat: 0,
        geo_lng: 0,
        activity_tags: [
            'ATV Riding',
            'Adventure',
            'Sightseeing'
        ],
        contact_info: {
            phone: '',
            email: '',
            website: ''
        },
        social_links: {
            facebook: '',
            instagram: ''
        },
        pricing_lowest: 50,
        operating_hours: '',
        rating: 0,
        is_premium: false,
        view_count: 0,
        created_at: new Date()
    },
    {
        _id: '6',
        slug: 'cagsawa-ruins',
        title: 'Cagsawa Ruins',
        cover_image: '/img/tendingSpots/cagsawaruins.jpg',
        description: 'The iconic 16th-century belfry buried by Mayon’s eruption.',
        category: ['heritage'],
        municipality: 'Daraga',
        geo_lat: 0,
        geo_lng: 0,
        activity_tags: [
            'Sightseeing',
            'Photography',
            'Historical Tour'
        ],
        contact_info: {
            phone: '',
            email: '',
            website: ''
        },
        social_links: {
            facebook: '',
            instagram: ''
        },
        pricing_lowest: 30,
        operating_hours: '',
        rating: 0,
        is_premium: false,
        view_count: 0,
        created_at: new Date()
    },
    {
        _id: '7',
        slug: 'quitinday-green-hills',
        title: 'Quitinday Green Hills',
        cover_image: '/img/tendingSpots/albayhills.jpg',
        description: 'Rolling green hills offering panoramic views of Albay and Mayon.',
        category: ['nature'],
        municipality: 'Camalig',
        geo_lat: 0,
        geo_lng: 0,
        activity_tags: [
            'Hiking',
            'Sightseeing',
            'Photography'
        ],
        contact_info: {
            phone: '',
            email: '',
            website: ''
        },
        social_links: {
            facebook: '',
            instagram: ''
        },
        pricing_lowest: 0,
        operating_hours: '',
        rating: 0,
        is_premium: false,
        view_count: 0,
        created_at: new Date()
    },
    {
        _id: '8',
        slug: 'vera-falls',
        title: 'Vera Falls',
        cover_image: '/img/tendingSpots/verafalls.jpg',
        description: 'A refreshing waterfall nestled at the foot of Mt. Malinao.',
        category: ['nature'],
        municipality: 'Malinao',
        geo_lat: 0,
        geo_lng: 0,
        activity_tags: [
            'Swimming',
            'Nature Viewing',
            'Photography'
        ],
        contact_info: {
            phone: '',
            email: '',
            website: ''
        },
        social_links: {
            facebook: '',
            instagram: ''
        },
        pricing_lowest: 20,
        operating_hours: '',
        rating: 0,
        is_premium: false,
        view_count: 0,
        created_at: new Date()
    }
]

const listing = computed<Listing | undefined>(() => {
    const found = mockListings.find(
        (l) => l.slug === String(route.params.slug)
    )
    return found
})

console.log(route.params.slug)

const mapUrl = computed(() => {
    if (!listing.value) return ''
    return `https://www.google.com/maps?q=${listing.value.geo_lat},${listing.value.geo_lng}&z=12&output=embed`

})
</script>
