<!-- pages/restaurants/index.vue -->
<template>
    <PublicLayout>
        <div class="bg-slate-50 min-h-screen pb-20">

            <header class="bg-white border-b border-slate-200 relative overflow-hidden">
                <div
                    class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10">
                </div>
                <div class="max-w-7xl mx-auto px-6 py-16">
                    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div class="space-y-4">
                            <div
                                class="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                                <Utensils class="w-4 h-4" />
                                <span>Culinary Directory</span>
                            </div>
                            <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                                Albay <span class="text-blue-600">Gastronomy</span>
                            </h1>
                            <p class="text-slate-500 max-w-xl text-lg leading-relaxed">
                                Explore a curated selection of the finest dining experiences, from local Bicolano
                                delicacies to international fusion.
                            </p>
                        </div>

                        <div class="hidden lg:flex gap-10 border-l border-slate-100 pl-10">
                            <div class="text-center">
                                <span class="block text-2xl font-black text-slate-900">{{ nonPremiumListings.length +
                                    premiumListings.length }}</span>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-tighter">Venues</span>
                            </div>
                            <div class="text-center">
                                <span class="block text-2xl font-black text-slate-900">4.5</span>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-tighter">Avg
                                    Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main class="max-w-7xl mx-auto px-6 mt-12">

                <section v-if="premiumListings.length" class="mb-16">
                    <div class="flex items-center gap-4 mb-8">
                        <h2 class="text-sm font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                            Featured Establishments
                        </h2>
                        <div class="h-px w-full bg-slate-200"></div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <PremiumCard v-for="(item, index) in premiumListings" :key="item._id" :listing="item"
                            :index="index"
                            class="hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500" />
                    </div>
                </section>

                <section>
                    <div class="flex items-center justify-between mb-8">
                        <h2 class="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                            All Restaurants
                            <span class="px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-md font-bold">
                                {{ nonPremiumListings.length }}
                            </span>
                        </h2>

                        <div class="flex items-center gap-2">
                            <button class="p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50">
                                <Filter class="w-4 h-4 text-slate-600" />
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <ListingCard v-for="(item, index) in paginatedListings" :key="item._id" :listing="item"
                            :index="index"
                            class="bg-white rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-colors shadow-sm" />
                    </div>
                </section>

                <div class="my-16">
                    <AdSlot identifier="AD_CATEGORY_GRID_INLINE" class="rounded-[2.5rem] overflow-hidden" />
                </div>

                <nav class="flex items-center justify-between border-t border-slate-200 pt-10">
                    <div class="hidden md:block">
                        <p class="text-sm text-slate-500">
                            Showing page <span class="font-bold text-slate-900">{{ page }}</span> of <span
                                class="font-bold text-slate-900">{{ totalPages }}</span>
                        </p>
                    </div>

                    <div class="flex items-center gap-2">
                        <button
                            class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            :disabled="page === 1" @click="page--">
                            <ChevronLeft class="w-4 h-4" />
                            Prev
                        </button>

                        <div class="flex items-center">
                            <button v-for="p in totalPages" :key="p" @click="page = p"
                                class="w-10 h-10 rounded-xl text-sm font-bold transition-all"
                                :class="page === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-blue-600'">
                                {{ p }}
                            </button>
                        </div>

                        <button
                            class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 disabled:opacity-30 shadow-lg shadow-blue-100 transition-all"
                            :disabled="page === totalPages" @click="page++">
                            Next
                            <ChevronRight class="w-4 h-4" />
                        </button>
                    </div>
                </nav>

            </main>
        </div>
    </PublicLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ListingCard from '~/components/cards/ListingCard.vue'
import PremiumCard from '~/components/cards/PremiumCard.vue'
import AdSlot from '~/components/ads/AdSlot.vue'
import PublicLayout from '~/layouts/PublicLayout.vue'
import { Utensils, Filter, ChevronLeft, ChevronRight } from 'lucide-vue-next'


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
    createdAt?: string
    updatedAt?: string
}

const rawNames = [
    'Small Talk Café',
    'Colonial Grill',
    '1st Colonial Grill',
    'Bigg’s Diner Legazpi',
    'Wasabi San',
    'Waway’s Restaurant',
    'Balay Cena Una',
    'Casa Lorenzo'
]

const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const listings = ref<Listing[]>(
    rawNames.map((name, index) => ({
        _id: String(index + 1),
        slug: generateSlug(name),
        title: name,
        cover_image: '/Albay-Frontend/img/hero.jpg',
        description: `${name} is a popular restaurant offering local and international cuisine in Albay.`,
        category: ['restaurants'],
        municipality: 'Legazpi City',
        geo_lat: 13.14 + index * 0.01,
        geo_lng: 123.73 + index * 0.01,
        activity_tags: ['Dining', 'Local Cuisine'],
        contact_info: {},
        social_links: {},
        pricing_lowest: 250,
        operating_hours: '9:00 AM - 9:00 PM',
        rating: 4.2 + Math.random() * 0.5,
        is_premium: index < 2,
        view_count: 200 - index * 5,
    }))
)

const page = ref(1)
const perPage = 12

const premiumListings = [
    {
        _id: "7",
        slug: generateSlug("Kouzina Tyche Seafood Restaurant"),
        title: "Kouzina Tyche Seafood Restaurant",
        cover_image: "/Albay-Frontend/img/restaurants/kouzina-tyche-seafood.jpg",
        description: "Kouzina Tyche Seafood Restaurant is a popular restaurant offering local and international cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Legazpi City",
        geo_lat: 13.200,
        geo_lng: 123.790,
        activity_tags: ["Dining", "Seafood"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 350,
        operating_hours: "10:00 AM - 10:00 PM",
        rating: 4.4,
        is_premium: true,
        gradient: true,
        view_count: 170,
    },
    {
        _id: "2",
        slug: generateSlug("Bigg-Diner-Old-Albay"),
        title: "Bigg's Diner - Old Albay",
        cover_image: "/Albay-Frontend/img/restaurants/Bigg's-Diner.jpg",
        description: "Bigg's Diner - Old Albay is a popular restaurant offering local and international cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Legazpi City",
        geo_lat: 13.150,
        geo_lng: 123.740,
        activity_tags: ["Dining", "Local Cuisine"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 250,
        operating_hours: "9:00 AM - 9:00 PM",
        rating: 4.4,
        is_premium: true,
        gradient: true,
        view_count: 195,
    },
];


const nonPremiumListings = [
    {
        _id: "3",
        slug: generateSlug("Legazpi Four Seasons Restaurant"),
        title: "Legazpi Four Seasons Restaurant",
        cover_image: "/Albay-Frontend/img/restaurants/Legazpi-Four-Seasons-Restaurant.jpg",
        description: "Legazpi Four Seasons Restaurant is a popular restaurant offering local and international cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Legazpi City",
        geo_lat: 13.160,
        geo_lng: 123.750,
        activity_tags: ["Dining", "Local Cuisine"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 280,
        operating_hours: "9:00 AM - 9:00 PM",
        rating: 4.3,
        is_premium: false,
        view_count: 190,
    },
    {
        _id: "4",
        slug: generateSlug("Boklan Food Center"),
        title: "Boklan Food Center",
        cover_image: "/Albay-Frontend/img/restaurants/Boklan-Food.webp",
        description: "Boklan Food Center is a popular restaurant offering local and international cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Daraga",
        geo_lat: 13.170,
        geo_lng: 123.760,
        activity_tags: ["Dining", "Local Cuisine"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 200,
        operating_hours: "9:00 AM - 9:00 PM",
        rating: 4.2,
        is_premium: false,
        view_count: 185,
    },
    {
        _id: "5",
        slug: generateSlug("Small Talk Café"),
        title: "Small Talk Café",
        cover_image: "/Albay-Frontend/img/restaurants/Small-Talk-Cafe.jpg",
        description: "Small Talk Café is a popular restaurant offering local and international cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Legazpi City",
        geo_lat: 13.180,
        geo_lng: 123.770,
        activity_tags: ["Dining", "Cafe"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 220,
        operating_hours: "9:00 AM - 9:00 PM",
        rating: 4.5,
        is_premium: false,
        view_count: 180,
    },
    {
        _id: "6",
        slug: generateSlug("Waways Restaurant"),
        title: "Waway's Restaurant",
        cover_image: "/Albay-Frontend/img/restaurants/Waway-Restaurant.jpg",
        description: "Waway's Restaurant is a popular restaurant offering local and international cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Legazpi City",
        geo_lat: 13.190,
        geo_lng: 123.780,
        activity_tags: ["Dining", "Local Cuisine"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 260,
        operating_hours: "9:00 AM - 9:00 PM",
        rating: 4.3,
        is_premium: false,
        view_count: 175,
    },
    {
        _id: "8",
        slug: generateSlug("Antonias Restaurant"),
        title: "Antonia's Restaurant",
        cover_image: "/Albay-Frontend/img/restaurants/Antonia-Restaurant.webp",
        description: "Antonia's Restaurant is a popular restaurant offering local and international cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Daraga",
        geo_lat: 13.210,
        geo_lng: 123.800,
        activity_tags: ["Dining", "Filipino Cuisine"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 300,
        operating_hours: "9:00 AM - 9:00 PM",
        rating: 4.5,
        is_premium: false,
        view_count: 165,
    },
    {
        _id: "9",
        slug: generateSlug("Balay sa Bikol"),
        title: "Balay sa Bikol",
        cover_image: "/Albay-Frontend/img/restaurants/Balay-sa-Bikol.jpg",
        description: "Balay sa Bikol is a popular restaurant offering authentic Bicolano cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Daraga",
        geo_lat: 13.220,
        geo_lng: 123.810,
        activity_tags: ["Dining", "Bicolano Cuisine"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 320,
        operating_hours: "9:00 AM - 9:00 PM",
        rating: 4.6,
        is_premium: false,
        view_count: 160,
    },
    {
        _id: "1",
        slug: generateSlug("1st Colonial Grill"),
        title: "1st Colonial Grill",
        cover_image: "/Albay-Frontend/img/restaurants/1st-Colonial-Grill.jpg",
        description: "1st Colonial Grill is a popular restaurant offering local and international cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Legazpi City",
        geo_lat: 13.140,
        geo_lng: 123.730,
        activity_tags: ["Dining", "Local Cuisine"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 300,
        operating_hours: "9:00 AM - 9:00 PM",
        rating: 4.6,
        is_premium: true,
        view_count: 200,
    },
    {
        _id: "10",
        slug: generateSlug("Chachis Kitchen"),
        title: "Chachi's Kitchen",
        cover_image: "/Albay-Frontend/img/restaurants/Chachi-Kitchen.jpg",
        description: "Chachi's Kitchen is a popular restaurant offering Indian cuisine in Albay.",
        category: ["restaurants"],
        municipality: "Legazpi City",
        geo_lat: 13.230,
        geo_lng: 123.820,
        activity_tags: ["Dining", "Indian Cuisine"],
        contact_info: {},
        social_links: {},
        pricing_lowest: 300,
        operating_hours: "11:00 AM - 9:00 PM",
        rating: 4.3,
        is_premium: false,
        view_count: 155,
    }
]

const totalPages = computed(() =>
    Math.ceil(nonPremiumListings.length / perPage)
)

const paginatedListings = computed(() => {
    const start = (page.value - 1) * perPage
    return nonPremiumListings.slice(start, start + perPage)
})
</script>

<style scoped>
.bg-grid-slate-100 {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(241 245 249 / 1)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E");
}
</style>