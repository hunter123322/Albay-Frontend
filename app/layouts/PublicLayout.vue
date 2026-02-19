<template>
    <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">

        <!-- Header -->
        <header class="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-3 group">
                    <img src="../assets/logo2.jpg" alt="Discover Albay Logo"
                        class="rounded-full w-11 shadow-md group-hover:scale-105 transition" />
                    <span class="text-lg font-semibold tracking-wide text-slate-800">
                        Discover <span class="text-blue-600">Albay</span>
                    </span>
                </NuxtLink>

                <!-- Desktop Nav -->
                <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <NuxtLink to="/" class="nav-link">Home</NuxtLink>
                    <NuxtLink to="/tourist-spots" class="nav-link">Spots</NuxtLink>
                    <NuxtLink to="/restaurants" class="nav-link">Restaurants</NuxtLink>
                    <NuxtLink to="/hotels" class="nav-link">Hotels</NuxtLink>
                    <NuxtLink to="/tour-guides" class="nav-link">Guides</NuxtLink>
                    <NuxtLink to="/terminals" class="nav-link">Terminals</NuxtLink>
                </nav>

                <!-- Mobile Button -->
                <button class="md:hidden text-slate-700" @click="isOpen = true">
                    <Menu class="w-6 h-6" />
                </button>

            </div>
        </header>

        <!-- Mobile Overlay -->
        <transition name="fade">
            <div v-if="isOpen" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" @click="isOpen = false" />
        </transition>

        <!-- Mobile Sidebar -->
        <transition name="slide">
            <aside v-if="isOpen" class="fixed top-0 right-0 w-auto h-full bg-white shadow-2xl z-50 p-8 flex flex-col">
                <div class="flex justify-between items-center mb-8">
                    <span class="text-blue-600 font-semibold text-lg">Menu</span>
                    <button @click="isOpen = false">
                        <X class="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                <nav class="flex flex-col gap-5 text-slate-700 font-medium">
                    <NuxtLink @click="isOpen = false" to="/" class="mobile-link">
                        <MapPin class="w-4 h-4" /> Home
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/tourist-spots" class="mobile-link">
                        <Map class="w-4 h-4" /> Tourist Spots
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/restaurants" class="mobile-link">
                        <Utensils class="w-4 h-4" /> Restaurants
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/hotels" class="mobile-link">
                        <Bed class="w-4 h-4" /> Hotels
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/tour-guides" class="mobile-link">
                        <User class="w-4 h-4" /> Tour Guides
                    </NuxtLink>
                    <NuxtLink @click="isOpen = false" to="/terminals" class="mobile-link">
                        <Bus class="w-4 h-4" /> Terminals
                    </NuxtLink>
                </nav>
            </aside>
        </transition>

        <!-- Main -->
        <main class="flex-1">
            <slot />
        </main>

        <!-- Redesigned Footer -->
        <footer class="bg-slate-900 text-slate-300">

            <!-- Top Section -->
            <div class="max-w-7xl mx-auto px-6 py-14 grid gap-12 md:grid-cols-4">

                <!-- Brand -->
                <div>
                    <h3 class="text-xl font-semibold text-white mb-4">
                        Discover <span class="text-blue-500">Albay</span>
                    </h3>
                    <p class="text-sm leading-relaxed text-slate-400">
                        Your trusted tourism directory platform to explore destinations,
                        restaurants, hotels, tour guides, and transport terminals across Albay.
                    </p>
                </div>

                <!-- Explore -->
                <div>
                    <h4 class="footer-title">Explore</h4>
                    <ul class="footer-list">
                        <li>
                            <NuxtLink to="/tourist-spots">Tourist Spots</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/restaurants">Restaurants</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/hotels">Hotels</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/tour-guides">Tour Guides</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/terminals">Terminals</NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="footer-title">Contact</h4>
                    <ul class="footer-list space-y-3">
                        <li class="flex items-center gap-2">
                            <Phone class="w-4 h-4" /> +63 966 7339 904
                        </li>
                        <li class="flex items-center gap-2">
                            <Mail class="w-4 h-4" /> belardoaldrin90@gmail.com
                        </li>
                    </ul>
                </div>

                <!-- Newsletter / Social -->
                <div>
                    <h4 class="footer-title">Stay Connected</h4>
                    <p class="text-sm text-slate-400 mb-4">
                        Follow us for updates and travel inspiration.
                    </p>
                    <div class="flex gap-4">
                        <div class="social-icon">FB</div>
                        <div class="social-icon">IG</div>
                        <div class="social-icon">TW</div>
                    </div>
                </div>

            </div>

            <!-- Bottom -->
            <div class="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
                © {{ new Date().getFullYear() }} Discover Albay.
                Crafted with care in Albay, Philippines.
            </div>

        </footer>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    Menu, X, MapPin, Map, Utensils,
    Bed, User, Bus, Phone, Mail
} from 'lucide-vue-next'

const isOpen = ref(false)
</script>

<style scoped>
.nav-link {
    @apply hover:text-blue-600 transition duration-200;
}

.mobile-link {
    @apply flex items-center gap-3 hover:text-blue-600 transition;
}

.footer-title {
    @apply text-white font-semibold mb-4;
}

.footer-list li {
    @apply text-slate-400 hover:text-white transition text-sm;
}

.social-icon {
    @apply w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold hover:bg-blue-600 transition cursor-pointer;
}

/* Animations */
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
