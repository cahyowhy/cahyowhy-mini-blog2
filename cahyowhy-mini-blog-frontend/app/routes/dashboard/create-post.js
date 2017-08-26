import Ember from 'ember';
import Post from '../../entity/post';
import Imagepost from '../../entity/imagepost';
import BaseRouter from '../base';

const {computed} = Ember;
export default BaseRouter.extend({
  controller: null,
  imageposts: [],
  token: '',
  post: new Post().getInitializeValue(),
  model(){
    this.imageposts = [];
    return Ember.RSVP.hash({
      postCategories: this.doFind("post", "categories/all"),
      authentication: this.doAuth(this.token)
    });
  },
  beforeModel(transition){
    const token = transition.queryParams.token;
    const userId = transition.queryParams.userId;

    if ((token === null || token === undefined) || (userId === null || userId === undefined)) {
      this.transitionTo('not-found');
    } else {
      this.token = token;
    }
  },
  emptyField(){
    this.controller.set("post.post.description", "");
    this.controller.set("post.post.title", "");
    this.controller.set("post.post.category", "");
    this.controller.set("imagepost.imageposts_attributes.imageurl", "");
    this.imageposts = [];
  },
  afterRender(){
    this._super(...arguments);
    const properties = ["post.post.description", "post.post.title", "post.post.category"];
    this.controller.set('isBtnDisable', computed.allPresent(properties));
  },
  setupController(controller, model){
    if (model.authentication.status === 204) {
      this.controller = controller;
      this.controller.set('postCategories', model.postCategories);
      this.controller.set('imagepost', new Imagepost().getInitializeValue());
      this.controller.set('post', this.post);
      this.controller.set('options', {
        selector: 'textarea',
        branding: false,
        height: "500",
        plugins: 'codesample autolink link',
        codesample_languages: [
          {text: 'HTML/XML', value: 'markup'},
          {text: 'JavaScript', value: 'javascript'},
          {text: 'CSS', value: 'css'},
          {text: 'PHP', value: 'php'},
          {text: 'Ruby', value: 'ruby'},
          {text: 'Python', value: 'python'},
          {text: 'Java', value: 'java'},
          {text: 'C', value: 'c'},
          {text: 'C#', value: 'csharp'},
          {text: 'C++', value: 'cpp'}
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link codesample',
      });
    } else {
      this.transitionTo('login');
    }
  },
  actions: {
    onSelectCategory(value){
      this.controller.set("post.post.category", parseInt(value));
    },
    onAddImageToPost(index, id, url){
      this.debug(index + " ", url);
      let img = `<img id="${index}" class="imgPost" src="${url}" style="width: 100%; height: auto"> `;
      let imagepost = this.controller.get('imagepost');
      imagepost.set('imageposts_attributes.imageurl', url);
      imagepost.set('imageposts_attributes.user_id', this.commonService.getId());
      this.imageposts.push(JSON.parse(JSON.stringify(imagepost.getChildWithSelection(['imageurl', 'user_id']))));

      this.controller.set("post.post.description", this.controller.get("post.post.description") + img);
    },
    onDeleteImage(index, id, src){
      let descriptionhtml = Ember.$(this.controller.get("post.post.description"));
      let editEl = Ember.$("<p>").append(descriptionhtml);
      let image = editEl.find("img#" + index);

      image.removeAttr("style").removeAttr("width").removeAttr("height");
      let imageposts_ = [];
      this.imageposts.forEach(function (item) {
        if (item.imageurl !== src) {
          imageposts_.push(item);
        }
      });

      this.imageposts = imageposts_;
      image.remove();
      let newDescriptionHtml = editEl.html();
      this.controller.set("post.post.description", newDescriptionHtml);
    },
    onTypeSomething(value){
      let post = this.controller.get('post');
      post.set('post.description', value);
    },
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        let post = this.controller.get('post');
        let postEl = Ember.$("<p>").append(Ember.$(post.get('post.description')));
        post.set('post.descriptiontext', postEl.text());
        post.set('post.user_id', this.commonService.getId());
        post.set('post.imageposts_attributes', this.imageposts);
        post.set('post.review', postEl.text().replace(/\s+/g, ' ').trim().substring(0, 150));

        this.doSave("post", post).then(function (response) {
          context.emptyField();
          context.transitionTo('post-detail', response.id);
        });
      }
    }
  }
});
