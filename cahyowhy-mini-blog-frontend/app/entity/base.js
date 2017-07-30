/**
 * Created by cahyo on 7/27/17.
 */
import Ember from 'ember';

let currentEntity;
export default Ember.Mixin.create({
  user: "user",
  image: "image",
  post: "post",
  imageposts_attributes: "imageposts_attributes",
  likepost: "likepost",
  commentpost: "commentpost",
  likecommentpost: "likecommentpost",
  init(type, params){
    currentEntity = type;
    console.log(currentEntity);
    params[type]['user_id'] = 0;
    params[type]['id'] = 0;
    this.create(params);
  },
  create(param){
    /*
     * keyword this is refers to class that extend
     * this class that means the entity class / Ember.object
     * */
    for (let key in param) {
      /*
       * check if the param has own properti key
       * example param={name:"cahyo", age:21}
       * key will be refer to name and age
       * so the params will has the name and age
       * and execute the statement
       * */
      if (param.hasOwnProperty(key)) {
        this[key] = param[key];
      }
    }
  },
  /*
   * return only the property that we need
   * */
  select(param){
    let result = {};
    const context = this;
    result[currentEntity] = {};
    /*param.forEach(function (item) {
      result[currentEntity][item] = context.get(`${currentEntity}.${item}`)
    });*/
    param.forEach(function (item) {
      result[currentEntity][item] = context.get(`${currentEntity}.${item}`)
    });

    return result;
  },
  /*
   * return only inside the mother property
   * */
  getChild(){
    let result = {};
    // for (let key in this.get(currentEntity)) {
    //   result[key] = this.get(`${currentEntity}.${key}`)
    // }
    for (let key in JSON.parse(JSON.stringify(this))) {
      result[key] = JSON.parse(JSON.stringify(this))[key]
    }

    return result;
  },
  getChildWithSelection(param){
    /*
     * return only child with property that we need
     * */
    console.log(this.get(currentEntity));
    console.log(this[currentEntity]);
    console.log(currentEntity);
    console.log(JSON.stringify(this));
    console.log(this);
    let result = {};
    const context = this;
    param.forEach(function (item) {
      result[item] = JSON.parse(JSON.stringify(this))[item]
    });
    /*
     * param.forEach(function (item) {
     result[item] = context.get(`${currentEntity}.${item}`)
     });
     * */

    return result;
  }
});
