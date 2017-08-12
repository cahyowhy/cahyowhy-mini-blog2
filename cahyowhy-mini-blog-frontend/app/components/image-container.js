import Ember from 'ember';
/**
 * background image container
 * handle element div that contains
 * background image to check if image
 * is error and adding blur efect
 * on first 1s
 */
export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src'],
  didInsertElement() {
    this._super(...arguments);
    const context = this;
    const src = this.get('src');
    if (src === undefined || src === null || src.length === 0) {
      context.set('src', context.get('errorSrc'));
    }

    this.$().on('load', function () {
      this.$().addClass('blur');
      Ember.run.later(function () {
        context.$().removeClass('blur');
      }, 1000);
    }.bind(this)).on('error', function () {
      context.set('src', "/image/not-found.png");
    });
  },
  willDestroyElement() {
    this._super(...arguments);
    this.$().off();
  }
});
