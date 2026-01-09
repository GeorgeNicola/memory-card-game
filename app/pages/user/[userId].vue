<template>
  <div class="profile-page">
    <div class="profile-header">
      <h1 class="page-title">Profile</h1>
      <nav class="profile-nav">
        <NuxtLink :to="`/user/${userId}`" class="nav-tab" active-class="active">
          Profile Info
        </NuxtLink>
        <NuxtLink
          :to="`/user/${userId}/scoreboard`"
          class="nav-tab"
          active-class="active"
        >
          My Scores
        </NuxtLink>
      </nav>
    </div>

    <div class="profile-content">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { user } = useAuth();
const userId = computed(() => route.params.userId);

definePageMeta({
  layout: "default",
  middleware: "auth",
});
</script>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #39ff14;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
}

.profile-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  background: #1a1a1a;
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid #333333;
}

.nav-tab {
  padding: 0.75rem 2rem;
  color: #ffffff;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.nav-tab:hover {
  color: #39ff14;
  background: rgba(57, 255, 20, 0.1);
}

.nav-tab.active {
  background: #39ff14;
  color: #0a0a0a;
  box-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
}

.profile-content {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .profile-nav {
    flex-direction: column;
  }

  .nav-tab {
    text-align: center;
  }
}
</style>
