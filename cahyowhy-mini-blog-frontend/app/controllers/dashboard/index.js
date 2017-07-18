import Ember from 'ember';

export default Ember.Controller.extend({
  images: '',
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
  setPost(params){
    const context = this;
    let posts = [];
    params.forEach(function (item) {
      let postHtml = Ember.$(item.description);
      let editEl = Ember.$("<p>").append(postHtml);
      let imgHtml = editEl.find('img')['0'];
      let src = Ember.$(imgHtml).attr('src');
      editEl.find('img').remove();
      let category = function () {
        if (item.category === undefined || item.category === null) {
          return "uncategorized"
        } else {
          return item.category
        }
      };

      let post = {
        id: item.id,
        title: item.title,
        description: editEl.find('p').text().substring(0, 125) + ".....",
        category: category()
      };
      if (src === undefined) {
        post.img = '/img/no-image.png';
      } else {
        post.img = src;
      }

      posts.push(post);
    });
    context.set('posts', posts);
    context.applyLayout();
  }
});
