import Ember from 'ember';

export default Ember.Mixin.create({
  activate(){
    this._super(...arguments);
  },
  init(){
    this._super(...arguments);
    Ember.run.schedule("afterRender", this, function () {
      this.didInsertElement();
    });
  },
  didInsertElement(){
    this.debug("sasghagshaw");
  },
  actions: {
    error(reason, transition){
      // this.transitionTo('/page404');
    }
  }
});
