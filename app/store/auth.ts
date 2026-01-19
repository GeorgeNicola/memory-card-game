import type { User } from "@prisma/client";

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const state = (): AuthState => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
});

export const getters = {
  isAuthenticated: (state: AuthState): boolean => !!state.token && !!state.user,
  getUser: (state: AuthState): User | null => state.user,
  getToken: (state: AuthState): string | null => state.token,
  isLoading: (state: AuthState): boolean => state.isLoading,
  getError: (state: AuthState): string | null => state.error,
};

export const mutations = {
  SET_LOADING(state: AuthState, loading: boolean) {
    state.isLoading = loading;
  },
  SET_ERROR(state: AuthState, error: string | null) {
    state.error = error;
  },
  SET_AUTH(state: AuthState, payload: { user: User; token: string }) {
    state.user = payload.user;
    state.token = payload.token;
    state.error = null;
  },
  CLEAR_AUTH(state: AuthState) {
    state.user = null;
    state.token = null;
    state.error = null;
  },
  SET_USER(state: AuthState, user: User) {
    state.user = user;
  },
};

export const actions = {
  initAuth({ commit }: { commit: Function }) {
    if (import.meta.client) {
      const savedToken = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        try {
          const token = JSON.parse(savedToken);
          const user = JSON.parse(savedUser) as User;
          commit("SET_AUTH", { token, user });
        } catch (e) {
          console.error("Failed to parse auth data from storage:", e);
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        }
      }
    }
  },

  async register(
    { commit }: { commit: Function },
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
  ) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const userData = await $fetch<User>("/api/register", {
        method: "POST",
        body: { name, email, password },
      });

      // Auto-login after successful registration
      const token = JSON.stringify(userData.userId);
      commit("SET_AUTH", { user: userData, token });

      if (import.meta.client) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return userData;
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || "Registration failed";
      commit("SET_ERROR", errorMessage);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async login(
    { commit }: { commit: Function },
    { email, password }: { email: string; password: string },
  ) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const userData = await $fetch<User>("/api/login", {
        method: "POST",
        body: { email, password },
      });

      const token = JSON.stringify(userData.userId);
      commit("SET_AUTH", { user: userData, token });

      if (import.meta.client) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return userData;
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || "Login failed";
      commit("SET_ERROR", errorMessage);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  logout({ commit }: { commit: Function }) {
    commit("CLEAR_AUTH");

    if (import.meta.client) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }

    navigateTo("/login");
  },

  clearError({ commit }: { commit: Function }) {
    commit("SET_ERROR", null);
  },
};
