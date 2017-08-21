/**
 * how to use?
 * let user = new User().getInitializeValue();
 * user.user.name = "maria";
 * user.user.username="mariadb"
 *
 * to get all the val
 * user = new User().getUserValue(user)
 * print should be
 * {
 *  user:{
 *    name:'maria',
 *    username:'mariadb',
 *    ...etc....
 *  }
 * }
 *
 *
 *
 */

const lodash = window._;
export default class Base {
  constructor(value) {
    this.value = value;
  }

  getInitializeValue() {
    return this.value;
  }

  /**
   * elminate all nul, blank, undef value
   * @param {object} user
   * @returns {object} {*}
   */
  getValue(user) {
    this.value = user;
    return lodash.pickBy(this.value, lodash.identity);
  }

  /**
   * elminate all nul, blank, undef value
   * return only child off element
   * @param {object} user
   * @returns {object} {*}
   */
  getChildValue(user) {
    let valueparam;
    for (let key in user['user']) {
      valueparam[key] = user['user'][key];
    }

    this.value = valueparam;
    return lodash.pickBy(this.value, lodash.identity);
  }
}
