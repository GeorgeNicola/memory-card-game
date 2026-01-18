<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <div class="logo">🎮</div>
        <h1 class="title">Memory Game</h1>
        <p class="subtitle">Create your account</p>
      </div>

      <RegisterForm
        :error="error"
        :success="success"
        :loading="loading"
        @handleRegister="handleRegister"
        @handleError="handleError"
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

<script>
export default {
  setup() {
    definePageMeta({
      layout: "auth",
    });

    const auth = useAuth();
    return { auth };
  },
  data() {
    return {
      error: "",
      success: "",
      loading: false,
    };
  },
  methods: {
    handleError(errorMessage) {
      this.error = errorMessage;
    },

    async handleRegister(formData) {
      try {
        this.error = "";
        this.success = "";
        this.loading = true;

        await this.auth.register(
          formData.name,
          formData.email,
          formData.password,
        );

        this.success = "Account created successfully! Redirecting to login...";

        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } catch (err) {
        console.error("Registration error:", err);
        this.error = "An error occurred during registration";
      } finally {
        this.loading = false;
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
