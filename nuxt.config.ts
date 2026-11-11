// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    mailerLiteApiKey: process.env.MAILERLITE_API_KEY,
    mailerLiteNewsletterGroup: process.env.MAILERLITE_NEWSLETTER_GROUP,
    mailerLiteRetreatGroup: process.env.MAILERLITE_RETREAT_GROUP,
    yocoSecretKey: process.env.YOCO_SECRET_KEY,
    yocoWebhookSecret: process.env.YOCO_WEBHOOK_SECRET,
    resendApiKey: process.env.RESEND_API_KEY,
    mailFrom: process.env.MAIL_FROM || 'Brothers Rising <hello@brothersrising.com>',
    sessionPassword: process.env.SESSION_PASSWORD,
    adminEmails: process.env.ADMIN_EMAILS,
    mailerLiteEventsGroup: process.env.MAILERLITE_EVENTS_GROUP,
    public: {
      yocoPublicKey: process.env.YOCO_PUBLIC_KEY,
      // Preview deployments link to themselves (Vercel sets these at build time), so sign-in links and
      // payment redirects stay on the preview instead of jumping to production.
      siteUrl:
        process.env.VERCEL_ENV === 'preview'
          ? `https://${process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL}`
          : process.env.SITE_URL || 'http://localhost:3000'
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
        { name: 'description', content: 'Creating A Community Of Strong, Healthy & Happy Men' },
        { name: 'theme-color', content: '#292524' }
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/logos/BR_logo_no_text.jpeg' }
      ]
    }
  }
})
