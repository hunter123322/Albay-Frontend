<template>
    <NuxtLink ref="cardRef" :to="`/tourist-spots/${listing.slug}`"
        class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 ring-1 ring-slate-100 opacity-0">

        <!-- Image -->
        <div class="relative h-48 overflow-hidden">
            <img :src="listing.cover_image || '/img/hero.jpg'" :alt="listing.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />

            <!-- Rating Badge -->
            <div v-if="listing.rating"
                class="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur text-slate-900 text-[10px] px-2 py-1 rounded-lg flex items-center gap-1 font-bold shadow-sm">
                <Star class="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                {{ listing.rating.toFixed(1) }}
            </div>

            <!-- Distance Badge -->
            <div v-if="listing.distance_km"
                class="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-1 rounded-lg flex items-center gap-1 font-medium">
                <MapPin class="w-2.5 h-2.5" />
                {{ listing.distance_km.toFixed(1) }} km
            </div>
        </div>

        <!-- Content -->
        <div class="p-3.5 space-y-2">
            <h3 class="font-bold text-sm text-gray-800 group-hover:text-blue-600 transition line-clamp-1">
                {{ listing.title }}
            </h3>

            <div class="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <MapPin class="w-3 h-3 text-slate-400" />
                <span>{{ listing.municipality }}</span>
            </div>

            <div v-if="listing.pricing_lowest" class="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                <span class="text-slate-400 font-normal">Starts at</span>
                ₱{{ listing.pricing_lowest.toLocaleString() }}
            </div>

            <div v-if="listing.description" class="text-[11px] text-gray-600">
                {{ listing.description }}
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { computed, onMounted, ref, nextTick } from 'vue'
import { Star, MapPin } from 'lucide-vue-next'

const props = defineProps({
    listing: { type: Object, required: true },
    index: { type: Number, required: true }
})

const cardRef = ref(null)

const primaryCategory = computed(() => {
    if (!props.listing.category?.length) return 'tourist-spots'
    return props.listing.category[0]
})

onMounted(async () => {
    await nextTick()

    const el = cardRef.value?.$el || cardRef.value

    if (!(el instanceof Element)) return

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    el.style.animationDelay = `${props.index * 120}ms`
                    el.classList.add('animate-card')
                    observer.unobserve(el)
                }
            })
        },
        { threshold: 0.3 }
    )

    observer.observe(el)
})
</script>

<style scoped>
.animate-card {
    animation: slideUp 0.9s ease-out forwards;
}

@keyframes slideUp {
    0% {
        transform: translateY(25px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
