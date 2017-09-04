<template>
  <div>
    <div v-if="!isPasswordEdit">
      <div class="setting-item">
        <div class="col-sm-12"><p>Name</p></div>
        <div class="input-group">
          <span class="input-group-addon"><i class="ion ion-person"></i></span>
          <input type="text" class="form-control" v-model="$store.state.user.user.name" placeholder="Name">
        </div>
      </div>
      <div class="setting-item">
        <div class="col-sm-12"><p>Username</p></div>
        <div class="input-group">
          <span class="input-group-addon"><i class="ion ion-person"></i></span>
          <input type="text" class="form-control" v-model="$store.state.user.user.username" placeholder="Username">
        </div>
      </div>
    </div>

    <div class="edit-password">
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
          <div class="col-sm-12"><p>Konfirmasi Password</p></div>
          <div class="input-group">
            <span class="input-group-addon"><i class="ion ion-person"></i></span>
            <input type="password" class="form-control" placeholder="Konfirmasi Password baru"
                   v-model="confirmPassword">
          </div>
        </div>
        <div class="btn-wrapper">
          <a @click="onUpdatePassword" :disabled="ifPasswordUpdate" class="btn-primary btn">
            Update Password
          </a>
        </div>
      </div>
    </div>

    <div v-if="!isPasswordEdit" class="btn-wrapper-setting">
      <a @click="onUpdateUser" class="btn-primary btn">Simpan</a>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        newPassword: '',
        confirmPassword: '',
        isPasswordEdit: false
      }
    },
    computed: {
      ifPasswordUpdate: {
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
      }
    },
    methods: {
      onUpdateUser(){

      },
      onUpdatePassword(){

      },
      onEditPassword(){
        this.isPasswordEdit = !this.isPasswordEdit;
      }
    }
  }
</script>
