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

<style>
.layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}
</style>
