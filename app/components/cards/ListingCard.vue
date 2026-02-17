<!-- components/cards/ListingCard.vue -->
<template>
    <NuxtLink :to="`/${primaryCategory}/${listing.slug}`"
        class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
        <!-- Image -->
        <div class="relative h-52 overflow-hidden">
            <img :src="listing.cover_image || '/img/hero.jpg'" :alt="listing.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />

            <!-- Rating Badge -->
            <div v-if="listing.rating"
                class="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Star class="w-3 h-3 fill-white" />
                {{ listing.rating.toFixed(1) }}
            </div>

            <!-- Distance Badge -->
            <div v-if="listing.distance_km"
                class="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin class="w-3 h-3" />
                {{ listing.distance_km.toFixed(1) }} km
            </div>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-3">

            <!-- Title -->
            <h3 class="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition line-clamp-1">
                {{ listing.title }}
            </h3>

            <!-- Municipality -->
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <MapPin class="w-4 h-4" />
                <span>{{ listing.municipality }}</span>
            </div>

            <!-- Activity Tags -->
            <div v-if="listing.activity_tags?.length" class="flex flex-wrap gap-2">
                <span v-for="tag in listing.activity_tags.slice(0, 3)" :key="tag"
                    class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    {{ tag }}
                </span>
            </div>

            <!-- Price -->
            <div v-if="listing.pricing_lowest" class="text-sm font-medium text-blue-700">
                Starts at ₱{{ listing.pricing_lowest.toLocaleString() }}
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
.line-clamp-1 {
    display: -webkit-box;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
