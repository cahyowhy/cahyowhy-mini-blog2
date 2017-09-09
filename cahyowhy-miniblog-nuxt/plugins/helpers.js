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
      if (imageurl) {
        const condition = imageurl.includes("scontent.xx.fbcdn") || imageurl.includes("facebook");
        if (condition) {
          return imageurl
        } else {
          return `${process.env.APP.IMAGE_RESOURCES}${imageurl}`;
        }
      }
    },
    eq: function (value1, value2) {
      return value1 === value2;
    },
    lte: function (value1, value2) {
      return value1 <= value2;
    },
    lt: function (value1, value2) {
      return value1 < value2;
    },
    gte: function (value1, value2) {
      return value1 >= value2;
    },
    or: function (value1, value2) {
      return value1 || value2;
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
    },
    /*
     return true if obj empty
     */
    isObjectEmpty: function (value) {
      if (typeof value === "object") {
        for (let key in value) {
          const condition = value[key] === "" || value[key].length < 1 || value[key] === null;
          if (condition) return true;
        }

        return false;
      }
    },
    /**
     * Method imageUploader to uploading multipart file
     * @param url {string} API url
     * @param params {object} form data file and JSON
     */
    imageUploader (url, params) {
      const context = this
      // setup header here
      const config = {
        headers: {
          'Authorization': context.$store.state.auth.isLogedIn ? context.$store.state.auth.access_token : '',
          'Content-Type': 'multipart/form-data'
        },
        // add callback progress here if needed
        onUploadProgress: function (progressEvent) {
          console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }
      }

      // start upload process return promise
      return new Promise(function (resolve, reject) {
        require('axios').post(url, params, config)
          .then(function (res) {
            context.showNotification(res.httpstatus)
            resolve(res.data)
          })
          .catch(function (err) {
            context.showNotification(err.httpstatus)
            reject(err.message)
          })
      })
    },
    /**
     * generate random id for uploading
     * image to cloudinary
     */
    generateId: function () {
      return Math.random().toString(36).substr(2, 124) + Math.random().toString(36).substr(2, 124) + Math.random().toString(36).substr(2, 124) + ".jpg";
    },
    showCustomNotification: function (title, message, type) {
      this.$notify({text: message, duration: 3000, type, title, group: 'info'})
    },
    showNotification: function (param) {
      let message;
      if (param) {
        switch (param) {
          case 200:
            message = "Berhasil mendapatkan data";
            break;
          case 201:
            message = "Berhasil membuat data";
            break;
          case 202:
            message = "Berhasil mengupdate data";
            break;
          case 203:
            message = "Berhasil menghapus data";
            break;
          case 204:
            message = "Login berhasil";
            break;
          case 205:
            message = "Follow berhasil";
            break;
          case 206:
            message = "Unfollow berhasil";
            break;
          case 400:
            message = "Gagal mendapatkan data";
            break;
          case 401:
            message = "Gagal membuat data";
            break;
          case 402:
            message = "Gagal mengupdate data";
            break;
          case 403:
            message = "Gagal menghapus data";
            break;
          case 404:
            message = "Login gagal";
            break;
          case 405:
            message = "Follow gagal";
            break;
          case 406:
            message = "Unfollow gagal";
            break;
        }

        if (param < 206) {
          this.$notify({text: message, duration: 1500, type: 'success', group: 'info'})
        } else {
          this.$notify({text: message, duration: 1500, type: 'error', group: 'info'})
        }
      } else {
        this.$notify({text: 'Error!, coba lain waktu', duration: 1500, type: 'error', group: 'info'});
      }
    },
    dataUrlToBlob: function (dataurl) {
      let data = dataurl.split(','),
        mimetypeFile = data[0].match(/:(.*?);/)[1],
        bytestring = atob(data[1]),
        index = bytestring.length, blobArray = new window.Uint8Array(index);
      while (index--) {
        blobArray[index] = bytestring.charCodeAt(index);
      }
      return new Blob([blobArray], {type: mimetypeFile});
    }
  }
});
