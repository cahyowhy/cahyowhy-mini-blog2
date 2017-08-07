import Ember from 'ember';
import BaseController from './base-controller';

export default Ember.Controller.extend(BaseController, {
  queryParams: ['token'],
  token: null
});
