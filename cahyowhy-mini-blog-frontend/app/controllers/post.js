import Ember from 'ember';
import BaseController from './base-controller';
import ENV from '../config/environment';
import offsetlimit from '../entity/offsetlimit';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  ifPostIsEmpty: false,
  queryParams: ['category'],
  category: null,
  posts: [],
  title: Ember.computed('category', function () {
    const category = parseInt(this.get("category"));
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

  }),
  pengantar: Ember.computed('category', function () {
    const category = parseInt(this.get("category"));
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

  }),
  /**
   * init scrollbar bottom
   * on container post category
   */
  initScrollBottomCategory(){
    const width = Ember.$("#post-main").width();
    Ember.$("#post-main .post-ul-category").slimscroll({
      height: '120px',
      width: width + "px",
      axis: 'x'
    });
  },
  /**
   * called every route leave the post
   * to disable the Ember.$("#post-main .post-ul-category")
   */
  disableScrollBar(){
    Ember.$("#post-main .post-ul-category").off();
  },
  run(){
    const query = {
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT
    };

    const request = this.doFind('post', query);
    this.doRequest(request);
  },
  afterRender(){
    this._super(...arguments);
    this.initScrollBottomCategory();
  },
  onChangeCategory: Ember.observer('category', function () {
    this.set('posts', []);
    this.debug(this.get("category"));
    const category = this.get("category");
    const query = category !== null && category !== undefined ? {
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT,
      category: category
    } : {
      offset: ENV.APP.DEFAULT_OFFSET,
      limit: ENV.APP.DEFAULT_LIMIT
    };
    const request = this.doFind('post', query);
    this.doRequest(request);
  }),
  /**
   * called every this.get("category") changed
   * @param promise
   */
  doRequest(promise){
    const context = this;
    promise.then(function (results) {
      results.length === 0 ? context.set("ifPostIsEmpty", true) : context.set("ifPostIsEmpty", false);
      context.debug(context.get("ifPostIsEmpty"));
      context.set("posts", results);
    });
  },
  actions: {
    onLoadPost(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;
      const category = this.get("category");
      let query;
      if (category !== null && category !== undefined) {
        query = {category: category};
        for (let key in offsetlimit(offset)) {
          query[key] = offsetlimit(offset)[key];
        }
      } else {
        query = offsetlimit(offset);
      }

      this.doFind("post", query).then(function (results) {
        results.forEach(function (item) {
          context.get('posts').pushObject(item);
        });
        results.length === 0 ? context.set("ifPostIsEmpty", true) : context.set("ifPostIsEmpty", false);
      });
    }
  }
});
