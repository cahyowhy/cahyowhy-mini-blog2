const webpack = require('webpack');
const configuration = {
  /*
   ** Headers of the page
   */
  dev: (process.env.NODE_ENV !== 'production'),
  head: {
    title: 'jajalen',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /**
   * global css
   */
  css: ['~assets/css/main.scss'],
  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#3B8070'},
  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios', 'lodash'],
    /*
     ** Run ESLINT on save
     */
    // extend (config, ctx) {
    //   if (ctx.dev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },
  router: {
    middleware: 'check-auth'
  },
  plugins: [
    {src: '~/plugins/helpers', ssr: true},
    {src: '~/plugins/debugger', ssr: true},
    {src: '~/plugins/tinymce', ssr: false},
    {src: '~/plugins/notification', ssr: false},
  ],
  env: {
    APP: {
      APP_FB_ID: '836518019843190',
      DEFAULT_OFFSET: 0,
      DEFAULT_LIMIT: 9
    }
  }
};

if (configuration.dev) {
  configuration.env.APP.API_URL = `http://127.0.0.1:3000/`;
  configuration.env.APP.IMAGE_RESOURCES = `"${`http://res.cloudinary.com/dxdelmsib/`}"`;
  configuration.env.APP.API_USER = `"${configuration.env.APP.API_URL}users"`;
  configuration.env.APP.API_NOTIFICATION = `"${configuration.env.APP.API_URL}notifications"`;
  configuration.env.APP.API_RELATIONSHIP = `"${configuration.env.APP.API_URL}relationships"`;
  configuration.env.APP.API_TIMELINES = `"${configuration.env.APP.API_URL}timelines"`;
  configuration.env.APP.API_AUTH = `"${configuration.env.APP.API_URL}auth"`;
  configuration.env.APP.API_POST_COMMENT = `"${configuration.env.APP.API_URL}commentposts"`;
  configuration.env.APP.API_STATUS_COMMENT = `"${ configuration.env.APP.API_URL}commentstatuses"`;
  configuration.env.APP.API_POST_LIKE_COMMENT = `"${configuration.env.APP.API_URL}likecommentposts"`;
  configuration.env.APP.API_POST_LIKE = `"${configuration.env.APP.API_URL}likeposts"`;
  configuration.env.APP.API_POST = `"${configuration.env.APP.API_URL}posts"`;
  configuration.env.APP.API_IMAGE = `"${configuration.env.APP.API_URL}images"`;
  configuration.env.APP.API_STATUS = `"${configuration.env.APP.API_URL}statuses"`;
  configuration.env.APP.API_LOGIN = `"${configuration.env.APP.API_URL}authenticate"`;
  configuration.env.APP.API_IMAGE_PARAM_NAME = `"image[imagepath_data]"`;
  configuration.env.APP.API_STATUS_LIKE = `"${configuration.env.APP.API_URL}likestatuses"`;
}


module.exports = configuration;
