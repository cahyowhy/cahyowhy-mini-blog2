export default {
  name: 'injection',
  initialize: function (application) {
    application.inject('service:commonService', 'notificationService', 'service:notification-messages');

    application.inject('route', 'headData', 'service:headData');
    application.inject('route', 'userService', 'service:userService');
    application.inject('route', 'loginService', 'service:loginService');
    application.inject('route', 'imageService', 'service:imageService');
    application.inject('route', 'postService', 'service:postService');
    application.inject('route', 'commonService', 'service:commonService');
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

    application.inject('controller', 'userService', 'service:userService');
    application.inject('controller', 'loginService', 'service:loginService');
    application.inject('controller', 'imageService', 'service:imageService');
    application.inject('controller', 'commonService', 'service:commonService');
    application.inject('controller', 'postService', 'service:postService');
    application.inject('controller', 'authService', 'service:authService');
    application.inject('controller', 'commentpostService', 'service:commentpostService');
    application.inject('controller', 'likecommentpostService', 'service:likecommentpostService');
    application.inject('controller', 'likepostService', 'service:likepostService');
    application.inject('controller', 'applicationRoute', 'route:application');
    application.inject('controller', 'cableService', 'service:cable');
    application.inject('controller', 'statusService', 'service:statusService');
    application.inject('controller', 'commentstatusService', 'service:commentstatusService');
    application.inject('controller', 'timelineService', 'service:timelineService');
    application.inject('controller', 'likestatusService', 'service:likestatusService');
    application.inject('controller', 'relationshipService', 'service:relationshipService');
    application.inject('controller', 'notificationService', 'service:notificationService');

    application.inject('component', 'commonService', 'service:commonService');
    application.inject('component', 'userService', 'service:userService');
    application.inject('component', 'postService', 'service:postService');
    application.inject('component', 'loginService', 'service:loginService');
    application.inject('component', 'imageService', 'service:imageService');
    application.inject('component', 'authService', 'service:authService');
    application.inject('component', 'commentpostService', 'service:commentpostService');
    application.inject('component', 'likecommentpostService', 'service:likecommentpostService');
    application.inject('component', 'likepostService', 'service:likepostService');
    application.inject('component', 'applicationRoute', 'route:application');
    application.inject('component', 'cableService', 'service:cable');
    application.inject('component', 'statusService', 'service:statusService');
    application.inject('component', 'commentstatusService', 'service:commentstatusService');
    application.inject('component', 'timelineService', 'service:timelineService');
    application.inject('component', 'likestatusService', 'service:likestatusService');
    application.inject('component', 'relationshipService', 'service:relationshipService');
    application.inject('component', 'notificationService', 'service:notificationService');

    application.inject('mixin', 'commonService', 'service:commonService');
    application.inject('mixin', 'userService', 'service:userService');
    application.inject('mixin', 'postService', 'service:postService');
    application.inject('mixin', 'loginService', 'service:loginService');
    application.inject('mixin', 'imageService', 'service:imageService');
    application.inject('mixin', 'authService', 'service:authService');
    application.inject('mixin', 'commentpostService', 'service:commentpostService');
    application.inject('mixin', 'likecommentpostService', 'service:likecommentpostService');
    application.inject('mixin', 'likepostService', 'service:likepostService');
    application.inject('mixin', 'applicationRoute', 'route:application');
    application.inject('mixin', 'cableService', 'service:cable');
    application.inject('mixin', 'statusService', 'service:statusService');
    application.inject('mixin', 'commentstatusService', 'service:commentstatusService');
    application.inject('mixin', 'timelineService', 'service:timelineService');
    application.inject('mixin', 'likestatusService', 'service:likestatusService');
    application.inject('mixin', 'relationshipService', 'service:relationshipService');
    application.inject('mixin', 'notificationService', 'service:notificationService');
  }
};
