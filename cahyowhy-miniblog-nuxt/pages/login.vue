<template>
  <div id="login-wrapper" class="overflow-auto">
    <div id="wrapper">
      <div class="main-content">
        <div class="header">
          <img src="~assets/img/logo.png"/>
        </div>
        <div class="l-part">
          <input v-model="$store.state.user.user.username" type="text" class="input-1" placeholder="Username">
          <div class="overlap-text">
            <input v-model="$store.state.user.user.password" type="password" class="input-2" placeholder="Pasword">
          </div>
          <a v-bind:disabled="!isBtnDisabled" @click="onLogin" class="btn btn-login">Login</a>
        </div>
      </div>
      <div class="sub-content">
        <div class="s-part">
          <nuxt-link to="/sign-up">
            Don't have an account?
          </nuxt-link>
          <nuxt-link to="/sign-up" tag="p" class="no-margin-bottom custom_">
            daftar disini dulu ya
          </nuxt-link>
          <a @click="onLoginFacebook" class="login-btn">
            <img src="~assets/img/facebook-login.png">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loginServive from '~/service/loginServive';

  export default {
    computed: {
      isBtnDisabled: {
        get(){
          const isUsernameEmpty = this.$store.state.user.user.username.length > 0;
          const isPasswordEmpty = this.$store.state.user.user.password.length > 0;
          return isUsernameEmpty && isPasswordEmpty;
        }
      }
    },
    methods: {
      onLogin(){
        const store = this.$store;
        const user = this.compactChildEntity(store.state.user);
        new loginServive().store(user).then(function (result) {
          store.dispatch('auth/setToken', result.data.auth_token);
          store.dispatch('auth/setUser', result.data.user);
          store.commit('auth/SET_IS_LOGGED_IN', true);
        });
      },
      onLoginFacebook(){

      }
    }
  }
</script>
