<template>
  <div class="home text-center">
    <div class="jumbotron">
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
  </div>
</template>

<script>

export default {
  name: 'Home',
};
</script>
