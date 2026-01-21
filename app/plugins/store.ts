import store from "~/store";

export default defineNuxtPlugin((nuxtApp) => {
  // Register store
  nuxtApp.vueApp.use(store);

  // SSR: Save state for hydration
  if (import.meta.server) {
    nuxtApp.payload.vuexState = store.state;
  }

  // Client: Restore state from SSR
  if (import.meta.client) {
    if (nuxtApp.payload.vuexState) {
      store.replaceState(nuxtApp.payload.vuexState);
    }

    // Then initialize client-only logic
    store.dispatch("auth/initAuth");
  }

  return {
    provide: {
      store,
    },
  };
});
