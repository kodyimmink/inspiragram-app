<template>
  <div class="p-3">
    <h1>Dashboard</h1>
    <h4>Hello, {{ user.username }}. Looking for some inspiration?</h4>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {},
  }),
  mounted() {
    fetch(process.env.VUE_APP_BACKEND_URL, {
    headers: {
      authorization: localStorage.token,
    }
  }).then( response => response.json())
  .then(result => {
    if(result.user){
      this.user = result.user;
    } else {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  });
  }
};
</script>