/**
 * Created by cahyo on 7/27/17.
 */
import Ember from 'ember';

let currentEntity;
export default Ember.Mixin.create({
  user: "user",
  image: "image",
  post: "post",
  status: "status",
  imagestatuses_attributes: "imagestatuses_attributes",
  imageposts_attributes: "imageposts_attributes",
  likepost: "likepost",
  likestatus: "likestatus",
  commentpost: "commentpost",
  commentstatus: "commentstatus",
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
    let data = JSON.parse(JSON.stringify(this));
    let objectkey = "";
    for (let key in data) {
      objectkey = key;
    }
    let result = {};
    result[objectkey] = {};

    param.forEach(function (item) {
      result[objectkey][item] = data[objectkey][item];
    });

    return result;
  },
  /*
   * return only inside the mother property
   * */
  getChild(){
    let data = JSON.parse(JSON.stringify(this));
    let objectkey = "";
    for (let key in data) {
      objectkey = key;
    }
    let result = {};

    for (let key in data[objectkey]) {
      result[key] = data[objectkey][key];
    }

    return result;
  },
  /*
   * return only child with property that we need
   * */
  getChildWithSelection(param){
    let result = {};
    let data = JSON.parse(JSON.stringify(this));
    let objectkey = "";
    for (let key in data) {
      objectkey = key;
    }

    param.forEach(function (item) {
      result[item] = data[objectkey][item];
    });

    return result;
  }
});
