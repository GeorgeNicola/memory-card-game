"use client";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, init } = useAuth();

  init();

  if (!isAuthenticated) {
    return navigateTo("/login");
  }
});
