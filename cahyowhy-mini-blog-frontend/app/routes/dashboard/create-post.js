import Ember from 'ember';
import ENV from '../../config/environment'
import Image from '../../entity/image';
import offsetlimit from '../../entity/offsetlimit';

export default Ember.Route.extend({
  beforeModel(transition){
    const context = this;
    this.debug(transition.queryParams);
    if ((transition.queryParams.token !== null || transition.queryParams.token !== undefined) && (transition.queryParams.userId !== null || transition.queryParams.userId !== undefined)) {
      this.authService.auth(transition.queryParams.token).then(function (response) {
        if (response.status !== 204 || response.id.toString() !== transition.queryParams.userId) {
          window.location.href = "/not-found";
        }
      }).catch(function (err) {
        window.location.href = "/not-found";
      });
    } else {
      window.location.href = "/not-found";
    }
  }
});
