import Ember from 'ember';
import BaseController from '../controllers/base-controller';
import Likepost from '../entity/likepost';

export default Ember.Component.extend(BaseController, {
  posts: "",
  applyLayout(){
    Ember.$(document).ready(function () {
      let $grid = Ember.$('#post-container').imagesLoaded(function () {
        $grid.masonry({
          itemSelector: '.post-item',
          percentPosition: true,
          columnWidth: '.post-item',
        });
      });
      $grid.masonry('reloadItems');
    });
  },
  init(){
    this._super(...arguments);
  },
  didReceiveAttrs(){
    this._super(...arguments);
    this.applyLayout();
  },
  didInsertElement(){
    this._super(...arguments);
    const context = this;
    let postHtml = Ember.$(this.get("description"));
    let editEl = Ember.$("<p>").append(postHtml);
    let imgHtml = editEl.find('img')['0'];
    let src = Ember.$(imgHtml).attr('src');
    editEl.find('img').remove();
    let category = function () {
      if (context.get("category") === undefined || context.get("category") === null) {
        return "uncategorized"
      } else {
        return context.get("category")
      }
    };

    this.set('category', category());
    this.set("description", editEl.find('p').text().substring(0, 125) + ".....");
    if (src === undefined) {
      this.set("img", '/img/no-image.png');
    } else {
      this.set("img", src);
    }

    this.applyLayout();
  },
  actions: {
    onFavouritePost(id){
      let likepost = Likepost.create();
      likepost.set('likepost.user_id', this.commonService.getId());
      likepost.set('likepost.post_id', id);
      this.doSave("likepost", likepost.getChildWithSelection(['user_id', 'post_id'])).then();
    }
  }
});
