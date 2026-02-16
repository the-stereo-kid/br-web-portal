// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    mailerLiteApiKey: process.env.MAILERLITE_API_KEY,
    mailerLiteGroupId: process.env.MAILERLITE_GROUP_ID,
    mailerLiteRetreatGroupId: process.env.MAILERLITE_RETREAT_GROUP_ID,
    yocoSecretKey: process.env.YOCO_SECRET_KEY,
    public: {
      yocoPublicKey: process.env.YOCO_PUBLIC_KEY,
      siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Brothers Rising - Conscious Mens Community',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Creating A Community Of Strong, Healthy & Happy Men' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/iamges/logos/BR_logo_transparent_bg.png' }
      ]
    }
  }
})
