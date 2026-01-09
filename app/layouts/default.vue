<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-text">Card Memory Game</span>
        </div>

        <nav class="nav">
          <NuxtLink to="/" class="nav-link">Game</NuxtLink>
          <NuxtLink to="/scoreboard" class="nav-link">Scoreboard</NuxtLink>
          <ClientOnly>
            <NuxtLink
              :to="`/user/${auth.user?.userId}`"
              class="nav-link"
              v-if="auth.isAuthenticated"
              >Profile</NuxtLink
            >
          </ClientOnly>
          <button @click="auth.logout" class="nav-link logout-btn">
            Logout
          </button>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    const auth = useAuth();

    return {
      auth: auth,
    };
  },
};
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}

.header {
  background: rgba(20, 20, 20, 0.95);
  border-bottom: 2px solid #39ff14;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #39ff14;
}

.logo-icon {
  font-size: 2rem;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: transparent;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #39ff14;
  background: rgba(57, 255, 20, 0.1);
}

.logout-btn {
  color: #ff4444;
}

.logout-btn:hover {
  color: #ff6666;
  background: rgba(255, 68, 68, 0.1);
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
