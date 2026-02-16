<template>
    <div class="min-h-screen bg-gray-50 text-gray-800">

        <!-- Hero Section -->
        <section class="bg-white border-b">
            <div class="max-w-6xl mx-auto px-6 py-20 text-center">
                <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    Discover Albay
                </h1>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Explore tourist spots, restaurants, hotels, terminals, and local guides
                    in one organized tourism platform.
                </p>
                <div class="flex justify-center gap-4">
                    <a href="/tourist-spots"
                        class="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition">
                        Explore Places
                    </a>
                    <a href="/about"
                        class="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition">
                        Learn More
                    </a>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="max-w-6xl mx-auto px-6 py-16">
            <h2 class="text-2xl font-semibold mb-10 text-center">
                Categories
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                    <h3 class="text-lg font-semibold mb-2">Tourist Spots</h3>
                    <p class="text-sm text-gray-600">
                        Natural landmarks, beaches, mountains, and cultural destinations.
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                    <h3 class="text-lg font-semibold mb-2">Restaurants</h3>
                    <p class="text-sm text-gray-600">
                        Discover local cuisine, cafes, and dining experiences.
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                    <h3 class="text-lg font-semibold mb-2">Hotels</h3>
                    <p class="text-sm text-gray-600">
                        Find accommodations that fit your budget and comfort level.
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                    <h3 class="text-lg font-semibold mb-2">Terminals</h3>
                    <p class="text-sm text-gray-600">
                        Transportation hubs and travel routes within Albay.
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                    <h3 class="text-lg font-semibold mb-2">Tour Guides</h3>
                    <p class="text-sm text-gray-600">
                        Connect with accredited local guides for a better experience.
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                    <h3 class="text-lg font-semibold mb-2">Events</h3>
                    <p class="text-sm text-gray-600">
                        Stay updated with festivals and local happenings.
                    </p>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-black text-white">
            <div class="max-w-6xl mx-auto px-6 py-16 text-center">
                <h2 class="text-2xl md:text-3xl font-semibold mb-4">
                    Start Exploring Today
                </h2>
                <p class="text-gray-300 mb-8">
                    Plan your visit with reliable and organized local information.
                </p>
                <a href="/tourist-spots"
                    class="px-6 py-3 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition">
                    Browse Listings
                </a>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>
