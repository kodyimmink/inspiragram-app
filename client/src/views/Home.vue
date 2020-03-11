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
    <div class="p-3 photo-grid card-text quote">
      <div
        v-for="inspiration in inspirations"
        :key="inspiration.image.imageUrl.toString()"
        v-bind:class = "randomizedList()"
        v-bind:style="{ 'background-image': 'url(' + inspiration.image.imageUrl + ')' }"
        >
        "{{ inspiration.quote.text }}"
        <br/>
        -- {{ inspiration.quote.author }} --
        <p class="card-text credit">Photo Credit: <a :href=inspiration.image.authorLink target="_blank">{{ inspiration.image.authorName }}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    inspirations : [],
    classList: ['card', 'card card-wide', 'card card-tall', 'card card-wide card-tall'],
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
  },
  methods: {
    randomizedList() {
      return this.classList[Math.floor(Math.random() * this.classList.length)];
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');

body {
    background: rgb(19, 19, 19);
    color: #fff;
    font-family: 'Noto Sans', sans-serif;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #353535;
    color: #fff;
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    transition: all 500ms;
    overflow: hidden;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
 }
  
.card:hover {
    box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em, rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
    transform: translateY(-1.5px) scale(1.05);
 }

.photo-grid {
  display: grid;
  gap: 1rem;

  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: 280px;
}

/* Medium screens */
@media screen and (min-width: 600px) {
  .card-tall {
    grid-row: span 2 / auto;
  }

  .card-wide {
    grid-column: span 2 / auto;
  }
}

.card-text {
  color: #fff;
  font-weight: 600;
  line-height: 1.5em;
  text-shadow: 2px 2px 2px #000;
  font-family: Noto Sans, Arial, Helvetica, sans-serif;
  text-align: center;
  position: absolute;
  width: 100%;
}

.quote {
    font-size: 1.25rem;
}

.credit {
    font-size: 12px;
    top: 95%;
    right: 50%;
    transform: translate(50%, -95%);
}

</style>