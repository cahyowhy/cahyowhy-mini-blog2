import Ember from 'ember';
import BaseController from '../base-controller';
import User from '../../entity/user';

export default Ember.Controller.extend(BaseController, {
  user: User.create()
});
