import Ember from 'ember';
import mainService from '../routes/main-service';
import Likepost from '../entity/likepost';

export default Ember.Component.extend(mainService, {
  posts: "",
  applyLayout(){
    let $grid = Ember.$('#post-container').imagesLoaded(function () {
      $grid.masonry({
        itemSelector: '.post-item',
        percentPosition: true,
        columnWidth: '.post-item',
      });
    });
    $grid.masonry('reloadItems');
  },
  init(){
    this._super(...arguments);
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
      let likepost = new Likepost().getInitializeValue();
      likepost.likepost.user_id = this.commonService.getId();
      likepost.likepost.post_id = id;
      likepost = new Likepost().getChildValue(likepost);
      this.doSave("likepost", likepost).then();
    }
  }
});
