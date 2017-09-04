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
    imageUrl: function(imageurl) {
      if (imageurl) {
        const condition = imageurl.includes("scontent.xx.fbcdn") || imageurl.includes("facebook");
        if (condition) {
          return imageurl
        } else {
          return `${process.env.APP.IMAGE_RESOURCES}${imageurl}`;
        }
      }
    },
    eq: function(value1, value2) {
      return value1 === value2;
    },
    lte: function(value1, value2) {
      return value1 <= value2;
    },
    lt: function(value1, value2) {
      return value1 < value2;
    },
    gte: function(value1, value2) {
      return value1 >= value2;
    },
    or: function(value1, value2) {
      return value1 || value2;
    },
    compactEntity: function(value) {
      const content = value[Object.keys(value)[0]];
      const contentFilter = lodash.pickBy(content, lodash.identity);
      let obj = {};
      obj[Object.keys(value)[0]] = contentFilter;

      return obj;
    },
    compactChildEntity: function(value) {
      const content = value[Object.keys(value)[0]];
      return lodash.pickBy(content, lodash.identity);
    },
    /*
     return true if obj empty
     */
    isObjectEmpty: function(value) {
      if (typeof value === "object") {
        for (let key in value) {
          const condition = value[key] === "" || value[key].length < 1 || value[key] === null;
          if (condition) return true;
        }

        return false;
      }
    }
  }
});
