<template>
    <NuxtLink :to="`/${primaryCategory}/${listing.slug}`" :class="[
        'animate-on-scroll group relative block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 opacity-0',
        animationClass
    ]">
        <!-- Image -->
        <div class="relative h-64 overflow-hidden">
            <img :src="listing.cover_image || '/img/hero.jpg'" :alt="listing.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />

            <div v-if="listing.gradient"
                class="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            <!-- Sponsored Badge -->
            <div
                class="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                Sponsored
            </div>

            <!-- Rating Badge -->
            <div v-if="listing.rating"
                class="absolute top-4 right-4 bg-white/90 backdrop-blur text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Star class="w-3 h-3 fill-blue-600" />
                {{ listing.rating.toFixed(1) }}
            </div>

            <!-- Content -->
            <div class="absolute bottom-0 left-0 right-0 p-5 text-white space-y-2">
                <h3 class="text-lg font-semibold leading-tight line-clamp-2">
                    {{ listing.title }}
                </h3>

                <div class="flex items-center gap-2 text-sm opacity-90">
                    <MapPin class="w-4 h-4" />
                    <span>{{ listing.municipality }}</span>
                </div>

                <div v-if="listing.pricing_lowest" class="text-sm font-medium">
                    Starts at ₱{{ listing.pricing_lowest.toLocaleString() }}
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Star, MapPin } from 'lucide-vue-next'

const props = defineProps({
    listing: { type: Object, required: true },
    index: { type: Number, required: true }
})

const primaryCategory = computed(() => {
    if (!props.listing.category?.length) return 'tourist-spots'
    return props.listing.category[0]
})

/* Determine direction */
const animationClass = computed(() =>
    props.index % 2 === 0 ? 'from-left' : 'from-right'
)

onMounted(() => {
    const elements = document.querySelectorAll('.animate-on-scroll')

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in')
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.1 }
    )

    elements.forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Initial States */
.from-right {
    transform: translateX(60px);
}

.from-left {
    transform: translateX(-60px);
}

/* Animate In */
.animate-in {
    animation: slideIn 1.3s ease-out forwards;
}

@keyframes slideIn {
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
