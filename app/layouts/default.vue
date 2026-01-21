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
