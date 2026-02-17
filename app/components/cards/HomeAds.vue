<template>
    <NuxtLink :to="`/${primaryCategory}/${listing.slug}`"
        class="group relative block bg-white rounded-3xl overflow-hidden ring-1 ring-slate-100 hover:ring-slate-200 transition-all duration-500 hover:-translate-y-1 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)]">
        <!-- Image Container -->
        <div class="relative aspect-[4/5] overflow-hidden">
            <img :src="listing.cover_image || '/img/hero.jpg'" :alt="listing.title"
                class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                loading="lazy" />

            <!-- Premium Overlays -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            <!-- Top Badges -->
            <div class="absolute top-5 inset-x-5 flex justify-between items-start pointer-events-none">
                <span v-if="listing.is_sponsored !== false"
                    class="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full font-bold shadow-sm">
                    Featured
                </span>

                <div v-if="listing.rating"
                    class="bg-white/95 backdrop-blur text-slate-900 text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 font-bold shadow-xl">
                    <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {{ listing.rating.toFixed(1) }}
                </div>
            </div>

            <!-- Bottom Content Overlay -->
            <div
                class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div class="space-y-3">
                    <!-- Meta Info -->
                    <div class="flex items-center gap-2 text-white/80 text-xs font-medium uppercase tracking-wider">
                        <MapPin class="w-3.5 h-3.5 text-blue-400" />
                        <span>{{ listing.municipality }}</span>
                    </div>

                    <!-- Title -->
                    <h3 class="text-xl font-bold text-white leading-tight line-clamp-2">
                        {{ listing.title }}
                    </h3>

                    <!-- Pricing & Action -->
                    <div
                        class="pt-2 flex items-center justify-between border-t border-white/10 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <div v-if="listing.pricing_lowest" class="text-white">
                            <span class="text-[10px] text-white/60 block uppercase font-bold tracking-tighter">Starting
                                from</span>
                            <span class="text-lg font-bold">₱{{ listing.pricing_lowest.toLocaleString() }}</span>
                        </div>
                        <div class="bg-white text-slate-900 p-2 rounded-full">
                            <ArrowUpRight class="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'
import { Star, MapPin, ArrowUpRight } from 'lucide-vue-next'

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