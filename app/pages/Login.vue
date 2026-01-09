<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <div class="logo">🎮</div>
        <h1 class="title">Memory Game</h1>
        <p class="subtitle">Login to continue</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div v-if="error" class="error-message">{{ error }}</div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="submit-btn">Login</button>
      </form>

      <div class="auth-footer">
        <p class="footer-text">
          Don't have an account?
          <NuxtLink to="/register" class="footer-link">Register</NuxtLink>
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

    return {
      auth: auth,
    };
  },

  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },

  methods: {
    async handleLogin() {
      try {
        this.error = "";
        this.success = "";

        if (!this.email || !this.password) {
          this.error = "Please fill in all fields";
          return;
        }

        if (this.password.length < 6) {
          this.error = "Password must be at least 6 characters";
          return;
        }

        this.auth.login(this.email, this.password);

        this.success = "Account logged in successfully! Redirecting to home...";

        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } catch (err) {
        console.error("Login error:", err);
        this.error = "An error occurred during login";
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

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.error-message {
  padding: 0.75rem;
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid #ff4444;
  border-radius: 8px;
  color: #ff6666;
  text-align: center;
  font-size: 0.9rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: #cccccc;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-input {
  padding: 0.75rem 1rem;
  background: #111111;
  border: 2px solid #333333;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #39ff14;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
}

.form-input::placeholder {
  color: #555555;
}

.submit-btn {
  padding: 1rem;
  background: #39ff14;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 0 30px rgba(57, 255, 20, 0.5);
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
}

.footer-text {
  color: #888888;
}

.footer-link {
  color: #39ff14;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #2dd40f;
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
