import Ember from 'ember';

export default Ember.Service.extend({
  cookies: Ember.inject.service(),
  init(){
    this._super(...arguments);
    this.notificationService.setDefaultAutoClear(true);
    this.notificationService.setDefaultClearDuration(1200);
  },
  setCookies(params){
    this.get("cookies").write('user', JSON.stringify(params));
  },
  clearCookies(){
    this.get('cookies').clear('user');
  },
  getToken(){
    let token;
    try {
      token = JSON.parse(this.get('cookies').read('user')).auth_token.toString();
    } catch (err) {
      token = null;
      this.debug(err);
    }

    return token;
  },
  getId(){
    let id;
    try {
      id = JSON.parse(this.get('cookies').read('user')).user.id.toString();
    } catch (err) {
      id = null;
      this.debug(err);
    }

    return id;
  },
  getImageProfile(){
    let imageProfile;
    try {
      imageProfile = JSON.parse(this.get('cookies').read('user')).user.imageurl.toString();
    } catch (err) {
      imageProfile = null;
      this.debug(err);
    }

    return imageProfile;
  },
  getUsername(){
    let username;
    try {
      username = JSON.parse(this.get('cookies').read('user')).user.username.toString();
    } catch (err) {
      username = null;
      this.debug(err);
    }

    return username;
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
  showCustomNotification(param, param2 = null){
    this.notificationService.info(param, param2 !== null ? {
        onClick: function () {
          window.open(param2);
        },
        clearDuration: 3000
      } : null);
  },
});
