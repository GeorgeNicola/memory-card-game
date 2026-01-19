import type { User } from "@prisma/client";

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const token = useState<string | null>("token", () => null);

  const isAuthenticated = computed(() => !!token.value);

  const init = () => {
    if (import.meta.client) {
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

    if (import.meta.client) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
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
    isAuthenticated,
  };
};
