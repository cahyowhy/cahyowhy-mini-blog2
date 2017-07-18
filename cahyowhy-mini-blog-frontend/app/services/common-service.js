import Ember from 'ember';

export default Ember.Service.extend({
  localStorage: Ember.inject.service(),
  init(){
    this._super(...arguments);
    this.notificationService.setDefaultAutoClear(true);
    this.notificationService.setDefaultClearDuration(1200);
  },
  getToken(){
    return this.get('localStorage').getItem('user').auth_token
  },
  getId(){
    return this.get('localStorage').getItem('user').user.id;
  },
  getUsername(){
    return this.get('localStorage').getItem('user').user.username;
  },
  showNotification(param){
    let message;
    if (param !== undefined) {
      switch (param) {
        case 200:
          message = "Berhasil mendapatkan data";
          break;
        case 201:
          message = "Berhasil membuat data";
          break;
        case 202:
          message = "Berhasil mengupdate data";
          break;
        case 203:
          message = "Berhasil menghapus data";
          break;
        case 204:
          message = "Login berhasil";
          break;
        case 400:
          message = "Gagal mendapatkan data";
          break;
        case 401:
          message = "Gagal membuat data";
          break;
        case 402:
          message = "Gagal mengupdate data";
          break;
        case 403:
          message = "Gagal menghapus data";
          break;
        case 404:
          message = "Login gagal";
          break;
      }

      if (param > 204) {
        this.notificationService.error(message);
      } else {
        this.notificationService.success(message);
      }
    } else {
      this.notificationService.error(param);
    }
  },
  showCustomNotification(param){
    this.notificationService.info(param);
  },
});
