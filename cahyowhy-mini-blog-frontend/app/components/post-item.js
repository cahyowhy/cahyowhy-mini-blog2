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
    if (!this.get("isVertical")) {
      this.applyLayout();
    }
  },
  didInsertElement(){
    this._super(...arguments);
    const condition = this.get("category") === undefined || this.get("category") === null
    const category = condition ? "uncategorized" : this.get("category");
    this.set('category', category);

    if (!this.get("isVertical")) {
      this.applyLayout();
    }
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
