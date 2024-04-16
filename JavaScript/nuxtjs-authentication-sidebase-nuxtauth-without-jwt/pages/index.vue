<script setup lang="ts">
definePageMeta({ auth: false });
</script>

<template>
    <div class="flex w-full flex-col items-center justify-center">
        <h1 class="mt-4 p-4 text-3xl">Nuxt.js Authentication with Sidebase/Nuxt-Auth.js (without jwt)</h1>
        <div class="flex h-screen items-center justify-center">
            <NuxtLink to="/login" class="flex h-12 w-28 items-center justify-center rounded-md bg-green-500 hover:bg-green-400">
                Sign In
            </NuxtLink>
        </div>
    </div>
</template>
