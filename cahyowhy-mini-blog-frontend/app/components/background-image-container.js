import Ember from 'ember';
/**
 * background image container
 * handle element div that contains
 * background image to check if image
 * is error and adding blur efect
 * on first 1s
 */
export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['src'],
  ifImageIsBroken(){
    this.$().css({
      'background-image': "url('/img/not-found.png')"
    });
  },
  doChecking(){
    const context = this;
    const src = this.get('src');
    this.$().addClass('bg-image-container');
    if (src === undefined || src === null || src.length === 0) {
      context.debug(src);
      this.ifImageIsBroken();
    } else {
      Ember.$('<img/>').attr('src', src).on('load', function () {
        Ember.$(this).remove();
        context.$().css({
          'background-image': "url(" + src + ")"
        });
      }).on('error', function () {
        context.ifImageIsBroken();
      });
    }
  },
  didInsertElement() {
    this._super(...arguments);
    this.doChecking();
  },
  didUpdateAttrs(){
    this._super(...arguments);
    this.doChecking();
  },
  willDestroyElement() {
    this._super(...arguments);
    this.$().off();
  }
});
