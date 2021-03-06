/* eslint-env node */
'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'cahyowhy-mini-blog',
    environment,
    rootURL: '/',
    locationType: 'auto',
    'ember-cli-notifications': {
      includeFontAwesome: true
    },
    fastboot: {
      hostWhitelist: ['example.com', 'subdomain.example.com', /^localhost:\d+$/]
    },
    EmberENV: {
      FEATURES: {
        'query-params': true
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      LOGGER: false,
      APP_FB_ID: '836518019843190',
      DEFAULT_OFFSET: 0,
      DEFAULT_LIMIT: 9
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'font-src': "'self'",
    'img-src': "'self'",
    'media-src': "'self'",
    'style-src': "'self' 'unsafe-inline'",
    'script-src': "'self' 'unsafe-eval' http://ip_to_rails_api",
    'connect-src': "'self' ws://ip_to_rails_api"
  };

  if (environment === 'development') {
    ENV.APP.LOGGER = true;
    ENV.APP.IMAGE_RESOURCES = "http://res.cloudinary.com/dxdelmsib/";
    ENV.APP.API_URL = 'http://127.0.0.1:3000/';
    ENV.APP.API_USER = ENV.APP.API_URL + "users/";
    ENV.APP.API_NOTIFICATION = ENV.APP.API_URL + "notifications/";
    ENV.APP.API_RELATIONSHIP = ENV.APP.API_URL + "relationships/";
    ENV.APP.API_TIMELINES = ENV.APP.API_URL + "timelines/";
    ENV.APP.API_AUTH = ENV.APP.API_URL + "auth/";
    ENV.APP.API_POST_COMMENT = ENV.APP.API_URL + "commentposts/";
    ENV.APP.API_STATUS_COMMENT = ENV.APP.API_URL + "commentstatuses/";
    ENV.APP.API_POST_LIKE_COMMENT = ENV.APP.API_URL + "likecommentposts/";
    ENV.APP.API_POST_LIKE = ENV.APP.API_URL + "likeposts/";
    ENV.APP.API_POST = ENV.APP.API_URL + "posts/";
    ENV.APP.API_IMAGE = ENV.APP.API_URL + "images/";
    ENV.APP.API_STATUS = ENV.APP.API_URL + "statuses/";
    ENV.APP.API_STATUS = ENV.APP.API_URL + "statuses/";
    ENV.APP.API_LOGIN = ENV.APP.API_URL + "authenticate/";
    ENV.APP.API_IMAGE_PARAM_NAME = "image[imagepath_data]";
    ENV.APP.API_STATUS_LIKE = ENV.APP.API_URL+"likestatuses";

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.LOGGER = false;
    ENV.APP.IMAGE_RESOURCES = "http://res.cloudinary.com/dn8p95u2f/";
    ENV.APP.API_URL = 'http://127.0.0.1:3000/';
    ENV.APP.API_STATUS_LIKE = ENV.APP.API_URL+"likestatuses";
    ENV.APP.API_USER = ENV.APP.API_URL + "users/";
    ENV.APP.API_NOTIFICATION = ENV.APP.API_URL + "notifications/";
    ENV.APP.API_RELATIONSHIP = ENV.APP.API_URL + "relationships/";
    ENV.APP.API_TIMELINES = ENV.APP.API_URL + "timelines/";
    ENV.APP.API_AUTH = ENV.APP.API_URL + "auth/";
    ENV.APP.API_POST_COMMENT = ENV.APP.API_URL + "commentposts/";
    ENV.APP.API_STATUS_COMMENT = ENV.APP.API_URL + "commentstatuses/";
    ENV.APP.API_POST_LIKE_COMMENT = ENV.APP.API_URL + "likecommentposts/";
    ENV.APP.API_POST_LIKE = ENV.APP.API_URL + "likeposts/";
    ENV.APP.API_POST = ENV.APP.API_URL + "posts/";
    ENV.APP.API_IMAGE = ENV.APP.API_URL + "images/";
    ENV.APP.API_STATUS = ENV.APP.API_URL + "statuses/";
    ENV.APP.API_STATUS = ENV.APP.API_URL + "statuses/";
    ENV.APP.API_LOGIN = ENV.APP.API_URL + "authenticate/";
    ENV.APP.API_IMAGE_PARAM_NAME = "image[imagepath_data]";
  }

  return ENV;
};
