<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <div class="logo">🎮</div>
        <h1 class="title">Memory Game</h1>
        <p class="subtitle">Login to continue</p>
      </div>

      <LoginForm
        @handleLogin="handleLogin"
        :loading="isLoading"
        :error-message="apiError"
      />

      <div class="auth-footer">
        <p class="footer-text">
          Don't have an account?
          <NuxtLink to="/register" class="footer-link">Register</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    definePageMeta({
      layout: "auth",
    });

    const auth = useAuth();

    return { auth };
  },
  data() {
    return {
      isLoading: false,
      apiError: "",
    };
  },
  methods: {
    async handleLogin(credentials: any) {
      this.isLoading = true;
      this.apiError = "";

      try {
        await this.auth.login(credentials.email, credentials.password);
        this.$router.push("/");
      } catch (err: any) {
        console.error("Login failed:", err);
        this.apiError = "Invalid email or password";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  max-width: 100%;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 450px;
  background: #1a1a1a;
  border: 2px solid #39ff14;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 0 40px rgba(57, 255, 20, 0.2);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #39ff14;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
}

.subtitle {
  color: #888888;
  font-size: 1rem;
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
}

.footer-link {
  color: #39ff14;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
}

@media (max-width: 768px) {
  .auth-container {
    padding: 2rem;
  }

  .logo {
    font-size: 3rem;
  }

  .title {
    font-size: 1.75rem;
  }
}
</style>
