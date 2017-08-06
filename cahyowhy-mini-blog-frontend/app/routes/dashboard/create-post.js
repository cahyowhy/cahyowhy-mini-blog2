import Ember from 'ember';
import ENV from '../../config/environment'
import Image from '../../entity/image';
import offsetlimit from '../../entity/offsetlimit';

export default Ember.Route.extend({
  beforeModel(param, transition){
    const context = this;
    this.debug(param.queryParams);
    if ((param.queryParams.token !== null || param.queryParams.token !== undefined) && (param.queryParams.userId !== null || param.queryParams.userId !== undefined)) {
      this.authService.auth(param.queryParams.token).then(function (response) {
        if (response.status !== 204 || response.id !== param.queryParams.userId) {
          context.debug("daw");
          transition.abort();
        }
      }).catch(function (err) {
        context.debug(err);
        transition.abort();
      });
    } else {
      context.debug("dawfwfwwfafa");
      transition.abort();
    }
  }
});
