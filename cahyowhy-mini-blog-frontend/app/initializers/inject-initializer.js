export default {
  name: 'injection',
  initialize: function (application) {
    application.inject('service:commonService', 'notificationService', 'service:notification-messages');

    application.inject('controller', 'commonService', 'service:commonService');
    application.inject('controller', 'cableService', 'service:cable');
    application.inject('component', 'commonService', 'service:commonService');

    application.inject('route', 'commonService', 'service:commonService');
    application.inject('route', 'userService', 'service:userService');
    application.inject('route', 'postService', 'service:postService');
    application.inject('route', 'loginService', 'service:loginService');
    application.inject('route', 'imageService', 'service:imageService');
    application.inject('route', 'authService', 'service:authService');
    application.inject('route', 'commentpostService', 'service:commentpostService');
    application.inject('route', 'likecommentpostService', 'service:likecommentpostService');
    application.inject('route', 'likepostService', 'service:likepostService');
    application.inject('route', 'cableService', 'service:cable');
    application.inject('route', 'statusService', 'service:statusService');
    application.inject('route', 'commentstatusService', 'service:commentstatusService');
    application.inject('route', 'timelineService', 'service:timelineService');
    application.inject('route', 'likestatusService', 'service:likestatusService');
    application.inject('route', 'relationshipService', 'service:relationshipService');
    application.inject('route', 'notificationService', 'service:notificationService');
  }
};
