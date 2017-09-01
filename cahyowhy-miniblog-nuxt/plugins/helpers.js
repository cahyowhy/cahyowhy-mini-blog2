import Vue from 'vue';
const lodash = require('lodash');
/**
 * dapat dipakai di template
 * caranya seperti ini
 * {{ capitalizeFirstLetter('lower case') }}
 */
Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    imageUrl: function (imageurl) {
      const condition = imageurl.includes("scontent.xx.fbcdn") || imageurl.includes("facebook");
      if (condition) {
        return imageurl
      } else {
        return `${process.env.APP.IMAGE_RESOURCES}${imageurl}`;
      }
    },
    compactEntity: function (value) {
      const content = value[Object.keys(value)[0]];
      const contentFilter = lodash.pickBy(content, lodash.identity);
      let obj = {};
      obj[Object.keys(value)[0]] = contentFilter;

      return obj;
    },
    compactChildEntity: function (value) {
      const content = value[Object.keys(value)[0]];
      return lodash.pickBy(content, lodash.identity);
    }
  }
});
