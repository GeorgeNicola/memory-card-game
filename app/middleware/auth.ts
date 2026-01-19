"use client";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const { isAuthenticated, init } = useAuth();

    init();

    if (!isAuthenticated.value) {
      return navigateTo("/login");
    }
  }
});
