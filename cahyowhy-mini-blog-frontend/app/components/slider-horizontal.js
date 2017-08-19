import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['post-ul-category'],
  didInsertElement(){
    this._super(...arguments);
    const width = this.$().width();
    this.$().slimscroll({
      width: width + "px",
      height: this.get('height') + "px",
      axis: 'x'
    });
  },
  willDestroyElement(){
    this._super(...arguments);
    this.$().off();
  }
});
