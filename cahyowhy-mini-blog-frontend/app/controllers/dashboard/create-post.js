import Ember from 'ember';
import Post from '../../entity/post';
import Imagepost from '../../entity/imagepost';
import Basecontroller from '../base-controller';

let imageposts = [];
export default Ember.Controller.extend(Basecontroller, {
  post: Post.create(),
  imagepost: Imagepost.create(),
  isBtnDisable: Ember.computed.empty("post.post.description", "post.post.title", "post.post.category"),
  emptyField(){
    this.set("post.post.description", "");
    this.set("post.post.title", "");
    this.set("post.post.category", "");
    this.set("imagepost.imageposts_attributes.imageurl", "");
    imageposts = [];
  },
  options: {
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
  },
  init(){
    this._super(...arguments);
  },
  didInsertElement(){
    this._super(...arguments);
  },
  actions: {
    onAddImageToPost(index, id, url){
      this.debug(index + " ", url);
      let img = `<img id="${index}" class="imgPost" src="${url}" style="width: 100%; height: auto"> `;
      let imagepost = this.get('imagepost');
      imagepost.set('imageposts_attributes.imageurl', url);
      imagepost.set('imageposts_attributes.user_id', this.commonService.getId());
      imageposts.push(JSON.parse(JSON.stringify(imagepost.getChildWithSelection(['imageurl', 'user_id']))));

      this.debug(imageposts);
      this.set("post.post.description", this.get("post.post.description") + img);
    },
    onDeleteImage(index, id, src){
      let descriptionhtml = Ember.$(this.get("post.post.description"));
      let editEl = Ember.$("<p>").append(descriptionhtml);
      let image = editEl.find("img#" + index);

      image.removeAttr("style").removeAttr("width").removeAttr("height");
      let imageposts_ = [];
      imageposts.forEach(function (item) {
        if (item.imageurl !== src) {
          imageposts_.push(item);
        }
      });

      imageposts = imageposts_;
      image.remove();
      let newDescriptionHtml = editEl.html();
      this.set("post.post.description", newDescriptionHtml);
    },
    onTypeSomething(value){
      let post = this.get('post');
      post.set('post.description', value);
    },
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        let post = this.get('post');
        let postEl = Ember.$("<p>").append(Ember.$(post.get('post.description')));
        post.set('post.descriptiontext', postEl.text());
        post.set('post.user_id', this.commonService.getId());
        post.set('post.imageposts_attributes', imageposts);
        post.set('post.review', postEl.text().replace(/\s+/g, ' ').trim().substring(0, 150));

        this.doSave("post", post).then(function (response) {
          context.emptyField();
          context.transitionToRoute('post-detail', response.id);
        });
      }
    }
  }
});
