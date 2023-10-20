// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      IMMUDB_API_KEY: "",
    },
    NEWSDATA_API_URL: "",
    NEWSDATA_API_KEY: "",
    IMMUDB_API_URL: "",
    IMMUDB_API_KEY: "",
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
});
