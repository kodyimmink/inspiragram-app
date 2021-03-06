<template>
  <div class="p-3">
    <h1 class="d-inline">
      Sign Up
    </h1>
    <span
      v-if="signingUp"
      class="d-inline"
    >
      <img
        height="100px"
        src="../assets/loading.svg"
      >
    </span>
    <div 
      v-if="errorMessage"
      class="alert alert-danger"
      role="alert"
    >
      {{ errorMessage }}
    </div>
    <form @submit.prevent="signUp">
      <div class="form-group">
        <input
          id="username" 
          v-model="user.username" 
          type="username" 
          class="form-control" 
          aria-describedby="usernameHelp"
          placeholder="username"
          required
        >
        <small
          id="usernameHelp"
          class="form-text text-muted"
        >
          Username must be between 2 and 30 characters in length.
          It cannot include any special characters other than an underscore.
        </small>
      </div>
      <div class="form-group">
        <input
          id="password"
          v-model="user.password"
          type="password"
          class="form-control"
          aria-describedby="passwordHelp"
          placeholder="password"
          required
        >
        <small
          id="passwordHelp"
          class="form-text text-muted"
        >
          Password must be at least 10 characters in length.
        </small>
      </div>
      <div class="form-group">
        <input
          id="confirmPassword"
          v-model="user.confirmPassword"
          type="password"
          class="form-control"
          aria-describedby="confirmPassword"
          placeholder="re-enter password" 
          required
        >
      </div>
      <button
        type="submit"
        class="btn btn-primary"
      >
        Sign Up
      </button>
    </form>    
  </div>
</template>

<script>
import Joi from '@hapi/joi';

const schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9]+$)/).min(2).max(30).required(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.string().min(10).required()
});

export default {
    data: () => ({
        errorMessage: '',
        signingUp: false,
        user: {
            username: '',
            password: '',
            confirmPassword: '',
        },
    }),
    watch: {
        user: {
            handler(){
                this.errorMessage ='';
            },
            deep: true
        }
    },
    methods: {
        signUp() {
            this.errorMessage ='';
            if (this.validUser()){
                const body = {
                    username: this.user.username,
                    password: this.user.password
                };
                this.signingUp = true;
                //send to backend
                fetch(`${process.env.VUE_APP_BACKEND_URL}/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then( response => {
                    if (response.ok){
                        return response.json();
                    }
                    //handle error
                    return response.json().then( (error) => {
                        throw new Error(error.message)
                    })
                }).then( (result) => {
                    localStorage.token = result.token;
                    setTimeout( () => {
                      this.signingUp = false;
                      this.$router.push('/dashboard');
                    }, 1000);
                  }).catch( (error) => {
                    setTimeout( () => {
                      this.signingUp = false;
                      this.errorMessage = error.message
                    }, 1000);
                  });
            }
        },
        validUser() {
            if (this.user.password !== this.user.confirmPassword){
                this.errorMessage = 'Passwords must match.'
                return false;
            }

            //validate input
            const result = schema.validate(this.user);

            //correct input
            if (result.error === undefined){
                return true;
            }

            if (result.error.message.includes('username')){
                this.errorMessage = 'Username is invalid'
            }

            if (result.error.message.includes('password')){
                this.errorMessage = 'Password is invalid'
            }

            //otherwise set error to validation error message
            this.errorMessage = result.error.message;
            return false;
        },
    },
}
</script>