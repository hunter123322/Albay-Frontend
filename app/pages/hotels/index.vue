<template>
    <PublicLayout>
        <div class="bg-slate-50 min-h-screen overflow-hidden">

            <!-- ================= HERO ================= -->
            <header class="relative bg-white border-b border-slate-100">

                <!-- Decorative Gradient Blobs -->
                <div class="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"></div>

                <div class="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
                    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

                        <!-- Hero Text -->
                        <div class="max-w-2xl">
                            <nav
                                class="flex items-center gap-2 text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">
                                <span>Stay</span>
                                <span class="w-1 h-1 rounded-full bg-blue-300"></span>
                                <span>Albay</span>
                            </nav>

                            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                Find Your Perfect
                                <span
                                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Hotel in Albay
                                </span>
                            </h1>

                            <p class="text-base md:text-lg text-slate-500 mt-5 leading-relaxed">
                                Discover top-rated hotels, cozy inns, beachfront resorts, and luxury stays across Albay.
                                Whether you're visiting for adventure, relaxation, or business, find accommodations
                                that match your style and budget.
                            </p>
                        </div>

                        <!-- Stats -->
                        <div class="hidden lg:flex gap-10 border-l border-slate-200 pl-10">
                            <div class="text-center">
                                <span class="block text-3xl font-bold text-slate-900">
                                    {{ listings.length }}
                                </span>
                                <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                                    Total Hotels
                                </span>
                            </div>
                            <div class="text-center">
                                <span class="block text-3xl font-bold text-slate-900">
                                    4.5+
                                </span>
                                <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                                    Avg Guest Rating
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            <!-- ================= CONTENT ================= -->
            <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-10 md:-mt-14 relative z-10 pb-24">

                <!-- Featured Section -->
                <section v-if="premiumListings.length" class="mb-20 md:mb-28">
                    <div class="flex items-center gap-4 mb-10">
                        <div class="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                            <Award class="w-5 h-5 text-white" />
                        </div>
                        <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Featured Destinations
                        </h2>
                        <div class="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-slate-200 to-transparent">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PremiumCard v-for="(item, index) in premiumListings" :key="item._id" :listing="item"
                            :index="index" class="hover:-translate-y-2 transition-transform duration-500" />
                    </div>
                </section>

                <!-- Listings Section -->
                <section class="space-y-12 md:space-y-16">

                    <!-- Section Header -->
                    <div
                        class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
                        <div>
                            <h3 class="text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                                All Tourist Spots
                            </h3>
                            <p class="text-sm text-slate-500 font-semibold uppercase tracking-widest mt-1">
                                Showing {{ paginatedListings.length }} of {{ nonPremiumListings.length }} destinations
                            </p>
                        </div>

                        <!-- Filter Pills -->
                        <div class="flex flex-wrap gap-3">
                            <button
                                class="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest shadow-sm">
                                All
                            </button>
                            <button
                                class="px-5 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest hover:border-blue-500 hover:text-blue-600 transition">
                                Nature
                            </button>
                            <button
                                class="px-5 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest hover:border-blue-500 hover:text-blue-600 transition">
                                View Decks
                            </button>
                        </div>
                    </div>

                    <!-- Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <ListingCard v-for="(item, index) in paginatedListings" :key="item._id" :listing="item"
                            :index="index"
                            class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 hover:-translate-y-1" />
                    </div>

                    <!-- Inline Ad -->
                    <div class="py-12">
                        <AdSlot identifier="AD_CATEGORY_GRID_INLINE" class="rounded-3xl overflow-hidden" />
                    </div>

                    <!-- Pagination -->
                    <div class="flex items-center justify-center gap-4 pt-10">
                        <button
                            class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 transition shadow-sm"
                            :disabled="page === 1" @click="page--">
                            <ChevronLeft class="w-5 h-5" />
                        </button>

                        <div class="flex items-center bg-white px-6 h-12 rounded-2xl border border-slate-200 shadow-sm">
                            <span class="text-xs font-bold uppercase tracking-widest text-slate-400">
                                Page <span class="text-slate-900">{{ page }}</span>
                                <span class="mx-1">/</span>
                                {{ totalPages }}
                            </span>
                        </div>

                        <button
                            class="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-900 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600 transition shadow-lg"
                            :disabled="page === totalPages" @click="page++">
                            <ChevronRight class="w-5 h-5" />
                        </button>
                    </div>

                </section>
            </div>
        </div>
    </PublicLayout>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue'
import { Building2, Award, ChevronLeft, ChevronRight } from 'lucide-vue-next'
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
    created_at?: Date
}

const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const listings = ref<Listing[]>([
    {
        _id: "1",
        slug: generateSlug("The Oriental Legazpi"),
        title: "The Oriental Legazpi",
        cover_image: "/img/hotels/The-Oriental-Legazpi.jpeg",
        description: "The Oriental Legazpi is a well-known hotel in Albay offering premium accommodations and scenic views of Mayon Volcano.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1520,
        geo_lng: 123.7430,
        activity_tags: ["Hotel", "Luxury Stay"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 4500,
        operating_hours: "24 Hours",
        rating: 4.6,
        is_premium: true,
        view_count: 300,
    },
    {
        _id: "2",
        slug: generateSlug("The Marison Hotel"),
        title: "The Marison Hotel",
        cover_image: "/img/hotels/The-Marison-Hotel.jpg",
        description: "The Marison Hotel offers comfortable and modern accommodations in the heart of Legazpi City.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1435,
        geo_lng: 123.7421,
        activity_tags: ["Hotel", "Business Stay"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 3800,
        operating_hours: "24 Hours",
        rating: 4.5,
        is_premium: true,
        view_count: 290,
    },
    {
        _id: "3",
        slug: generateSlug("hotel-st-ellis"),
        title: "Hotel St. Ellis",
        cover_image: "/img/hotels/Hotel-Ellis.jpg",
        description: "Hotel St. Ellis is a popular mid-range hotel located near key attractions in Legazpi City.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1460,
        geo_lng: 123.7395,
        activity_tags: ["Hotel", "City Stay"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 3500,
        operating_hours: "24 Hours",
        rating: 4.3,
        is_premium: false,
        view_count: 280,
    },
    {
        _id: "4",
        slug: generateSlug("Lotus Blu Hotel Legazpi"),
        title: "Lotus Blu Hotel Legazpi",
        cover_image: "/img/hotels/Lotus-Blu-Hotel-Legazpi.webp",
        description: "Lotus Blu Hotel Legazpi is a boutique hotel offering stylish rooms and convenient access to malls and restaurants.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1412,
        geo_lng: 123.7380,
        activity_tags: ["Hotel", "Boutique Stay"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 3200,
        operating_hours: "24 Hours",
        rating: 4.4,
        is_premium: false,
        view_count: 270,
    },
    {
        _id: "6",
        slug: generateSlug("The Pepperland Hotel"),
        title: "The Pepperland Hotel",
        cover_image: "/img/hotels/The-Pepperland-Hotel.webp",
        description: "The Pepperland Hotel offers comfortable accommodations ideal for business and leisure travelers.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1555,
        geo_lng: 123.7450,
        activity_tags: ["Hotel", "Business Stay"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 3000,
        operating_hours: "24 Hours",
        rating: 4.1,
        is_premium: false,
        view_count: 250,
    },
    {
        _id: "7",
        slug: generateSlug("La Piazza Hotel and Convention Center"),
        title: "La Piazza Hotel and Convention Center",
        cover_image: "/img/hotels/La-Piazza-Hotel-and-Convention-Center.jpg",
        description: "La Piazza Hotel and Convention Center is a great choice for events and comfortable stays in Legazpi.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1602,
        geo_lng: 123.7503,
        activity_tags: ["Hotel", "Convention Center"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 3400,
        operating_hours: "24 Hours",
        rating: 4.0,
        is_premium: false,
        view_count: 240,
    },
    {
        _id: "8",
        slug: generateSlug("OGMA Suites Legazpi"),
        title: "OGMA Suites Legazpi",
        cover_image: "/img/hotels/OGMA-Suites-Legazpi.jpg",
        description: "OGMA Suites Legazpi offers modern suite-style accommodations for longer stays.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1487,
        geo_lng: 123.7444,
        activity_tags: ["Hotel", "Suite Stay"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 3600,
        operating_hours: "24 Hours",
        rating: 4.4,
        is_premium: false,
        view_count: 230,
    },
    {
        _id: "9",
        slug: generateSlug("Hotel Lucca"),
        title: "Hotel Lucca",
        cover_image: "/img/hotels/Hotel-Lucca.jpg",
        description: "Hotel Lucca is a budget-friendly hotel located near key attractions in Legazpi City.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1422,
        geo_lng: 123.7368,
        activity_tags: ["Hotel", "Budget Stay"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 2500,
        operating_hours: "24 Hours",
        rating: 4.1,
        is_premium: false,
        view_count: 220,
    },
    {
        _id: "10",
        slug: generateSlug("Proxy by The Oriental Albay"),
        title: "Proxy by The Oriental Albay",
        cover_image: "/img/hotels/Proxy-by-The-Oriental-Albay.webp",
        description: "Proxy by The Oriental Albay offers modern accommodations with easy access to Legazpi City attractions.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1510,
        geo_lng: 123.7420,
        activity_tags: ["Hotel", "Modern Stay"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 3300,
        operating_hours: "24 Hours",
        rating: 4.3,
        is_premium: false,
        view_count: 210,
    },
    {
        _id: "5",
        slug: generateSlug("Hotel Sentro Legazpi"),
        title: "Hotel Sentro Legazpi",
        cover_image: "/img/hotels/Hotel-Sentro-Legazpi.jpg",
        description: "Hotel Sentro Legazpi provides affordable and cozy accommodations for travelers visiting Albay.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1398,
        geo_lng: 123.7375,
        activity_tags: ["Hotel", "Budget Stay"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 2800,
        operating_hours: "24 Hours",
        rating: 4.2,
        is_premium: false,
        view_count: 260,
    },
]
);

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