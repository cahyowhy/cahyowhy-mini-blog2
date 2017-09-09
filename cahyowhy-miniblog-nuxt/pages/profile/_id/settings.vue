<template>
  <div>
    <div class="edit-password col-sm-12 margin-bottom-30px">
      <div class="edit-password-title">
        <p class="pull-left"> Password Setting</p>
        <div class="pull-right"><a @click="onEditPassword" class="btn btn-default btn-sm">
          {{editUserPassword}}
        </a>
        </div>
      </div>
      <div v-if="isPasswordEdit" class="edit-password-body">
        <div class="setting-item">
          <div class="col-sm-12"><p>Password lama</p></div>
          <div class="input-group">
            <span class="input-group-addon"><i class="ion ion-person"></i></span>
            <input type="password" class="form-control" placeholder="Password"
                   v-model="$store.state.user.user.password">
          </div>
        </div>
        <div class="setting-item">
          <div class="col-sm-12"><p>Password baru</p></div>
          <div class="input-group">
            <span class="input-group-addon"><i class="ion ion-person"></i></span>
            <input type="password" class="form-control" v-model="newPassword" placeholder="Password baru">
          </div>
        </div>
        <div class="setting-item">
          <div class="col-sm-12"><p>Konfirmasi Password Baru</p></div>
          <div class="input-group">
            <span class="input-group-addon"><i class="ion ion-person"></i></span>
            <input @keyup.enter="onUpdatePassword" type="password" class="form-control"
                   placeholder="Konfirmasi Password baru"
                   v-model="confirmPassword">
          </div>
        </div>
        <div class="btn-wrapper">
          <a @click="onUpdatePassword" :disabled="isBtnUpdatePwdDisabled" class="btn-primary btn">
            Update Password
          </a>
        </div>
      </div>
    </div>

    <div v-if="!isPasswordEdit" class="col-sm-12 custom-setting">
      <div class="row">
        <div class="col-sm-8">
          <div class="setting-item">
            <div class="col-sm-12"><p>Name</p></div>
            <div class="input-group">
              <span class="input-group-addon"><i class="ion ion-person fontSize16px"></i></span>
              <input type="text" class="form-control" v-model="$store.state.user.user.name" placeholder="Name">
            </div>
          </div>
          <div class="setting-item">
            <div class="col-sm-12"><p>Username</p></div>
            <div class="input-group">
              <span class="input-group-addon"><i class="ion ion-person fontSize16px"></i></span>
              <input @keyup.enter="onUpdateUser" type="text" class="form-control"
                     v-model="$store.state.user.user.username"
                     placeholder="Username">
            </div>
          </div>
        </div>
        <div class="col-sm-4 overflow-auto relative">
          <i class="ion ion-android-camera">
            <!--{{photocropper-uploader-galleries id="photos" action=(route-action "doUpload")}}-->
          </i>
          <background :src="imageUrl($store.state.profile.user.imageurl)" className="custom-pp-setting"/>
        </div>
      </div>
    </div>

    <div v-if="!isPasswordEdit" class="btn-wrapper-setting">
      <a @click="onUpdateUser" :disabled="isBtnUpdateDisabled" class="btn-primary btn">Simpan</a>
    </div>
  </div>
</template>
<script>
  import background from '~/components/background-image.vue';
  import photoCroper from '~/components/photoCroper.vue';

  export default {
    components: {
      background,
      photoCroper
    },
    data(){
      return {
        newPassword: '',
        confirmPassword: '',
        isPasswordEdit: false
      }
    },
    computed: {
      isBtnUpdatePwdDisabled: {
        get(){
          const match = this.newPassword === this.confirmPassword;
          const pwdGT8 = this.newPassword.length > 8;
          const pwdEmpty = this.$store.state.user.user.password.length > 0;

          return !(match && pwdGT8 && pwdEmpty);
        }
      },
      editUserPassword: {
        get(){
          return this.isPasswordEdit ? "Edit user" : "Edit password";
        }
      },
      isBtnUpdateDisabled: {
        get (){
          const user = this.$store.state.user.user;
          return user.name.length === 0 || user.username.length === 0
        }
      }
    },
    methods: {
      async onUpdateUser(){
        if (!this.isBtnUpdateDisabled) {
          const state = this.$store.state;
          const body = this.$store.getters['user/user'];
          const data = await this.$store.dispatch('user/update', {body, param: state.auth.user.id, context: this});
          this.$store.dispatch('auth/setUser', data);
          setTimeout(() => context.$router.push('/'), 100);
        } else {
          this.showCustomNotification('Pastikan data yang anda isi telah benar dan lengkap', 'Pastikkan untuk mengisi seluruh field yang tersedia dengan benar dan lengkap', 'error');
        }
      },
      async onUpdatePassword(){
        if (!this.isBtnUpdatePwdDisabled) {
          const state = this.$store.state;
          const user = state.auth.user;
          const body = this.$store.getters['user/userPassword'];
          const payload = {
            username: user.username,
            password: state.user.user.password
          };
          const isPasswordMatched = await this.$store.dispatch('auth/checkPassword', payload);
          if (isPasswordMatched) {
            await this.$store.dispatch('user/update', {body, param: this.$store.state.auth.user.id, context: this});
          } else {
            console.log("iam i this");
            this.showCustomNotification('Password yang anda isi salah', 'Pastikan password yang anda isi benar', 'error');
          }
        } else {
          this.showCustomNotification('Pastikan data yang anda isi telah benar dan lengkap', 'Untuk password minimal 9 karakter', 'error');
        }
      },
      onEditPassword(){
        this.isPasswordEdit = !this.isPasswordEdit;
      }
    }
  }
</script>
