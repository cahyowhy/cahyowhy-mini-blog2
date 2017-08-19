import Ember from 'ember';
import BaseController from '../base-controller';
import ENV from '../../config/environment';
import offsetlimit from '../../entity/offsetlimit';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
  ifPostIsEmpty: Ember.computed('posts', function () {
    this.debug(this.get('posts').length);
    return this.get('posts').length === 0;
  }),
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
  actions: {
    onLoadPost(){
      const context = this;
      offset = offset + ENV.APP.DEFAULT_LIMIT;
      const category = this.get("category");
      let query;
      query = {category: category};
      for (let key in offsetlimit(offset)) {
        query[key] = offsetlimit(offset)[key];
      }

      this.doFind("post", query).then(function (results) {
        results.forEach(function (item) {
          context.get('posts').pushObject(item);
        });
        context.set('ifPostIsEmpty', results.length === 0);
      });
    }
  }
});
