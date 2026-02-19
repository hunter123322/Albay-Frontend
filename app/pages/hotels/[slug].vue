<!-- pages/hotels/[slug].vue -->
<template>
    <PublicLayout>
        <div v-if="listing" class="bg-slate-50 min-h-screen pb-20">
            <!-- HERO SECTION -->
            <section class="relative h-[50vh] md:h-[65vh] min-h-[400px] w-full overflow-hidden">
                <img :src="listing.cover_image" :alt="listing.title"
                    class="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div class="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div class="max-w-7xl mx-auto">
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span v-for="tag in listing.activity_tags" :key="tag"
                                class="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                                {{ tag }}
                            </span>
                        </div>

                        <h1
                            class="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4 leading-none">
                            {{ listing.title }}
                        </h1>

                        <div
                            class="flex flex-wrap items-center gap-6 text-slate-300 text-sm font-bold uppercase tracking-widest">
                            <span class="flex items-center gap-2">
                                <MapPin class="w-4 h-4 text-blue-500" />
                                {{ listing.municipality }}, Albay
                            </span>
                            <span v-if="listing.rating" class="flex items-center gap-2">
                                <Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                {{ listing.rating.toFixed(1) }} Rating
                            </span>
                            <span v-if="listing.pricing_lowest" class="flex items-center gap-2">
                                <Tag class="w-4 h-4 text-emerald-500" />
                                From ₱{{ listing.pricing_lowest.toLocaleString() }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CONTENT GRID -->
            <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

                <!-- Main Content (Left) -->
                <div class="lg:col-span-2 space-y-12">
                    <!-- Overview -->
                    <section class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
                        <h2
                            class="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-6 flex items-center gap-3">
                            <Info class="w-6 h-6 text-blue-600" />
                            Overview
                        </h2>
                        <p class="text-slate-600 leading-relaxed text-lg font-medium">
                            {{ listing.description }}
                        </p>
                    </section>

                    <!-- Location -->
                    <section
                        class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 overflow-hidden">
                        <h2
                            class="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-6 flex items-center gap-3">
                            <Map class="w-6 h-6 text-blue-600" />
                            Location
                        </h2>
                        <div class="rounded-[2rem] overflow-hidden border border-slate-200 aspect-video">
                            <iframe :src="mapUrl" width="100%" height="100%" style="border:0;" allowfullscreen="true"
                                loading="lazy" />
                        </div>
                    </section>

                    <!-- Guest Reviews -->
                    <section class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
                        <div class="flex items-center justify-between mb-8">
                            <h2
                                class="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                                <MessageSquare class="w-6 h-6 text-blue-600" />
                                Guest Reviews
                            </h2>
                            <button
                                class="px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">Write
                                Review</button>
                        </div>
                        <div class="py-12 text-center">
                            <div class="inline-flex p-4 bg-slate-50 rounded-full mb-4 text-slate-300">
                                <Star class="w-8 h-8" />
                            </div>
                            <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">No feedback has been
                                shared yet</p>
                        </div>
                    </section>
                </div>

                <!-- Sidebar (Right) -->
                <aside class="space-y-8">
                    <div
                        class="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-8">
                        <h3
                            class="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b border-slate-100 pb-4">
                            Reservation</h3>

                        <div class="space-y-6">
                            <div v-if="listing.operating_hours" class="flex items-start gap-4">
                                <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <Clock class="w-5 h-5" />
                                </div>
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                                        Schedule</p>
                                    <p class="text-slate-700 font-bold">{{ listing.operating_hours }}</p>
                                </div>
                            </div>

                            <div v-if="listing.contact_info.phone" class="flex items-start gap-4">
                                <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                    <Phone class="w-5 h-5" />
                                </div>
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                                        Phone</p>
                                    <p class="text-slate-700 font-bold">{{ listing.contact_info.phone }}</p>
                                </div>
                            </div>

                            <div v-if="listing.contact_info.email" class="flex items-start gap-4">
                                <div class="p-2 bg-amber-50 rounded-lg text-amber-600">
                                    <Mail class="w-5 h-5" />
                                </div>
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                                        Email</p>
                                    <p class="text-slate-700 font-bold truncate max-w-[150px]">{{
                                        listing.contact_info.email }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-10 space-y-3">
                            <a v-if="listing.contact_info.website" :href="listing.contact_info.website" target="_blank"
                                class="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                                <Globe class="w-4 h-4" />
                                Official Website
                            </a>
                            <button
                                class="w-full py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
                                Send Inquiry
                            </button>
                        </div>

                        <div class="mt-8 pt-8 border-t border-slate-100">
                            <AdSlot identifier="AD_SIDEBAR_RECTANGLE" />
                        </div>
                    </div>
                </aside>
            </div>
        </div>

        <!-- Error State -->
        <div v-else class="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
            <div class="p-8 bg-white rounded-[3rem] shadow-xl text-center max-w-md">
                <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 class="w-10 h-10 text-slate-300" />
                </div>
                <h2 class="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Hotel Not Found</h2>
                <p class="text-slate-500 font-medium mb-8">The accommodation you're looking for might have been
                    relocated or removed from our directory.</p>
                <NuxtLink to="/hotels"
                    class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-colors">
                    Back to Directory
                </NuxtLink>
            </div>
        </div>
    </PublicLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
    MapPin, Star, Clock, Phone, Mail, Globe,
    Tag, Info, Map, MessageSquare, Building2
} from 'lucide-vue-next'
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
        _id: "1",
        slug: "the-oriental-legazpi",
        title: "The Oriental Legazpi",
        cover_image: "/Albay-Frontend/img/hotels/The-Oriental-Legazpi.jpeg",
        description: "The Oriental Legazpi is a well-known hotel in Albay offering premium accommodations and scenic views of Mayon Volcano.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1520,
        geo_lng: 123.7430,
        activity_tags: ["Hotel", "Luxury Stay"],
        contact_info: { phone: "+63 900 000 0100" },
        social_links: {},
        pricing_lowest: 4500,
        operating_hours: "24 Hours",
        rating: 4.6,
        is_premium: true,
        view_count: 300,
        created_at: new Date()
    },
    {
        _id: "2",
        slug: "the-marison-hotel",
        title: "The Marison Hotel",
        cover_image: "/Albay-Frontend/img/hotels/The-Marison-Hotel.jpg",
        description: "The Marison Hotel offers comfortable and modern accommodations in the heart of Legazpi City.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1435,
        geo_lng: 123.7421,
        activity_tags: ["Hotel", "Business Stay"],
        contact_info: { phone: "+63 900 000 0101" },
        social_links: {},
        pricing_lowest: 3800,
        operating_hours: "24 Hours",
        rating: 4.5,
        is_premium: true,
        view_count: 290,
        created_at: new Date()
    },
    {
        _id: "3",
        slug: "hotel-st-ellis",
        title: "Hotel St. Ellis",
        cover_image: "/Albay-Frontend/img/hotels/Hotel-Ellis.jpg",
        description: "Hotel St. Ellis is a popular mid-range hotel located near key attractions in Legazpi City.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1460,
        geo_lng: 123.7395,
        activity_tags: ["Hotel", "City Stay"],
        contact_info: { phone: "+63 900 000 0102" },
        social_links: {},
        pricing_lowest: 3500,
        operating_hours: "24 Hours",
        rating: 4.3,
        is_premium: false,
        view_count: 280,
        created_at: new Date()
    },
    {
        _id: "4",
        slug: "lotus-blu-hotel-legazpi",
        title: "Lotus Blu Hotel Legazpi",
        cover_image: "/Albay-Frontend/img/hotels/Lotus-Blu-Hotel-Legazpi.webp",
        description: "Lotus Blu Hotel Legazpi is a boutique hotel offering stylish rooms and convenient access to malls and restaurants.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1412,
        geo_lng: 123.7380,
        activity_tags: ["Hotel", "Boutique Stay"],
        contact_info: { phone: "+63 900 000 0103" },
        social_links: {},
        pricing_lowest: 3200,
        operating_hours: "24 Hours",
        rating: 4.4,
        is_premium: false,
        view_count: 270,
        created_at: new Date()
    },
    {
        _id: "6",
        slug: "the-pepperland-hotel",
        title: "The Pepperland Hotel",
        cover_image: "/Albay-Frontend/img/hotels/The-Pepperland-Hotel.webp",
        description: "The Pepperland Hotel offers comfortable accommodations ideal for business and leisure travelers.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1555,
        geo_lng: 123.7450,
        activity_tags: ["Hotel", "Business Stay"],
        contact_info: { phone: "+63 900 000 0104" },
        social_links: {},
        pricing_lowest: 3000,
        operating_hours: "24 Hours",
        rating: 4.1,
        is_premium: false,
        view_count: 250,
        created_at: new Date()
    },
    {
        _id: "7",
        slug: "la-piazza-hotel-and-convention-center",
        title: "La Piazza Hotel and Convention Center",
        cover_image: "/Albay-Frontend/img/hotels/La-Piazza-Hotel-and-Convention-Center.jpg",
        description: "La Piazza Hotel and Convention Center is a great choice for events and comfortable stays in Legazpi.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1602,
        geo_lng: 123.7503,
        activity_tags: ["Hotel", "Convention Center"],
        contact_info: { phone: "+63 900 000 0105" },
        social_links: {},
        pricing_lowest: 3400,
        operating_hours: "24 Hours",
        rating: 4.0,
        is_premium: false,
        view_count: 240,
        created_at: new Date()
    },
    {
        _id: "8",
        slug: "ogma-suites-legazpi",
        title: "OGMA Suites Legazpi",
        cover_image: "/Albay-Frontend/img/hotels/OGMA-Suites-Legazpi.jpg",
        description: "OGMA Suites Legazpi offers modern suite-style accommodations for longer stays.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1487,
        geo_lng: 123.7444,
        activity_tags: ["Hotel", "Suite Stay"],
        contact_info: { phone: "+63 900 000 0106" },
        social_links: {},
        pricing_lowest: 3600,
        operating_hours: "24 Hours",
        rating: 4.4,
        is_premium: false,
        view_count: 230,
        created_at: new Date()
    },
    {
        _id: "9",
        slug: "hotel-lucca",
        title: "Hotel Lucca",
        cover_image: "/Albay-Frontend/img/hotels/Hotel-Lucca.jpg",
        description: "Hotel Lucca is a budget-friendly hotel located near key attractions in Legazpi City.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1422,
        geo_lng: 123.7368,
        activity_tags: ["Hotel", "Budget Stay"],
        contact_info: { phone: "+63 900 000 0107" },
        social_links: {},
        pricing_lowest: 2500,
        operating_hours: "24 Hours",
        rating: 4.1,
        is_premium: false,
        view_count: 220,
        created_at: new Date()
    },
    {
        _id: "10",
        slug: "proxy-by-the-oriental-albay",
        title: "Proxy by The Oriental Albay",
        cover_image: "/Albay-Frontend/img/hotels/Proxy-by-The-Oriental-Albay.webp",
        description: "Proxy by The Oriental Albay offers modern accommodations with easy access to Legazpi City attractions.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1510,
        geo_lng: 123.7420,
        activity_tags: ["Hotel", "Modern Stay"],
        contact_info: { phone: "+63 900 000 0108" },
        social_links: {},
        pricing_lowest: 3300,
        operating_hours: "24 Hours",
        rating: 4.3,
        is_premium: false,
        view_count: 210,
        created_at: new Date()
    },
    {
        _id: "5",
        slug: "hotel-sentro-legazpi",
        title: "Hotel Sentro Legazpi",
        cover_image: "/Albay-Frontend/img/hotels/Hotel-Sentro-Legazpi.jpg",
        description: "Hotel Sentro Legazpi provides affordable and cozy accommodations for travelers visiting Albay.",
        category: ["hotels"],
        municipality: "Legazpi City",
        geo_lat: 13.1398,
        geo_lng: 123.7375,
        activity_tags: ["Hotel", "Budget Stay"],
        contact_info: { phone: "+63 900 000 0109" },
        social_links: {},
        pricing_lowest: 2800,
        operating_hours: "24 Hours",
        rating: 4.2,
        is_premium: false,
        view_count: 260,
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
