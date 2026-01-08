<script>
export default {
  name: 'UserPage',
  data() {
    return {
      userId: null 
    }
  },
  mounted() {
    this.userId = this.$route.params.userId;
    console.log(this.userId);
  }
}
</script>

<template>
    User Page - ID: {{ userId }}

    <NuxtPage />
</template> 