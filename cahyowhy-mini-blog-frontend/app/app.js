import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

//Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
  ready() {
    this.__container__.lookup('route:application').documentReady();
  }
});

// App.computed.isBlank = function (arrString) {
//
//   return Ember.computed
// };
Ember.computed.allPresent = function (propertyNames) {
  // copy the array
  var computedArgs = propertyNames.slice(0);
  computedArgs.push(function () {
    return propertyNames.map(function (propertyName) {
      // get the value for each property name
      return this.get(propertyName);
    }, this).every(Ember.isPresent);
  });

  return Ember.computed.apply(Ember.computed, computedArgs);
};
loadInitializers(App, config.modulePrefix);

export default App;
