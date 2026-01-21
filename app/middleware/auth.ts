"use client";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated.value) {
      return navigateTo("/login");
    }
  }
});
