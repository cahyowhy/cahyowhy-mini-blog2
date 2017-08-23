import Ember from 'ember';

export default Ember.Route.extend(Ember.Evented, {
  /**
   * need for an injection
   * in all component
   */
  isDocumentReady: false,
  documentReady(){
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.trigger('documentReady');
      this.set('isDocumentReady', true);
    });
  }
});
