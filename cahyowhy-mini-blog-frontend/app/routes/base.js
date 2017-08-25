import Ember from 'ember';
import mainService from '../routes/main-service';

export default Ember.Route.extend(mainService, {
  activate(){
    this._super(...arguments);
    const applicationRoute = Ember.getOwner(this).lookup('route:application');
    if (applicationRoute.isDocumentReady) {
      Ember.run.scheduleOnce('afterRender', this, () => {
        this.afterRender();
      });
    } else {
      applicationRoute.on('documentReady', this, () => {
        this.afterRender();
      });
    }
  },
  /**
   * normalize weak map
   * that has setter getter val into
   * normal javascript object
   * @param {object} param
   */
  normalize(param){
    return JSON.parse(JSON.stringify(param));
  },
  afterRender(){
    const token = this.commonService.getToken();
    const context = this;
    window.scrollTo(0, 0);

    if (token === null || token === undefined) {
      this.setAuthentication(false);
    } else {
      this.authService.auth(token).then(function (response) {
        context.setAuthentication(response.status === 204);
      });
    }
  }
});
