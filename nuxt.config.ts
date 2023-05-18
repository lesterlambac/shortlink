// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/supabase'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  dev: process.env.NODE_ENV !== 'production',

  runtimeConfig: {

    public: {
      baseUrl: process.env.NODE_ENV == 'development' ? 'http://localhost:3000/' : process.env.WEBSITE_URL,
      geoApiKey: '',
    }
  }
})
