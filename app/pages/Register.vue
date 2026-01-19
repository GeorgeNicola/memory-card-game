<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <div class="logo">🎮</div>
        <h1 class="title">Memory Game</h1>
        <p class="subtitle">Create your account</p>
      </div>

      <RegisterForm
        :error="auth.error.value ?? ''"
        :success="success"
        :loading="auth.isLoading.value"
        @handleRegister="handleRegister"
      />

      <div class="auth-footer">
        <p class="footer-text">
          Already have an account?
          <NuxtLink to="/login" class="footer-link">Login</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    definePageMeta({
      layout: "auth",
    });

    const auth = useAuth();

    onMounted(() => {
      auth.clearError();
    });

    return { auth };
  },
  data() {
    return {
      success: "",
    };
  },
  methods: {
    async handleRegister(formData: {
      name: string;
      email: string;
      password: string;
    }) {
      try {
        this.success = "";

        await this.auth.register(
          formData.name,
          formData.email,
          formData.password,
        );

        this.success = "Account created successfully! Redirecting...";
      } catch (err) {
        console.error("Registration error:", err);
      }
    },
  },
};
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

.logo {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
}
.title {
  font-size: 2rem;
  font-weight: 700;
  color: #39ff14;
  text-align: center;
  margin-bottom: 0.5rem;
}
.subtitle {
  color: #888888;
  text-align: center;
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
</style>
