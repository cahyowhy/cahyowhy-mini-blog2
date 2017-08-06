import Ember from 'ember';
import ENV from '../../config/environment'
import Image from '../../entity/image';
import offsetlimit from '../../entity/offsetlimit';

export default Ember.Route.extend({
  model(queryparams){
    const context = this;
    if (queryparams !== null && queryparams !== undefined) {
      this.authService.auth(queryparams.token).then(function (response) {
        if (response.status === 204 && response.id === queryparams.userId) {
        } else {
          context.transitionToRoute('not-found');
        }
      });
    } else {
      this.transitionToRoute('not-found');
    }
  }
});
