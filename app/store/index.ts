// @ts-ignore
import { createStore } from "vuex";
import * as auth from "./auth";

export interface RootState {
  auth: auth.AuthState;
}

export default createStore<RootState>({
  modules: {
    auth: {
      namespaced: true,
      state: auth.state,
      getters: auth.getters,
      mutations: auth.mutations,
      actions: auth.actions,
    },
  },
});
