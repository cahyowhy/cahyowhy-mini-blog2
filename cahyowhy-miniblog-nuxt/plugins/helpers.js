import Vue from 'vue';
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
      if(condition){
        return imageurl
      } else {
        return `${process.env.APP.IMAGE_RESOURCES}${imageurl}`;
      }
    }
  }
});
