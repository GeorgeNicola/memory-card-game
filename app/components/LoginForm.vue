<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <div v-if="localError || errorMessage" class="error-message">
      {{ localError || errorMessage }}
    </div>

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

    <button type="submit" class="submit-btn" :disabled="loading">
      {{ loading ? "Connecting..." : "Login" }}
    </button>
  </form>
</template>

<script lang="ts">
export default defineComponent({
  name: "LoginForm",
  props: {
    loading: { type: Boolean, default: false },
    errorMessage: { type: String, default: "" },
  },
  emits: ["handleLogin"],
  data() {
    return {
      email: "",
      password: "",
      localError: "",
    };
  },
  methods: {
    handleSubmit() {
      this.localError = "";

      if (this.password.length < 6) {
        this.localError = "Password must be at least 6 characters";
        return;
      }

      this.$emit("handleLogin", {
        email: this.email,
        password: this.password,
      });
    },
  },
});
</script>

<style scoped>
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
}
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
