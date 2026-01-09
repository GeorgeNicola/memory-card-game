<template>
  <div class="profile-tab">
    <h2 class="section-title">Profile Information</h2>

    <div class="profile-card">
      <div class="profile-field">
        <span class="field-label">Name:</span>
        <span class="field-value">{{ user?.name || "N/A" }}</span>
      </div>

      <div class="profile-field">
        <span class="field-label">Email:</span>
        <span class="field-value">{{ user?.email || "N/A" }}</span>
      </div>

      <div class="profile-field">
        <span class="field-label">User ID:</span>
        <span class="field-value">{{ user?.userId || "N/A" }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

const { user } = useAuth();
</script>

<style scoped>
.profile-tab {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #39ff14;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
}

.profile-card {
  background: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-field {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #111111;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
}

.field-label {
  color: #888888;
  font-weight: 600;
}

.field-value {
  color: #39ff14;
  font-weight: 600;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }

  .profile-card {
    padding: 1.5rem;
  }

  .profile-field {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
