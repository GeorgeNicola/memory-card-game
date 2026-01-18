<script scoped>
export default {
  data() {
    const auth = useAuth();

    return {
      auth: auth,
    };
  },
};
</script>

<template>
  <footer class="simple-footer">
    <div class="container">
      <div class="line"></div>
      <div class="content">
        <p>&copy; 2026 Card Memory Game</p>
        <ClientOnly>
          <div class="status" v-if="auth.user">
            Conectat ca: <span>{{ auth.user.name }}</span>
          </div>
        </ClientOnly>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.simple-footer {
  padding: 20px 0;
  background-color: transparent;
  color: #666;
  font-size: 0.9rem;
}

.line {
  height: 1px;
  background: linear-gradient(90deg, transparent, #39ff14, transparent);
  margin-bottom: 20px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.status span {
  color: #39ff14; /* Verde neon din screenshot */
  font-weight: bold;
}
</style>
