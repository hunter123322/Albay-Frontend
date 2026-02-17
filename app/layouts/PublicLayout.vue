<!-- layouts/PublicLayout.vue -->
<template>
    <div class="min-h-screen flex flex-col bg-blue-50 text-gray-800">

        <!-- Header -->
        <header class="sticky top-0 z-50 bg-blue-500 text-white shadow-md">
            <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-lg tracking-wide">
                    <MapPin class="w-5 h-5" />
                    <span>Discover Albay</span>
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
                    <NuxtLink to="/" class="hover:text-blue-200 transition">Home</NuxtLink>
                    <NuxtLink to="/tourist-spots" class="hover:text-blue-200 transition">Spots</NuxtLink>
                    <NuxtLink to="/restaurants" class="hover:text-blue-200 transition">Restaurants</NuxtLink>
                    <NuxtLink to="/hotels" class="hover:text-blue-200 transition">Hotels</NuxtLink>
                    <NuxtLink to="/tour-guides" class="hover:text-blue-200 transition">Guides</NuxtLink>
                    <NuxtLink to="/terminals" class="hover:text-blue-200 transition">Terminals</NuxtLink>
                </nav>

                <!-- Mobile Menu Button -->
                <button class="md:hidden" @click="isOpen = true" aria-label="Open Menu">
                    <Menu class="w-6 h-6" />
                </button>

            </div>
        </header>

        <!-- Mobile Sidebar -->
        <transition name="fade">
            <div v-if="isOpen" class="fixed inset-0 bg-black/40 z-40" @click="isOpen = false" />
        </transition>

        <transition name="slide">
            <aside v-if="isOpen"
                class="fixed top-0 right-0 w-auto h-full bg-white/90 shadow-xl z-50 p-6 flex flex-col gap-6">
                <div class="flex items-center justify-between">
                    <span class="text-blue-600 font-semibold text-lg">Menu</span>
                    <button @click="isOpen = false">
                        <X class="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <nav class="flex flex-col gap-4 text-gray-700 text-sm font-medium">
                    <NuxtLink @click="isOpen = false" to="/" class="flex items-center gap-2 hover:text-blue-600">
                        <MapPin class="w-4 h-4" /> Home
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/tourist-spots"
                        class="flex items-center gap-2 hover:text-blue-600">
                        <Map class="w-4 h-4" /> Tourist Spots
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/restaurants"
                        class="flex items-center gap-2 hover:text-blue-600">
                        <Utensils class="w-4 h-4" /> Restaurants
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/hotels" class="flex items-center gap-2 hover:text-blue-600">
                        <Bed class="w-4 h-4" /> Hotels
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/tour-guides"
                        class="flex items-center gap-2 hover:text-blue-600">
                        <User class="w-4 h-4" /> Tour Guides
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/terminals"
                        class="flex items-center gap-2 hover:text-blue-600">
                        <Bus class="w-4 h-4" /> Terminals
                    </NuxtLink>
                </nav>
            </aside>
        </transition>

        <!-- Main Content -->
        <main class="flex-1">
                <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-blue-700 text-blue-100 mt-12">
            <div class="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 text-sm">

                <div>
                    <h3 class="font-semibold mb-3 text-white">About</h3>
                    <p class="leading-relaxed">
                        Tourism directory platform designed to help visitors explore destinations,
                        restaurants, hotels, and guides across Albay.
                    </p>
                </div>

                <div>
                    <h3 class="font-semibold mb-3 text-white">Contact</h3>
                    <ul class="space-y-2">
                        <li class="flex items-center gap-2">
                            <Phone class="w-4 h-4" /> +63 XXX XXX XXXX
                        </li>
                        <li class="flex items-center gap-2">
                            <Mail class="w-4 h-4" /> info@discoveralbay.com
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-semibold mb-3 text-white">Explore</h3>
                    <ul class="space-y-2">
                        <li>
                            <NuxtLink to="/search" class="hover:text-white">Search</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/tourist-spots" class="hover:text-white">Tourist Spots</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/restaurants" class="hover:text-white">Restaurants</NuxtLink>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="border-t border-blue-600 text-center py-4 text-xs">
                © {{ new Date().getFullYear() }} Discover Albay. All rights reserved.
            </div>
        </footer>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    Menu,
    X,
    MapPin,
    Map,
    Utensils,
    Bed,
    User,
    Bus,
    Phone,
    Mail
} from 'lucide-vue-next'

const isOpen = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>
