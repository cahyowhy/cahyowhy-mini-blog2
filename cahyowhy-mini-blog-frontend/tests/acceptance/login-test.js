import {test} from 'qunit';
import moduleForAcceptance from 'cahyowhy-mini-blog/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login');

test('visiting /login and check if user can login', function (assert) {
  visit('/login');

  andThen(function () {
    assert.equal(currentURL(), '/login');
    fillIn('input.input-1', 'cahyowhy');
    fillIn('input.input-2', '12345678');
    click('input.btn-login');
    andThen(function () {
      assert.equal(find('.header-profile .media-body p').text(), 'cahyowhy');
    })
  });
});
