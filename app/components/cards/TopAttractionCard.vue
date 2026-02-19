<template>
    <NuxtLink :to="`/${listing.category?.[0] || 'tourist-spots'}/${listing.slug}`"
        class="relative block w-full h-[420px] md:h-[520px] overflow-hidden group">
        <!-- Background Image -->
        <img :src="listing.cover_image || '/Albay-Frontend/img/hero.jpg'" :alt="listing.title"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <!-- Content -->
        <div class="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div class="max-w-5xl mx-auto flex flex-col items-start gap-4">

                <!-- Badge -->
                <span
                    class="bg-blue-600 text-white text-[9px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full font-semibold shadow-md">
                    Top Attraction
                </span>

                <!-- Title & Location -->
                <div class="space-y-2">
                    <h2 class="text-3xl md:text-5xl font-semibold text-white leading-tight">
                        {{ listing.title }}
                    </h2>

                    <div class="flex items-center gap-2 text-white/75 text-base font-medium">
                        <MapPin class="w-4 h-4 text-blue-400" />
                        <span>{{ listing.municipality }}, Albay</span>
                    </div>
                </div>

                <!-- Description -->
                <p class="text-white/70 max-w-xl text-base line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {{ listing.description ||
                    "Experience the breathtaking beauty and unique cultural heritage of one of Albay's premier tourist destinations." }}
                </p>

                <!-- CTA -->
                <div class="pt-3">
                    <div
                        class="flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors shadow-lg">
                        Explore Destination
                        <ArrowUpRight class="w-4 h-4" />
                    </div>
                </div>

            </div>
        </div>
    </NuxtLink>
</template>


<script setup>
import { MapPin, ArrowUpRight } from 'lucide-vue-next'

defineProps({
    listing: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@media (min-width: 768px) {
    .line-clamp-3 {
        line-clamp: 3;
    }
}
</style>