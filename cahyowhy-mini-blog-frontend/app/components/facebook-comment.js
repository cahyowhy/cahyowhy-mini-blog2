import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement(){
    const context = this;
    Ember.$('#post-detail-wrapper').append(`
        <div class="fb-outer">
        <div class="fb-inner">
            <div class="fb-comments" data-href="${window.location}" data-numposts="10" data-width="100%" data-colorscheme="light"></div> 
        </div> 
        </div>
    `);
    Ember.$('body').append(`
      <script>
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s);
          js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=${context.get('fbAPPID')}";
          fjs.parentNode.insertBefore(js, fjs);} (document, 'script', 'facebook-jssdk'));
        </script>`
    );
  }
});
