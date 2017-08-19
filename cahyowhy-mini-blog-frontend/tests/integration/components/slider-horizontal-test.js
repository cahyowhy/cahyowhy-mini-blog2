import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('slider-horizontal', 'Integration | Component | slider horizontal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{slider-horizontal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#slider-horizontal}}
      template block text
    {{/slider-horizontal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
