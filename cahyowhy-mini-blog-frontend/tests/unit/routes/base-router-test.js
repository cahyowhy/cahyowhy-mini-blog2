import { moduleFor, test } from 'ember-qunit';

moduleFor('route:base-router', 'Unit | Route | base router', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
