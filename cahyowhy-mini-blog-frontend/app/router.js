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
  this.route('post', {queryParams: ['category']});
  this.route('post-detail', {path: '/post-detail/:id'});
  this.route('dashboard', {path: '/dashboard/:id'}, function () {
    this.route('create-post', {queryParams: ['token']});
    this.route('images');
    this.route('setting');
    this.route('post');
  });
  this.route('not-found', {path: '/*path'});
  this.route('timeline', {queryParams: ['search', 'type']});
  this.route('search');
});

export default Router;
