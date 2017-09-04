<template>
  <div id="login-wrapper" class="overflow-auto">
    <div v-if="afterRegister" class="container-success-info">
      <div class="alert alert-success custom-success-info">
        <strong><h3 class="margin-bot-min15px">Selamat</h3> </strong> <br> anda telah berhasil mendaftar di miniblog <br>
        selanjutnya anda dapat mengkonfirmasi email untuk langkah selanjutnya. <br>
        <i>Pastikan untuk cek spam apabila di inbok tidak ditemukkan</i><br>
        <nuxt-link to="/login" class="btn btn-primary margin-top15 custom-23">
          Kembali ke login
        </nuxt-link>
      </div>
    </div>
    <div v-else>
      <div id="wrapper">
        <!-- {{#if isUserFailFbLogin}}
        <div class="alert alert-info">
          Daftar dulu untuk melengkapi Login Lewat Facebook
        </div>
        {{/if}} -->
        <div v-if="registerFailed" class="alert alert-danger">
          Alamat email anda kami kenali. Pastikan untuk masuk terlebih dahulu
          <strong>
            <nuxt-link to="/login">Masuk</nuxt-link>
          </strong>
        </div>
        <div class="main-content">
          <div class="header">
            <img src="~assets/img/logo.png"/>
          </div>
          <div class="l-part">
            <input type="text" class="input-3" placeholder="Email" v-model="$store.state.user.user.email">
            <input type="text" class="input-1" placeholder="Name" v-model="$store.state.user.user.name">
            <input type="text" class="input-3" placeholder="Username" v-model="$store.state.user.user.username">
            <div class="overlap-text">
              <input type="password" class="input-3" placeholder="password" v-model="$store.state.user.user.password">
            </div>
            <div class="overlap-text">
              <input type="password" class="input-3" placeholder="password Confirmation" v-model="passwordConfirmation">
            </div>
            <a id="btn-signup" v-bind:disabled="isBtnDisabled" type="button" class="btn" @click="doSave">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import userServive from '~/service/userServive';
  export default {
    data() {
      return {
        passwordConfirmation: '',
        afterRegister: false,
        registerFailed: false
      }
    },
    computed: {
      isBtnDisabled: {
        get(){
          const user = this.$store.state.user.user;
          const query = {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            passwordConfirmation: this.passwordConfirmation,
          };
          const isEmpty = this.isObjectEmpty(query);
          const passwordEqual = user.password === this.passwordConfirmation;
          const passwordGT8 = user.password.length > 8;
          const isEmailFormated = /^.+@.+\..+$/.test(user.email);

          return !(!isEmpty && passwordEqual && passwordGT8 && isEmailFormated);
        }
      }
    },
    methods: {
      async doSave() {
        const user = this.compactEntity(this.$store.state.user);
        const register = await new userServive().store(user);
        this.afterRegister = register.data.httpstatus === 201;
        this.registerFailed = register.data.httpstatus === 401;
      }
    }
  }

</script>
