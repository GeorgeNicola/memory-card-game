import type { User } from "@prisma/client";

export const useAuth = () => {
  const { $store } = useNuxtApp();

  const user = computed<User | null>(() => $store.getters["auth/getUser"]);
  const token = computed<string | null>(() => $store.getters["auth/getToken"]);
  const isAuthenticated = computed<boolean>(
    () => $store.getters["auth/isAuthenticated"],
  );
  const isLoading = computed<boolean>(() => $store.getters["auth/isLoading"]);
  const error = computed<string | null>(() => $store.getters["auth/getError"]);

  const init = () => {
    $store.dispatch("auth/initAuth");
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const result = await $store.dispatch("auth/register", {
        name,
        email,
        password,
      });

      await navigateTo("/");
      return result;
    } catch (error: any) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await $store.dispatch("auth/login", { email, password });

      await navigateTo("/");
      return result;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    $store.dispatch("auth/logout");
  };

  const clearError = () => {
    $store.dispatch("auth/clearError");
  };

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Actions
    init,
    register,
    login,
    logout,
    clearError,
  };
};
