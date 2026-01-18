<template>
  <nav class="nav-container">
    <button
      class="menu-toggle"
      @click="isMenuOpen = !isMenuOpen"
      aria-label="Toggle menu"
    >
      <span :class="['hamburger', { 'is-active': isMenuOpen }]"></span>
    </button>

    <div :class="['nav-links', { 'is-open': isMenuOpen }]">
      <NuxtLink to="/" class="nav-link" @click="isMenuOpen = false"
        >Game</NuxtLink
      >
      <NuxtLink to="/scoreboard" class="nav-link" @click="isMenuOpen = false"
        >Scoreboard</NuxtLink
      >

      <ClientOnly>
        <NuxtLink
          v-if="auth.isAuthenticated"
          :to="`/user/${auth.user?.userId}/profile`"
          class="nav-link"
          @click="isMenuOpen = false"
          >Profile</NuxtLink
        >
      </ClientOnly>

      <button @click="handleLogout" class="nav-link logout-btn">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    const auth = useAuth();
    return {
      auth: auth,
      isMenuOpen: false,
    };
  },
  methods: {
    handleLogout() {
      this.isMenuOpen = false;
      this.auth.logout();
    },
  },
};
</script>

<style scoped>
.nav-container {
  display: flex;
  align-items: center;
  position: relative;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #39ff14;
  background: rgba(57, 255, 20, 0.1);
  text-shadow: 0 0 8px rgba(57, 255, 20, 0.5);
}

.logout-btn {
  color: #ff4444;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 100;
  }

  .hamburger {
    display: block;
    width: 24px;
    height: 2px;
    background: #39ff14;
    position: relative;
    transition: all 0.3s ease;
  }

  .hamburger::before,
  .hamburger::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 2px;
    background: #39ff14;
    transition: all 0.3s ease;
  }

  .hamburger::before {
    top: -8px;
  }
  .hamburger::after {
    bottom: -8px;
  }

  .hamburger.is-active {
    background: transparent;
  }
  .hamburger.is-active::before {
    transform: rotate(45deg);
    top: 0;
  }
  .hamburger.is-active::after {
    transform: rotate(-45deg);
    bottom: 0;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background: #1a1a1a;
    border-left: 2px solid #39ff14;
    flex-direction: column;
    padding: 80px 20px;
    transition: right 0.4s ease-in-out;
    z-index: 90;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  }

  .nav-links.is-open {
    right: 0;
  }

  .nav-link {
    width: 100%;
    text-align: left;
    font-size: 1.2rem;
    padding: 1rem;
  }
}

@media (min-width: 769px) {
  .menu-toggle {
    display: none;
  }
}
</style>
