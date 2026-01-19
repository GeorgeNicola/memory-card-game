import store from "~/store";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);

  if (import.meta.client) {
    store.dispatch("auth/initAuth");
    store.dispatch("highScores/fetchHighScores");
  }

  return {
    provide: {
      store,
    },
  };
});
