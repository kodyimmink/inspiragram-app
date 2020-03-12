<template>
  <div>
    <div class="p-3">
      <h1>Home</h1>
      <router-link 
        class="btn btn-primary btn-lg"
        :to="{ name: 'SignUp' }"
        role="button"
      >
        Sign Up
      </router-link>
      <router-link 
        class="btn btn-primary btn-lg"
        :to="{ name: 'Login' }"
        role="button"
      >
        Login
      </router-link>
    </div>
    <inspirations-grid />
  </div>
</template>

<script>
import InspirationsGrid from '../components/InspirationsGrid.vue';

export default {
  name: 'Home',
  components: {
    InspirationsGrid
  },
};
</script>

<style>

</style>