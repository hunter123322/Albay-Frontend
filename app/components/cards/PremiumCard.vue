<!-- components/cards/PremiumCard.vue -->
<template>
    <NuxtLink :to="`/${primaryCategory}/${listing.slug}`"
        class="group relative block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
        <!-- Image -->
        <div class="relative h-64 overflow-hidden">
            <img :src="listing.cover_image || '/img/hero.jpg'" :alt="listing.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />


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

            <!-- Content Overlay -->
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

<script setup>
import { computed } from 'vue'
import { Star, MapPin } from 'lucide-vue-next'

const props = defineProps({
    listing: {
        type: Object,
        required: true
    }
})

const primaryCategory = computed(() => {
    if (!props.listing.category?.length) return 'tourist-spots'
    return props.listing.category[0]
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
