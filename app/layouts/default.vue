<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-text">Memory Card Game</span>
        </div>

        <NavigationMenu />
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>

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
</style>
