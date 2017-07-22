import {test} from 'qunit';
import moduleForAcceptance from 'cahyowhy-mini-blog/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sign up');

test('visiting /sign-up', function (assert) {
  visit('/sign-up');

  andThen(function () {
    assert.equal(currentURL(), '/sign-up');
    fillIn("input#name", "asepsulaya");
    fillIn("input#username", "mitakacana");
    fillIn("input#password", "12345678");
    fillIn("input#confirmpassword", "12345678");
    click("a#btn-signup");
    andThen(function () {
      Ember.run.later(function () {
        assert.equal(currentURL(), '/login');
      }, 2000);
    })
  });
});
