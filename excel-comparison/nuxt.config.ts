export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || 'https://n8n.malekabbes.com/webhook/compare-excels'
    }
  }
})