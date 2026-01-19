// @ts-ignore
import { createStore } from "vuex";
import * as auth from "./auth";
import * as highScores from "./highScores";

export interface RootState {
  auth: auth.AuthState;
  highScores: highScores.HighScoresState;
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
    highScores: {
      namespaced: true,
      state: highScores.state,
      getters: highScores.getters,
      mutations: highScores.mutations,
      actions: highScores.actions,
    },
  },
});
