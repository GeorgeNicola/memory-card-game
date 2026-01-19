import store from "~/store";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);

  if (import.meta.client) {
    store.dispatch("auth/initAuth");
  }

  return {
    provide: {
      store,
    },
  };
});
