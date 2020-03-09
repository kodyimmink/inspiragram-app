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
    <!-- <div>
      <Inspiration />
    </div> -->
  </div>
</template>

<script>
import Inspiration from '../components/Inspiration.js'

export default {
  name: 'Home',
  components: {
    //Inspiration
  },
};
</script>
