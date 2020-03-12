<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a
        class="navbar-brand"
        href="/"
      >Inspiragram</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto" />
        <button 
          class="btn btn-outline-danger my-2 my-sm-0"
          type="button"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout: () => {
      localStorage.removeItem('token');
      location.reload();
    }
  }
}
</script>
<style>

</style>
