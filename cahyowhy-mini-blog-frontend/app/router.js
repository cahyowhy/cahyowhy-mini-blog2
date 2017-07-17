import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

if (config.APP.LOGGER) {
  debug.enable('*');
} else {
  debug.disable();
}

Router.map(function () {
  this.route('login');
  this.route('sign-up');
  this.route('base-router');
  this.route('post');
  this.route('post-detail', {path: '/post-detail/:id'});
  this.route('dashboard', function () {
    this.route('create-post');
    this.route('images');
    this.route('setting');
  });
});

export default Router;
