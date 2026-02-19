<!-- pages/tourist-spots/[slug].vue -->
<template>
    <div v-if="listing" class="bg-gray-50 min-h-screen pb-20">
        <!-- Navigation Overlay -->
        <div class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 lg:hidden">
            <div class="px-4 py-3 flex items-center justify-between">
                <NuxtLink to="/tourist-spots" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft class="w-5 h-5 text-slate-700" />
                </NuxtLink>
                <h2 class="text-sm font-bold text-slate-900 truncate max-w-[200px]">{{ listing.title }}</h2>
                <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Share2 class="w-5 h-5 text-slate-700" />
                </button>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-12">
            <!-- Breadcrumbs -->
            <nav class="hidden lg:flex items-center gap-2 text-sm text-slate-400 mb-8">
                <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Home</NuxtLink>
                <ChevronRight class="w-4 h-4" />
                <NuxtLink to="/tourist-spots" class="hover:text-blue-600 transition-colors">Tourist Spots</NuxtLink>
                <ChevronRight class="w-4 h-4" />
                <span class="text-slate-900 font-medium">{{ listing.title }}</span>
            </nav>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <!-- Left Column: Media & Core Info -->
                <div class="lg:col-span-8">
                    <!-- Hero Image Gallery Style -->
                    <section
                        class="relative rounded-[2.5rem] overflow-hidden bg-slate-200 aspect-[16/10] md:aspect-[16/7] shadow-2xl shadow-blue-900/10 mb-10">
                        <img :src="listing.cover_image" :alt="listing.title"
                            class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                            <div class="p-8 md:p-12 w-full">
                                <div class="flex flex-wrap items-center gap-3 mb-4">
                                    <span
                                        class="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                                        {{ listing.category[0] || 'Destination' }}
                                    </span>
                                    <span v-if="listing.is_premium"
                                        class="px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-bold uppercase tracking-wider">
                                        Featured
                                    </span>
                                </div>
                                <h1 class="text-3xl md:text-5xl font-black text-white leading-tight">
                                    {{ listing.title }}
                                </h1>
                            </div>
                        </div>
                    </section>

                    <!-- Quick Stats Row -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div class="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                                <MapPin class="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Location</p>
                                <p class="text-sm font-bold text-slate-900">{{ listing.municipality }}</p>
                            </div>
                        </div>
                        <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div class="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                                <Star class="w-5 h-5 text-amber-500 fill-amber-500" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Rating</p>
                                <p class="text-sm font-bold text-slate-900">{{ listing.rating?.toFixed(1) || 'N/A' }}
                                </p>
                            </div>
                        </div>
                        <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div class="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                <Wallet class="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Entrance</p>
                                <p class="text-sm font-bold text-slate-900">{{ listing.pricing_lowest ?
                                    `₱${listing.pricing_lowest}` : 'Free' }}</p>
                            </div>
                        </div>
                        <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div class="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center">
                                <Clock class="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Hours</p>
                                <p class="text-sm font-bold text-slate-900 truncate">{{ listing.operating_hours ||
                                    'Flexible' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Description Section -->
                    <article class="prose prose-slate max-w-none mb-12">
                        <div class="flex items-center gap-4 mb-6">
                            <h2 class="text-2xl font-extrabold text-slate-900">Experience {{ listing.title }}</h2>
                            <div class="h-px flex-1 bg-slate-100"></div>
                        </div>
                        <p
                            class="text-lg text-slate-600 leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left">
                            {{ listing.description }}
                        </p>
                    </article>

                    <!-- Activities -->
                    <section v-if="listing.activity_tags.length" class="mb-12">
                        <h3 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Compass class="w-5 h-5 text-blue-600" />
                            What to expect
                        </h3>
                        <div class="flex flex-wrap gap-3">
                            <NuxtLink v-for="tag in listing.activity_tags" :key="tag"
                                :to="`/tourist-spots?tag=${encodeURIComponent(tag)}`"
                                class="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-semibold hover:border-blue-600 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-900/5 transition-all">
                                {{ tag }}
                            </NuxtLink>
                        </div>
                    </section>

                    <!-- Map -->
                    <section class="mb-12">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-bold text-slate-900">Location Details</h3>
                            <a :href="`https://www.google.com/maps/dir/?api=1&destination=${listing.geo_lat},${listing.geo_lng}`"
                                target="_blank" class="text-sm font-bold text-blue-600 hover:underline">
                                Get Directions
                            </a>
                        </div>
                        <div class="rounded-[2rem] overflow-hidden shadow-inner bg-slate-100 ring-8 ring-white">
                            <iframe :src="mapUrl" width="100%" height="400" style="border:0;" allowfullscreen="true"
                                loading="lazy" class="grayscale-[0.2] contrast-[1.1]" />
                        </div>
                    </section>
                </div>

                <!-- Right Column: Sidebar -->
                <div class="lg:col-span-4 space-y-8">
                    <aside class="sticky top-24">
                        <div class="bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-8">
                            <h3 class="text-xl font-bold text-slate-900 mb-6">Contact & Inquiries</h3>

                            <div class="space-y-6">
                                <div v-if="listing.contact_info.phone" class="flex items-start gap-4">
                                    <div
                                        class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                        <Phone class="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p class="text-xs font-bold text-slate-400 uppercase">Phone</p>
                                        <p class="text-sm font-semibold text-slate-900">{{ listing.contact_info.phone }}
                                        </p>
                                    </div>
                                </div>

                                <div v-if="listing.contact_info.email" class="flex items-start gap-4">
                                    <div
                                        class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                        <Mail class="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p class="text-xs font-bold text-slate-400 uppercase">Email</p>
                                        <p class="text-sm font-semibold text-slate-900">{{ listing.contact_info.email }}
                                        </p>
                                    </div>
                                </div>

                                <div class="pt-6 border-t border-slate-50 space-y-4">
                                    <button
                                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
                                        Message Now
                                    </button>
                                    <button
                                        class="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold py-4 rounded-2xl transition-all">
                                        Visit Website
                                    </button>
                                </div>
                            </div>

                            <!-- Social Links -->
                            <div class="flex items-center justify-center gap-4 mt-8">
                                <a v-if="listing.social_links.facebook" :href="listing.social_links.facebook"
                                    class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                    <Facebook class="w-5 h-5" />
                                </a>
                                <a v-if="listing.social_links.instagram" :href="listing.social_links.instagram"
                                    class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-all">
                                    <Instagram class="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div class="mt-8 rounded-3xl overflow-hidden shadow-sm">
                            <AdSlot identifier="AD_DETAIL_SIDEBAR" />
                        </div>
                    </aside>
                </div>
            </div>

            <!-- Reviews Section -->
            <section class="mt-20">
                <div class="flex items-center gap-4 mb-10">
                    <h2 class="text-2xl font-extrabold text-slate-900">Guest Experiences</h2>
                    <div class="h-px flex-1 bg-slate-100"></div>
                </div>

                <div class="bg-white rounded-[2.5rem] p-12 text-center border border-slate-100 shadow-sm">
                    <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquare class="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 class="text-xl font-bold text-slate-900 mb-2">Be the first to share!</h4>
                    <p class="text-slate-500 max-w-sm mx-auto mb-8">
                        Have you visited {{ listing.title }} recently? Your insights help fellow travelers plan their
                        next adventure.
                    </p>
                    <button
                        class="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
                        Write a Review
                    </button>
                </div>
            </section>
        </div>
    </div>

    <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center px-6">
            <div class="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPinOff class="w-10 h-10 text-slate-400" />
            </div>
            <h2 class="text-2xl font-bold text-slate-900">Destination Not Found</h2>
            <p class="text-slate-500 mt-2 mb-8">The spot you're looking for might have been moved or removed.</p>
            <NuxtLink to="/tourist-spots"
                class="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 inline-block">
                Back to Directory
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
    MapPin, Star, Clock, Wallet, Compass, Phone, Mail,
    ArrowLeft, Share2, ChevronRight, MessageSquare,
    Facebook, Instagram, MapPinOff
} from 'lucide-vue-next'
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
    fullURLMap?: string
    created_at: Date
}

const route = useRoute()

let mockListings: Listing[] = [
    {
        _id: '1',
        slug: '7-eleven-salugan',
        title: '7-Eleven Salugan',
        cover_image: '/img/tendingSpots/7-11.jpg',
        description: "The viral Mayon-view convenience store in Camalig has become one of the most photographed roadside stops in Albay. Positioned perfectly along the highway, it offers a clear and dramatic backdrop of Mayon Volcano, making it a favorite among travelers, cyclists, and motorists who want a quick yet stunning photo opportunity. Its resemblance to Japan’s famous Fuji-Lawson viewpoint earned it the nickname as the Pinoy version of that iconic spot.\n\nBeyond being a social media favorite, the location serves as a practical rest stop where visitors can grab snacks, drinks, and essentials while enjoying the scenery. Sunrise and late afternoon are the best times to visit, when the lighting enhances Mayon’s near-perfect cone and creates a postcard-worthy view right from the parking area.",
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
        fullURLMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7769.234374229917!2d123.66478376894199!3d13.186519883239725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a107007e0ba581%3A0x38e9eab95f070a00!2s7-Eleven%20Camalig%20Bypass%20Road!5e0!3m2!1sen!2sph!4v1771415354507!5m2!1sen!2sph",
        created_at: new Date()
    },
    {
        _id: '2',
        slug: 'farm-plate-daraga',
        title: 'Farm Plate',
        cover_image: '/img/tendingSpots/farmplate.jpg',
        description: "Farm Plate in Daraga is a charming farm-themed destination known for its wide open spaces and uninterrupted views of Mayon Volcano. The property features landscaped gardens, vegetable plots, and a striking red chapel that has become a popular backdrop for photos, prenups, and casual visits. Its elevated terrain allows guests to appreciate Mayon’s symmetry from multiple vantage points.\n\nVisitors can enjoy simple farm-to-table meals, relax in picnic areas, or explore the grounds at a leisurely pace. The peaceful rural setting, combined with cool breezes and scenic views, makes it ideal for families, couples, and anyone seeking a calm escape just minutes away from the town center."
        , category: ['instagrammable'],
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
        fullURLMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13069.113180053233!2d123.71654746784459!3d13.132689049586151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a1038dae15e683%3A0x6ebd17db48752220!2sFarm%20Plate!5e0!3m2!1sen!2sph!4v1771415463326!5m2!1sen!2sph",
        created_at: new Date()
    },
    {
        _id: '3',
        slug: 'sumlang-lake',
        title: 'Sumlang Lake',
        cover_image: '/img/tendingSpots/sumlanglake.jpg',
        description: "Sumlang Lake in Camalig is well known for its calm waters that mirror the majestic shape of Mayon Volcano. The lake’s bamboo rafts allow visitors to paddle gently across the surface while enjoying an unobstructed view of the volcano, especially during clear mornings when the reflection appears almost symmetrical.\n\nAside from rafting, the area offers landscaped gardens, view decks, and open-air dining spaces where guests can relax and take photos. The combination of still water, greenery, and Mayon’s dramatic presence makes Sumlang Lake one of the most photogenic and tranquil destinations in Albay."
        , category: ['instagrammable', 'nature'],
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
        fullURLMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.737478417836!2d123.66903787484517!3d13.178945287155814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a106f25e94cef9%3A0x2333d228fb8e39c6!2sSumlang%20Lake!5e0!3m2!1sen!2sph!4v1771415564717!5m2!1sen!2sph",
        created_at: new Date()
    },
    {
        _id: '4',
        slug: 'national-museum-bicol',
        title: 'National Museum of the Philippines - Bicol',
        cover_image: '/img/tendingSpots/museum.jpg',
        description: "The National Museum of the Philippines – Bicol, located in Daraga, is housed in a beautifully restored historic building that stands as an architectural landmark in the region. The museum showcases exhibits on Bicol’s natural history, geology, archaeology, and cultural heritage, offering visitors a deeper understanding of the area’s identity and volcanic landscape.\n\nInside, curated galleries present artifacts, historical narratives, and scientific displays that explain the formation of Mayon Volcano and the resilience of local communities. The blend of heritage architecture and educational exhibits makes it a meaningful stop for travelers interested in history, culture, and regional development."
        , category: ['heritage'],
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
        fullURLMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.942929466518!2d123.69857407484496!3d13.165998387167582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a1071ab94f1d89%3A0x8755d7d5a5442286!2sNational%20Museum%20of%20the%20Philippines%20-%20Bicol%20Regional%20Museum!5e0!3m2!1sen!2sph!4v1771415661810!5m2!1sen!2sph",
        created_at: new Date()
    },
    {
        _id: '5',
        slug: 'mayon-black-lava-atv-trails',
        title: 'Mayon Black Lava ATV Trails',
        cover_image: '/img/tendingSpots/blacklava.jpg',
        description: "Mayon Black Lava ATV Trails in Legazpi City offers an adrenaline-driven experience across the rugged terrain shaped by Mayon Volcano’s past eruptions. Riders navigate through fields of hardened black lava rocks, ash trails, and off-road paths while heading closer to the volcano’s base.\n\nThe guided tours vary in difficulty, making the activity accessible for beginners and experienced riders alike. Along the route, scenic stops provide panoramic views of Mayon and the surrounding landscape, combining adventure with dramatic natural scenery."
        , category: ['adventure'],
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
        fullURLMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.163166955583!2d123.71042032300848!3d13.202828463545979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a101df0fe74701%3A0xa24ecd4b3ab772d0!2sBlack%20Lava%20Trail%20%26%20Helipad!5e1!3m2!1sen!2sph!4v1771415714517!5m2!1sen!2sph",
        created_at: new Date()
    },
    {
        _id: '6',
        slug: 'cagsawa-ruins',
        title: 'Cagsawa Ruins',
        cover_image: '/img/tendingSpots/cagsawaruins.jpg',
        description: "Cagsawa Ruins in Daraga is one of the most iconic historical landmarks in Albay. The remaining bell tower of the 16th-century Franciscan church stands as a reminder of the devastating 1814 eruption of Mayon Volcano, which buried the original town of Cagsawa under volcanic debris.\n\nToday, the site functions as both a heritage park and a major viewpoint for Mayon Volcano. Visitors can walk around landscaped grounds, explore small museums and souvenir shops, and capture classic photographs of the belfry framed by Mayon’s near-perfect cone."
        , category: ['heritage'],
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
        fullURLMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.944420742636!2d123.6990461436316!3d13.165904365765169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a106b15e773841%3A0xf545870b1b897dd9!2sCagsawa%20Ruins!5e0!3m2!1sen!2sph!4v1771415756733!5m2!1sen!2sph",
        created_at: new Date()
    },
    {
        _id: '7',
        slug: 'quitinday-green-hills',
        title: 'Quitinday Green Hills',
        cover_image: '/img/tendingSpots/albayhills.jpg',
        description: "Quitinday Green Hills in Camalig features rolling grassy mounds that resemble miniature versions of the famous Chocolate Hills. The gentle slopes create a layered landscape that becomes especially vibrant during the rainy season when the grass turns lush and bright green.\n\nFrom the top of the hills, visitors are rewarded with sweeping views of Albay’s countryside and a clear perspective of Mayon Volcano. The relatively short trek makes it accessible for casual hikers, while the panoramic scenery makes it a popular sunrise and sunset spot."
        , category: ['nature'],
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
        fullURLMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31079.620811889254!2d123.6690167462082!3d13.165388577664253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a106890044924b%3A0xff14c7ade7a544a1!2sQuituinan%20Hill!5e0!3m2!1sen!2sph!4v1771415887649!5m2!1sen!2sph",
        created_at: new Date()
    },
    {
        _id: '8',
        slug: 'vera-falls',
        title: 'Vera Falls',
        cover_image: '/img/tendingSpots/verafalls.jpg',
        description: "Vera Falls in Malinao is a serene waterfall hidden at the foot of Mount Malinao, surrounded by dense greenery and cool mountain air. The cascading waters flow into a natural pool, offering visitors a refreshing place to swim and relax away from the busy urban areas.\n\nReaching the falls involves a short trek through forested paths, adding a sense of adventure to the visit. Its tranquil atmosphere and natural setting make Vera Falls an ideal destination for nature lovers seeking a quiet and scenic retreat."
        , category: ['nature'],
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
        fullURLMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59037.34988369644!2d123.61657778533477!3d13.356000299502167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a1af6316527a5b%3A0xd61831a98ffe150!2sVera%20Falls!5e1!3m2!1sen!2sph!4v1771415934487!5m2!1sen!2sph",
        created_at: new Date()
    },
    {
        _id: '4',
        slug: 'mayon-skyline-view-deck',
        title: 'Mayon Skyline View Deck',
        cover_image: '/img/topAttraction/mayonskyline.jpg',
        description: "Mayon Skyline View Deck in Tabaco City offers one of the closest and most breathtaking vantage points of the iconic Mayon Volcano. Perched high on the slopes, the site provides panoramic views of Albay’s coastline, nearby towns, and the lush green landscape surrounding the volcano. On clear days, visitors can witness Mayon’s near-perfect cone rising dramatically against the sky.\n\nThe cool mountain air and elevated perspective make it a favorite spot for sightseeing and photography. Sunrise and sunset visits are especially rewarding, as the changing light enhances the volcano’s contours and creates stunning photo opportunities. Mayon Skyline is a must-visit destination for travelers seeking a scenic and refreshing escape in Albay.",
        category: ['instagrammable', 'nature'],
        municipality: 'Tabaco City',
        geo_lat: 0,
        geo_lng: 0,
        activity_tags: [
            'Sightseeing',
            'Photography',
            'Nature Trip'
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
        fullURLMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.938595472449!2d123.73433677484613!3d13.244936986999533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a1046e68e3d3b1%3A0x8c8d6bde0d5b5a1b!2sMayon%20Skyline%20View%20Deck!5e0!3m2!1sen!2sph!4v1771415569999!5m2!1sen!2sph",
        created_at: new Date()
    },

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
    if (listing.value.fullURLMap) return listing.value.fullURLMap
    return `https://www.google.com/maps?q=${listing.value.geo_lat},${listing.value.geo_lng}&z=12&output=embed`

})
</script>
