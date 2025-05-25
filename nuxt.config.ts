import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@nuxt/icon'],
  ssr: false,
  i18n: {
    langDir: 'locales',
    lazy: true,
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский' }
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'en'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    pageTransition: false
  }
})