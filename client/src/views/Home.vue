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
    <div class="d-flex flex-wrap justify-content-center">
      <div
      v-for="inspiration in inspirations"
      :key="inspiration.image.imageUrl.toString()"
      class="overlay-image d-flex p-2" 
    >
      <img 
        v-bind:alt=inspiration.image.alt 
        v-bind:src=inspiration.image.imageUrl 
        className="p-1"
      />
      <div class="quote p-2">
            "{{ inspiration.quote.text }}"
            <br/>
            -- {{ inspiration.quote.author }} --
      </div>
      <p class="credit">Photo Credit: <a :href=inspiration.image.authorLink target="_blank">{{ inspiration.image.authorName }}</a></p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    inspirations : [],
  }),
  mounted() {
    fetch(process.env.VUE_APP_BACKEND_URL + '/api/v1/inspirations', {
      headers: {
      authorization: localStorage.token,
    }
    })
    .then(response => response.json())
    .then( result => {
        this.inspirations = result
      });
  }
};
</script>

<style>

.overlay-image {
    position: relative;
   }

img {
  object-fit: cover;
  width: 320px;
  height: 320px;
}

.overlay-image .quote {
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.5em;
    text-shadow: 2px 2px 2px #000;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
}

.overlay-image .credit {
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.5em;
    text-shadow: 2px 2px 2px #000;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    position: absolute;
    top: 95%;
    right: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
}

</style>
