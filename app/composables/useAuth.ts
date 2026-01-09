export const useAuth = () => {
  // Use Nuxt's useState for SSR-friendly global state
  const user = useState<any>("user", () => null);
  const token = useState<string | null>("token", () => null);

  // A computed property is better than a function for checking auth status
  const isAuthenticated = computed(() => !!token.value);

  const init = () => {
    // process.client ensures this only runs in the browser (localStorage is not on server)
    if (process.client) {
      const savedToken = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        token.value = savedToken;
        try {
          user.value = JSON.parse(savedUser);
        } catch (e) {
          console.error("Failed to parse user from storage");
        }
      }
    }
  };

  const register = async (name: string, email: string, password: string) => {
    await $fetch("/api/register", {
      method: "POST",
      body: {
        name: name,
        email: email,
        password: password,
      },
    });
  };

  const login = async (email: string, password: string) => {
    const user = await $fetch("/api/login", {
      method: "POST",
      body: {
        email: email,
        password: password,
      },
    });

    localStorage.setItem("authToken", JSON.stringify(user.userId));
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    user.value = null;
    token.value = null;

    if (process.client) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      // Optional: Clear any cookies or redirect
      navigateTo("/login");
    }
  };

  return {
    user,
    token,
    init,
    register,
    login,
    logout,
    isAuthenticated, // This is now a reactive Ref
  };
};
