<template>
  <div class="login-container">
    <form class="login-card" @submit.prevent="login">
      <h1>Login</h1>

      <div class="form-group">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="email@example.com"
          required
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>

      <button type="submit">Login</button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      this.error = ''

      if (!this.email || !this.password) {
        this.error = 'Completează toate câmpurile'
        return
      }

      // aici vei conecta backend-ul
      console.log('Login:', this.email, this.password)
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  font-family: Arial, sans-serif;
}

.login-card {
  background: white;
  padding: 2rem;
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.login-card h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.form-group input:focus {
  border-color: #667eea;
}

button {
  width: 100%;
  padding: 0.7rem;
  border: none;
  background: #667eea;
  color: white;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

button:hover {
  background: #5563d6;
}

.error {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.7rem;
  text-align: center;
}
</style>
