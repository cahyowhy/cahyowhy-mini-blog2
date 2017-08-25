import Ember from 'ember';
import ENV from '../../config/environment';
import BaseRouter from '../base';
import Post from '../../entity/post';

const {computed} = Ember;
export default BaseRouter.extend({
  offset: ENV.APP.DEFAULT_OFFSET,
  posts: [],
  controller: null,
  model(param){
    this.offset = ENV.APP.DEFAULT_OFFSET;
    let post = new Post().getInitializeValue();
    post.post.category = param.id;
    post.post.offset = ENV.APP.DEFAULT_OFFSET;
    post.post.limit = ENV.APP.DEFAULT_LIMIT;
    delete post.post.imageposts_attributes;
    post = new Post().getChildValue(post);

    return Ember.RSVP.hash({
      posts: this.postService.find(post),
      category: this.category
    });
  },
  afterReder(){
    this._super(...arguments);
    this.controller.set('ifPostIsEmpty', computed.equal('posts.length',0));
  },
  getTitlePost(){
    const category = parseInt(this.controller.get("category"));

    return category === 1 ? "Postingan kategori sains" :
      category === 2 ? "Postingan kategori komedi" :
        category === 3 ? "Postingan kategori sejarah" :
          category === 4 ? "Postingan kategori gosip" :
            category === 5 ? "Postingan kategori puisi" :
              category === 6 ? "Postingan kategori pribadi" :
                category === 7 ? "Postingan kategori mistis" :
                  category === 8 ? "Postingan kategori berita" :
                    category === 9 ? "Postingan kategori teknologi" :
                      "Postingan terbaru";
  },
  getPengantarPost(){
    const category = parseInt(this.controller.get("category"));

    return category === 1 ? "Postingan berisi tentang ilmu sains dan alam" :
      category === 2 ? "Postingan kocak, bergairah dan tidak membosankan" :
        category === 3 ? "Postingan berisi sejarah tentang apapum" :
          category === 4 ? "Gosip hot tentang artis dan selebriti" :
            category === 5 ? "Puisi terfavorit yang hari ini" :
              category === 6 ? "Postingan kategori pribadi" :
                category === 7 ? "Cerita Mistis, bikin meringis untuk menemani malammu yanf sendiri" :
                  category === 8 ? "Berita terbaru dan menyegarkan untuk dibaca" :
                    category === 9 ? "Perkembangan teknologi terbaru hari ini" :
                      "Postingan terbaru yang menyegarkan";
  },
  setupController(controller, model){
    this.controller = controller;
    this.posts = model.posts;
    this.controller.set('posts', this.posts);
    this.controller.set('category', model.category);
    this.controller.set('title', this.getTitlePost());
    this.controller.set('pengantar', this.getPengantarPost());
  },
  actions: {
    willTransition(){
      Ember.$('#post-container').off();
      Ember.$('#post-container').removeAttr('style');
    },
    onLoadPost(){
      const context = this;
      const category = this.controller.get("category");
      this.offset = this.offset + ENV.APP.DEFAULT_LIMIT;

      let post = new Post().getInitializeValue();
      post.post.category = category;
      post.post.offset = this.offset;
      post.post.limit = ENV.APP.DEFAULT_LIMIT;
      delete post.post.imageposts_attributes;

      post = new Post().getChildValue(post);

      this.doFind("post", post).then(function (results) {
        results.forEach(function (item) {
          context.posts.pushObject(item);
          context.controller.get('posts').pushObject(item);
        });
        context.controller.set('ifPostIsEmpty', results.length === 0);
      });
    }
  }
});
