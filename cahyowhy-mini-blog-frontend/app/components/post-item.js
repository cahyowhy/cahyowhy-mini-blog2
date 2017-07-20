import Ember from 'ember';
import BaseController from '../controllers/base-controller';
import Likepost from '../models/likepost';

export default Ember.Component.extend(BaseController, {
  posts: "",
  applyLayout(){
    Ember.$(document).ready(function () {
      let $grid = $('#post-container').imagesLoaded(function () {
        $grid.masonry({
          itemSelector: '.post-item',
          percentPosition: true,
          columnWidth: '.post-item',
        });
      });
    });
  },
  init(){
    this._super(...arguments);
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
      Likepost.user_id = this.commonService.getId();
      Likepost.post_id = id;
      this.doSave("likepost", Likepost).then();
    }
  }
});
