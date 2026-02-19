<!-- pages/restaurants/[slug].vue -->
<template>
    <div v-if="listing" class="bg-slate-50 min-h-screen">
        <!-- ================= PREMIUM HERO HEADER ================= -->
        <section class="relative h-[450px] md:h-[550px] lg:h-[650px] w-full overflow-hidden">
            <img :src="listing.cover_image" :alt="listing.title"
                class="absolute inset-0 w-full h-full object-cover scale-105" />
            <!-- Sophisticated Overlay Layering -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-slate-900" />
            <div
                class="absolute inset-0 bg-black/40 backdrop-blur-[1px] md:backdrop-blur-[2px] transition-all duration-700 md:hover:backdrop-blur-none" />

            <div
                class="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 md:pb-16">
                <div class="max-w-4xl space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">

                    <div class="flex flex-wrap items-center gap-2 md:gap-3">
                        <span v-if="listing.is_premium"
                            class="flex items-center gap-1.5 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-blue-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/30">
                            <Award class="w-3 md:w-3.5 h-3 md:h-3.5" />
                            Featured Partner
                        </span>
                        <div v-for="tag in listing.activity_tags" :key="tag"
                            class="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-white/20">
                            {{ tag }}
                        </div>
                    </div>

                    <h1
                        class="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight md:leading-none">
                        {{ listing.title }}
                    </h1>

                    <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-white/90">
                        <div class="flex items-center gap-2 font-medium text-sm md:text-base">
                            <MapPin class="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                            {{ listing.municipality }}, Albay
                        </div>
                        <div v-if="listing.rating" class="flex items-center gap-2 font-medium text-sm md:text-base">
                            <div
                                class="flex items-center px-2 py-0.5 bg-yellow-400 text-slate-900 rounded font-black text-xs md:text-sm">
                                <Star class="w-3 md:w-3.5 h-3 md:h-3.5 fill-current mr-1" />
                                {{ listing.rating.toFixed(1) }}
                            </div>
                            <span
                                class="text-[10px] md:text-sm text-white/60 font-bold uppercase tracking-tighter whitespace-nowrap">Verified
                                Reviews</span>
                        </div>
                        <div v-if="listing.pricing_lowest"
                            class="flex items-center gap-2 font-medium text-sm md:text-base">
                            <span class="text-blue-400 font-black">₱</span>
                            <span>Avg. ₱{{ listing.pricing_lowest.toLocaleString() }} / head</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= DYNAMIC CONTENT LAYOUT ================= -->
        <main class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-8 md:-mt-10 lg:-mt-12 relative z-10 pb-24">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

                <!-- MAIN COLUMN (Left) -->
                <div class="order-2 lg:order-1 lg:col-span-8 space-y-8 md:space-y-10">

                    <!-- About Section -->
                    <section
                        class="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100">
                        <div class="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                            <div class="p-2 md:p-3 bg-blue-50 rounded-xl md:rounded-2xl">
                                <Info class="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                            </div>
                            <h2 class="text-xl md:text-2xl font-black text-slate-900 tracking-tight">The Culinary
                                Experience</h2>
                        </div>
                        <p
                            class="text-slate-600 text-base md:text-lg leading-relaxed md:first-letter:text-5xl md:first-letter:font-black md:first-letter:text-blue-600 md:first-letter:mr-3 md:first-letter:float-left">
                            {{ listing.description }}
                        </p>
                    </section>

                    <!-- Gallery Grid -->
                    <section class="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-96">
                        <div
                            class="bg-slate-200 rounded-3xl md:rounded-[2.5rem] overflow-hidden group min-h-[200px] md:min-h-full">
                            <div
                                class="w-full h-full bg-slate-300 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-700 font-bold italic tracking-tighter">
                                Interior Ambience</div>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4">
                            <div
                                class="bg-slate-200 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-slate-400 font-bold italic text-xs md:text-sm p-4 text-center">
                                Signature Dish</div>
                            <div
                                class="bg-slate-200 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-slate-400 font-bold italic text-xs md:text-sm p-4 text-center">
                                Menu Preview</div>
                        </div>
                    </section>

                    <!-- Location & Map -->
                    <section
                        class="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
                            <div class="flex items-center gap-3 md:gap-4">
                                <div class="p-2 md:p-3 bg-red-50 rounded-xl md:rounded-2xl">
                                    <Navigation class="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                                </div>
                                <h2 class="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Location</h2>
                            </div>
                            <button
                                class="text-[10px] md:text-xs font-black uppercase text-blue-600 hover:text-blue-800 tracking-widest text-left md:text-right">Get
                                Directions</button>
                        </div>
                        <div
                            class="rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-slate-50 shadow-inner">
                            <iframe :src="mapUrl" width="100%" height="300" md:height="450" style="border:0;"
                                loading="lazy" class="grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                    </section>

                    <!-- Reviews Section -->
                    <section
                        class="bg-slate-900 rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative">
                        <Quote
                            class="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-24 md:w-40 h-24 md:h-40 text-white/5 rotate-12" />
                        <h2 class="text-xl md:text-2xl font-black mb-6 md:mb-8">Patron Feedback</h2>
                        <div
                            class="flex flex-col items-center justify-center py-6 md:py-10 border-2 border-dashed border-white/10 rounded-2xl md:rounded-3xl">
                            <MessageSquare class="w-10 h-10 md:w-12 md:h-12 text-white/20 mb-4" />
                            <p class="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">No
                                Reviews Recorded Yet</p>
                            <button
                                class="mt-4 md:mt-6 px-6 md:px-8 py-2 md:py-3 bg-white text-slate-900 rounded-full font-black text-xs md:text-sm hover:scale-105 transition-transform">Write
                                a Review</button>
                        </div>
                    </section>

                    <AdSlot identifier="AD_DETAIL_INLINE" class="rounded-3xl md:rounded-[2.5rem]" />
                </div>

                <!-- SIDEBAR (Right) -->
                <aside class="order-1 lg:order-2 lg:col-span-4 space-y-6 md:space-y-8">

                    <!-- Essential Info Card -->
                    <div
                        class="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 lg:sticky lg:top-10">
                        <h3
                            class="text-lg md:text-xl font-black text-slate-900 mb-6 md:mb-8 flex items-center justify-between">
                            Quick Details
                            <div class="hidden md:block h-1 w-12 bg-blue-600 rounded-full"></div>
                        </h3>

                        <div class="space-y-6 md:space-y-8">
                            <!-- Operating Hours -->
                            <div v-if="listing.operating_hours" class="flex gap-4">
                                <div
                                    class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                    <Clock class="w-5 h-5 text-slate-400" />
                                </div>
                                <div>
                                    <p
                                        class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">
                                        Service Hours</p>
                                    <p class="text-sm md:text-base text-slate-900 font-bold">{{ listing.operating_hours
                                    }}</p>
                                    <span class="text-[9px] md:text-[10px] font-bold text-green-500 uppercase">Open
                                        Now</span>
                                </div>
                            </div>

                            <!-- Contact Info -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                                <div v-if="listing.contact_info.phone" class="flex gap-4 group cursor-pointer">
                                    <div
                                        class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-blue-600 transition-colors">
                                        <Phone class="w-5 h-5 text-slate-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p
                                            class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">
                                            Inquiries</p>
                                        <p class="text-sm md:text-base text-slate-900 font-bold">{{
                                            listing.contact_info.phone }}</p>
                                    </div>
                                </div>

                                <div v-if="listing.contact_info.website" class="flex gap-4 group cursor-pointer">
                                    <div
                                        class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-blue-600 transition-colors">
                                        <Globe class="w-5 h-5 text-slate-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p
                                            class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">
                                            Digital Presence</p>
                                        <a :href="listing.contact_info.website" target="_blank"
                                            class="text-sm md:text-base text-blue-600 font-bold hover:underline block truncate max-w-[150px] md:max-w-full">
                                            {{ listing.contact_info.website.replace('https://', '') }}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="pt-2 md:pt-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                                <button
                                    class="flex-1 py-3 md:py-4 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 md:hover:-translate-y-1 transition-all active:scale-95">
                                    RESERVE A TABLE
                                </button>
                                <button
                                    class="flex-1 py-3 md:py-4 bg-slate-900 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                    <Share2 class="w-4 h-4" />
                                    SHARE VENUE
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Social Feed -->
                    <div class="bg-blue-50 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-blue-100">
                        <h4 class="text-[10px] md:text-xs font-black text-blue-900 uppercase tracking-widest mb-4">
                            Connect Socially</h4>
                        <div class="flex gap-3 md:gap-4">
                            <div
                                class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-sm cursor-pointer md:hover:scale-110 transition-transform">
                                <Facebook class="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                            </div>
                            <div
                                class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-sm cursor-pointer md:hover:scale-110 transition-transform">
                                <Instagram class="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
                            </div>
                        </div>
                    </div>
                </aside>

            </div>
        </main>
    </div>

    <!-- Error State -->
    <div v-else class="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
        <div class="w-20 h-20 md:w-24 md:h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
            <SearchX class="w-10 h-10 md:w-12 md:h-12 text-slate-400" />
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-slate-900 mb-2">Listing Not Found</h1>
        <p class="text-sm md:text-base text-slate-500 mb-8 max-w-sm">The restaurant listing you are looking for has been
            removed or relocated.</p>
        <NuxtLink to="/restaurants"
            class="px-6 md:px-8 py-3 bg-blue-600 text-white font-black rounded-full text-xs md:text-sm shadow-lg shadow-blue-100">
            Return to Directory</NuxtLink>
    </div>
</template>



<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
    MapPin, Star, Clock, Phone, Mail, Globe,
    Award, Info, Navigation, Share2, Facebook,
    Instagram, Quote, MessageSquare, SearchX
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

const mockRestaurants: Listing[] = [
    {
        _id: '7',
        slug: 'kouzina-tyche-seafood-restaurant',
        title: 'Kouzina Tyche Seafood Restaurant',
        cover_image: '/Albay-Frontend/img/restaurants/kouzina-tyche-seafood.jpg',
        description: 'Kouzina Tyche Seafood Restaurant is a popular restaurant offering local and international cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Legazpi City',
        geo_lat: 13.200,
        geo_lng: 123.790,
        activity_tags: ['Dining', 'Seafood'],
        contact_info: {
            phone: '+63 900 000 0000'
        },
        social_links: {},
        pricing_lowest: 350,
        operating_hours: '10:00 AM - 10:00 PM',
        rating: 4.4,
        is_premium: true,
        view_count: 170,
        created_at: new Date()
    },
    {
        _id: '2',
        slug: 'bigg-diner-old-albay',
        title: "Bigg's Diner - Old Albay",
        cover_image: '/Albay-Frontend/img/restaurants/Bigg\'s-Diner.jpg',
        description: 'Bigg\'s Diner - Old Albay is a popular restaurant offering local and international cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Legazpi City',
        geo_lat: 13.150,
        geo_lng: 123.740,
        activity_tags: ['Dining', 'Local Cuisine'],
        contact_info: {
            phone: '+63 900 000 0001'
        },
        social_links: {},
        pricing_lowest: 250,
        operating_hours: '9:00 AM - 9:00 PM',
        rating: 4.4,
        is_premium: true,
        view_count: 195,
        created_at: new Date()
    },
    {
        _id: '3',
        slug: 'legazpi-four-seasons-restaurant',
        title: 'Legazpi Four Seasons Restaurant',
        cover_image: '/Albay-Frontend/img/restaurants/Legazpi-Four-Seasons-Restaurant.jpg',
        description: 'Legazpi Four Seasons Restaurant is a popular restaurant offering local and international cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Legazpi City',
        geo_lat: 13.160,
        geo_lng: 123.750,
        activity_tags: ['Dining', 'Local Cuisine'],
        contact_info: {
            phone: '+63 900 000 0002'
        },
        social_links: {},
        pricing_lowest: 280,
        operating_hours: '9:00 AM - 9:00 PM',
        rating: 4.3,
        is_premium: false,
        view_count: 190,
        created_at: new Date()
    },
    {
        _id: '4',
        slug: 'boklan-food-center',
        title: 'Boklan Food Center',
        cover_image: '/Albay-Frontend/img/restaurants/Boklan-Food.webp',
        description: 'Boklan Food Center is a popular restaurant offering local and international cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Daraga',
        geo_lat: 13.170,
        geo_lng: 123.760,
        activity_tags: ['Dining', 'Local Cuisine'],
        contact_info: {
            phone: '+63 900 000 0003'
        },
        social_links: {},
        pricing_lowest: 200,
        operating_hours: '9:00 AM - 9:00 PM',
        rating: 4.2,
        is_premium: false,
        view_count: 185,
        created_at: new Date()
    },
    {
        _id: '5',
        slug: 'small-talk-caf',
        title: 'Small Talk Café',
        cover_image: '/Albay-Frontend/img/restaurants/Small-Talk-Cafe.jpg',
        description: 'Small Talk Café is a popular restaurant offering local and international cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Legazpi City',
        geo_lat: 13.180,
        geo_lng: 123.770,
        activity_tags: ['Dining', 'Cafe'],
        contact_info: {
            phone: '+63 900 000 0004'
        },
        social_links: {},
        pricing_lowest: 220,
        operating_hours: '9:00 AM - 9:00 PM',
        rating: 4.5,
        is_premium: false,
        view_count: 180,
        created_at: new Date()
    },
    {
        _id: '6',
        slug: 'waways-restaurant',
        title: 'Waway\'s Restaurant',
        cover_image: '/Albay-Frontend/img/restaurants/Waway-Restaurant.jpg',
        description: 'Waway\'s Restaurant is a popular restaurant offering local and international cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Legazpi City',
        geo_lat: 13.190,
        geo_lng: 123.780,
        activity_tags: ['Dining', 'Local Cuisine'],
        contact_info: {
            phone: '+63 900 000 0005'
        },
        social_links: {},
        pricing_lowest: 260,
        operating_hours: '9:00 AM - 9:00 PM',
        rating: 4.3,
        is_premium: false,
        view_count: 175,
        created_at: new Date()
    },
    {
        _id: '8',
        slug: 'antonias-restaurant',
        title: 'Antonia\'s Restaurant',
        cover_image: '/Albay-Frontend/img/restaurants/Antonia-Restaurant.webp',
        description: 'Antonia\'s Restaurant is a popular restaurant offering local and international cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Daraga',
        geo_lat: 13.210,
        geo_lng: 123.800,
        activity_tags: ['Dining', 'Filipino Cuisine'],
        contact_info: {
            phone: '+63 900 000 0006'
        },
        social_links: {},
        pricing_lowest: 300,
        operating_hours: '9:00 AM - 9:00 PM',
        rating: 4.5,
        is_premium: false,
        view_count: 165,
        created_at: new Date()
    },
    {
        _id: '9',
        slug: 'balay-sa-bikol',
        title: 'Balay sa Bikol',
        cover_image: '/Albay-Frontend/img/restaurants/Balay-sa-Bikol.jpg',
        description: 'Balay sa Bikol is a popular restaurant offering authentic Bicolano cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Daraga',
        geo_lat: 13.220,
        geo_lng: 123.810,
        activity_tags: ['Dining', 'Bicolano Cuisine'],
        contact_info: {
            phone: '+63 900 000 0007'
        },
        social_links: {},
        pricing_lowest: 320,
        operating_hours: '9:00 AM - 9:00 PM',
        rating: 4.6,
        is_premium: false,
        view_count: 160,
        created_at: new Date()
    },
    {
        _id: '1',
        slug: '1st-colonial-grill',
        title: '1st Colonial Grill',
        cover_image: '/Albay-Frontend/img/restaurants/1st-Colonial-Grill.jpg',
        description: '1st Colonial Grill is a popular restaurant offering local and international cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Legazpi City',
        geo_lat: 13.140,
        geo_lng: 123.730,
        activity_tags: ['Dining', 'Local Cuisine'],
        contact_info: {
            phone: '+63 900 000 0008'
        },
        social_links: {},
        pricing_lowest: 300,
        operating_hours: '9:00 AM - 9:00 PM',
        rating: 4.6,
        is_premium: true,
        view_count: 200,
        created_at: new Date()
    },
    {
        _id: '10',
        slug: 'chachis-kitchen',
        title: 'Chachi\'s Kitchen',
        cover_image: '/Albay-Frontend/img/restaurants/Chachi-Kitchen.jpg',
        description: 'Chachi\'s Kitchen is a popular restaurant offering Indian cuisine in Albay.',
        category: ['restaurants'],
        municipality: 'Legazpi City',
        geo_lat: 13.230,
        geo_lng: 123.820,
        activity_tags: ['Dining', 'Indian Cuisine'],
        contact_info: {
            phone: '+63 900 000 0009'
        },
        social_links: {},
        pricing_lowest: 300,
        operating_hours: '11:00 AM - 9:00 PM',
        rating: 4.3,
        is_premium: false,
        view_count: 155,
        created_at: new Date()
    }
];


const listing = computed(() =>
    mockRestaurants.find(r => r.slug === route.params.slug)
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

<style scoped>
.text-shadow-sm {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slide-in-from-bottom-8 {
    from {
        transform: translateY(2rem);
    }

    to {
        transform: translateY(0);
    }
}

.animate-in {
    animation-fill-mode: both;
}

/* Fluid image scaling on hover */
@media (min-width: 768px) {
    .group:hover img {
        transform: scale(1.1);
    }
}
</style>