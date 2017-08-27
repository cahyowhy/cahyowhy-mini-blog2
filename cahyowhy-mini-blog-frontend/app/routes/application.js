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
      Ember.$.ajaxSetup({
        xhr: function () {
          let xhr = new Window.XMLHttpRequest();
          xhr.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
              let percentComplete = evt.loaded / evt.total;
              console.log(percentComplete);
            }
          }, false);

          return xhr;
        }
      });
    });
  }
});
