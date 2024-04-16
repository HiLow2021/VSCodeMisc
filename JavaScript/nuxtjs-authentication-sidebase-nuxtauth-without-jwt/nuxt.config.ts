// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@sidebase/nuxt-auth', "@nuxtjs/tailwindcss"],
    auth: {
        globalAppMiddleware: true,
        provider: {
            type: 'local',
            pages: {
                login: '/login' // @default '/login'
            }
        }
    }
});