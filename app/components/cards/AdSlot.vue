<!-- components/ads/AdSlot.vue -->
<template>
    <div v-if="ad" class="w-full rounded-2xl overflow-hidden shadow-sm border border-blue-100 bg-white">
        <!-- Image Ad -->
        <a v-if="ad.type === 'image'" :href="ad.link" target="_blank" rel="noopener noreferrer" class="block group">
            <img :src="ad.image" :alt="ad.title" class="w-full object-cover group-hover:opacity-95 transition"
                loading="lazy" />
        </a>

        <!-- Text Ad -->
        <a v-else-if="ad.type === 'text'" :href="ad.link" target="_blank" rel="noopener noreferrer"
            class="block p-6 hover:bg-blue-50 transition">
            <h3 class="text-lg font-semibold text-blue-700 mb-2">
                {{ ad.title }}
            </h3>
            <p class="text-sm text-gray-600">
                {{ ad.description }}
            </p>
        </a>

        <!-- Fallback Placeholder -->
        <div v-else class="p-6 text-center text-sm text-gray-400 bg-blue-50">
            Advertisement
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAdStore } from '~/stores/useAdStore'

const props = defineProps({
    identifier: {
        type: String,
        required: true
    }
})

const adStore = useAdStore()

const ad = computed(() => {
    return adStore.getAdByIdentifier(props.identifier)
})
</script>
