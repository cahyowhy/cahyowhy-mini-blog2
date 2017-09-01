<template>
  <div id="login-wrapper" class="overflow-auto">
    <div id="wrapper">
      <div class="main-content">
        <div class="header">
          <img src="~assets/img/logo.png"/>
        </div>
        <div class="l-part">
          <input type="text" class="input-1" placeholder="Username">
          <!--{{input type="text" value=user.user.username placeholder="Username" class="input-1"}}-->
          <div class="overlap-text">
            <input type="password" class="input-2" placeholder="Pasword">
            <!--{{input type="password" value=user.user.password placeholder="Pasword" class="input-2"}}-->
          </div>
          <!--disabled={{btnDisabled}} -->
          <a @click="onLogin" class="btn btn-login">Login</a>
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
    mounted(){

    },
    methods: {
      onLogin(){

      },
      onLoginFacebook(){

      }
    }
  }
</script>
