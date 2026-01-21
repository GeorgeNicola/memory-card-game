import store from "~/store";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);

  if (import.meta.server) {
    nuxtApp.payload.vuexState = store.state;
  }

  if (import.meta.client) {
    if (nuxtApp.payload.vuexState) {
      store.replaceState(nuxtApp.payload.vuexState);
    }

    store.dispatch("auth/initAuth");
  }

  return {
    provide: {
      store,
    },
  };
});
