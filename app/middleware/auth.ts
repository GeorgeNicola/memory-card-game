"use client";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const { isAuthenticated, init, user } = useAuth();

    init();

    console.log("Middleware - isAuthenticated:", isAuthenticated.value);
    console.log("Middleware - user:", user.value);

    if (!isAuthenticated.value) {
      return navigateTo("/login");
    }
  }
});
