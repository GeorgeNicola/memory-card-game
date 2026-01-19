<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script>
export default {
  setup() {
    const { init } = useAuth();

    // Se execută la pornirea aplicației
    // Nuxt se asigură că starea creată cu useState este persistentă
    init();
  },
};
</script>
