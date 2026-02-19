<!-- components/ads/AdSlot.vue -->
<template>
    <div v-if="ad" class="w-full">

        <!-- IMAGE AD -->
        <a v-if="ad.type === 'image'" :href="ad.link" target="_blank" rel="noopener noreferrer"
            class="block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img :src="ad.image_url" :alt="ad.title"
                class="w-full h-auto object-cover hover:scale-[1.01] transition duration-500" loading="lazy" />
        </a>

        <!-- TEXT AD -->
        <a v-else-if="ad.type === 'text'" :href="ad.link" target="_blank" rel="noopener noreferrer"
            class="block bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-blue-50 transition duration-300">
            <div class="text-xs uppercase tracking-wide text-blue-600 mb-2">
                Sponsored
            </div>

            <h3 class="text-lg font-semibold text-blue-700 mb-2">
                {{ ad.title }}
            </h3>

            <p class="text-sm text-gray-600 leading-relaxed">
                {{ ad.description }}
            </p>
        </a>

    </div>

    <!-- EMPTY STATE PLACEHOLDER -->
    <div v-else
        class="w-full rounded-2xl border border-dashed border-blue-200 bg-blue-50 py-10 text-center text-sm text-blue-400">
        Advertisement
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Ad {
    id: string
    identifier: string
    type: 'image' | 'text'
    title: string
    description?: string
    image_url?: string
    link: string
    is_active: boolean
}

const props = defineProps<{
    identifier: string
}>()

/*
  In production:
  Replace this with Pinia store or API call:
  useAdStore().getByIdentifier(identifier)
*/

const mockAds: Ad[] = [
    {
        id: '1',
        identifier: 'AD_HOME_TOP',
        type: 'image',
        title: 'Premium Resort in Albay',
        image_url: '/img/hero.jpg',
        link: '#',
        is_active: true
    },
    {
        id: '2',
        identifier: 'AD_HOME_INLINE',
        type: 'text',
        title: 'Local Travel Package Promo',
        description: 'Book guided tours and transportation packages across Albay.',
        link: '#',
        is_active: true
    },
    {
        id: '3',
        identifier: 'AD_CATEGORY_GRID_INLINE',
        type: 'text',
        title: 'Advertise Your Business',
        description: 'Promote your tourism business to thousands of visitors.',
        link: '#',
        is_active: true
    }
]

const ad = computed(() =>
    mockAds.find(
        a => a.identifier === props.identifier && a.is_active
    )
)
</script>
