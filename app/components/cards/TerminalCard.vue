<!-- components/cards/TerminalCard.vue -->
<template>
    <NuxtLink :to="`/terminals/${terminal.slug}`"
        class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
        <!-- Image -->
        <div class="relative h-44 overflow-hidden">
            <img :src="terminal.cover_image || '/images/terminal-placeholder.jpg'" :alt="terminal.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />

            <!-- Map Indicator -->
            <div
                class="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Map class="w-3 h-3" />
                Map
            </div>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-3">

            <!-- Title -->
            <h3 class="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition line-clamp-1">
                {{ terminal.title }}
            </h3>

            <!-- Municipality -->
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <MapPin class="w-4 h-4" />
                <span>{{ terminal.municipality }}</span>
            </div>

            <!-- Operating Hours -->
            <div v-if="terminal.operating_hours" class="flex items-center gap-2 text-sm text-gray-500">
                <Clock class="w-4 h-4" />
                <span>{{ terminal.operating_hours }}</span>
            </div>

        </div>
    </NuxtLink>
</template>

<script setup>
import { Map, MapPin, Clock } from 'lucide-vue-next'

defineProps({
    terminal: {
        type: Object,
        required: true
    }
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
