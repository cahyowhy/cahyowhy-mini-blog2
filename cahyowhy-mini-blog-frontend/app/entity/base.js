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
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }

  getInitializeValue() {
    return this.value;
  }

  /**
   * elminate all nul, blank, undef value
   * @param {object} value
   * @returns {object} {*}
   */
  getValue(value) {
    this.value = value;
    const objchild = lodash.pickBy(this.value[this.type], lodash.identity);
    let obj = {};
    obj[this.type] = objchild;

    return obj;
  }

  /**
   * elminate all nul, blank, undef value
   * return only child off element
   * @param {object} value
   * @returns {object} {*}
   */
  getChildValue(value) {
    let valueparam = {};
    for (let key in value[this.type]) {
      valueparam[key] = value[this.type][key];
    }

    this.value = valueparam;
    return lodash.pickBy(this.value, lodash.identity);
  }
}
