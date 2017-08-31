import Ember from 'ember';
import Post from '../../entity/post';
import Imagepost from '../../entity/imagepost';
import BaseRouter from '../base';

const {computed} = Ember;
export default BaseRouter.extend({
  controller: null,
  imageposts: [],
  post: new Post().getInitializeValue(),
  model(){
    this.imageposts = [];
    return Ember.RSVP.hash({
      postCategories: this.doFind("post", "categories/all"),
      authentication: this.doAuth()
    });
  },
  emptyField(){
    this.controller.set("post.post.description", "");
    this.controller.set("post.post.title", "");
    this.controller.set("post.post.category", "");
    this.controller.set("imagepost.imageposts_attributes.imageurl", "");
    this.imageposts = [];
    window.tinyMCE.activeEditor.setContent('');
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
    onSelectCategory(event){
      this.debug('shit iam here' + event.target.value);
      this.controller.set("post.post.category", parseInt(event.target.value));
    },
    onAddImageToPost(index, id, url){
      this.debug(index + " ", url);
      let img = `<img id="${index}" class="imgPost" src="${url}" style="width: 100%; height: auto"> `;
      this.controller.set('imagepost.imageposts_attributes.imageurl', url);
      this.controller.set('imagepost.imageposts_attributes.user_id', this.commonService.getId());
      this.imageposts.push(JSON.parse(JSON.stringify(new Imagepost().getChildValue(this.controller.get('imagepost')))));

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
      this.controller.set('post.post.description', value);
    },
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        let postEl = Ember.$("<p>").append(Ember.$(this.controller.get('post.post.description')));
        this.controller.set('post.post.descriptiontext', postEl.text());
        this.controller.set('post.post.user_id', this.commonService.getId());
        this.controller.set('post.post.imageposts_attributes', this.imageposts);
        this.controller.set('post.post.review', postEl.text().replace(/\s+/g, ' ').trim().substring(0, 150));

        const post = new Post().getValue(this.controller.get('post'));
        this.doSave("post", post).then(function (response) {
          context.emptyField();
          context.transitionTo('post-detail', response.id);
        });
      }
    }
  }
});
