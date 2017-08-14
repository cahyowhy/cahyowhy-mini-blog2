/**
 * Created by cahyo on 8/11/2017.
 */
import Ember from 'ember';

/**
 * every changing the route
 * make scroll reset to 0,0
 * position
 */
export default Ember.Component.extend({
  init(){
    this._super(...arguments);
  },
  didInsertElement(){
    this._super(...arguments);
    Ember.run.schedule('afterRender', this, function () {
      this.addObserver('routeName', this, 'onScrollTop');
    });
  },
  onScrollTop(){
    const routeName = this.get("routeName").split(".");
    this.debug(routeName);
    window.scrollTo(0, 0);
    /*const ifIsInProfile = routeName[0].startsWith("profile") && routeName[2] !== undefined;
    if (!ifIsInProfile) {

    }*/
  },
});
