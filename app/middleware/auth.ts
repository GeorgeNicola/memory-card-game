"use client";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, init } = useAuth();

  init();

  console.log("Auth Middleware: isAuthenticated =", isAuthenticated);

  if (!isAuthenticated) {
    return navigateTo("/login");
  }
});
