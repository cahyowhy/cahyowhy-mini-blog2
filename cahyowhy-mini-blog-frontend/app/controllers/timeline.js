import Ember from 'ember';
import BaseController from './base-controller';
import ENV from '../config/environment';
import offsetlimit from '../entity/offsetlimit';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  queryParams: ['token'],
  imageProfile: "",
  ifPostIsEmpty: Ember.computed('statuses', function () {
    return this.get('statuses').length === 0;
  }),
  afterRender(){
    this._super(...arguments);
    this.debug(this.commonService.getImageProfile());
    this.set('imageProfile', this.commonService.getImageProfile());
  },
  /**
   * check if status that we wrote
   * on create status component is empty
   * if false we can abort transition
   * when user accidentally click link to
   */
  ifCreateStatusEmpty: true,
  token: null,
  actions: {
    checkStatusEmpty(params){
      this.debug(params);
      this.set('ifCreateStatusEmpty', params);
    },
    onLoadStatuses(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;

      this.doFind("timeline", offsetlimit(offset)).then(function (response) {
        response.forEach(function (item) {
          context.get('statuses').pushObject(item);
        });

        response.length == 0 ? context.set('ifPostIsEmpty', true) : context.set('ifPostIsEmpty', false);
      });
    }
  }
});
