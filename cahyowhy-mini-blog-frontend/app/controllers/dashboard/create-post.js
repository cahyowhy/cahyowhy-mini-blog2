import Ember from 'ember';
import ENV from '../../config/environment';
import Post from '../../entity/post';
import Imagepost from '../../entity/imagepost';
import Basecontroller from '../base-controller';

let imageposts = [];
export default Ember.Controller.extend(Basecontroller, {
  post: Post.create(),
  imagepost: Imagepost.create(),
  url: ENV.APP.API_IMAGE,
  files: [],
  images: [],
  isBtnDisable: Ember.computed.empty("post.post.description", "post.post.title", "post.post.category"),
  emptyField(){
    this.set("post.post.description", "");
    this.set("post.post.title", "");
    this.set("post.post.category", "");
    this.set("imagepost.imageposts_attributes.imageurl", "");
    this.set("files", []);
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
    onAddImageToPost(index, url){
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
      const context = this;
      Ember.$('#modal-delete-photo').modal('show');
      Ember.$('#modal-delete-photo').on('shown.bs.modal', function () {
        Ember.$(this).find('a.delete-photo').on('click', function () {
          let descriptionhtml = Ember.$(context.get("post.post.description"));
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
          context.set("post.post.description", newDescriptionHtml);
          context.doRemove("image", id).then(function () {
            let images = [];
            context.get("images").forEach(function (item) {
              if (item.id !== id) {
                images.push(item);
              }
            });
            context.set("images", images);
            context.set("post.post.description", newDescriptionHtml);
            Ember.$('#modal-delete-photo').modal('hide');
          });
        });
      });
    },
    onTypeSomething(value){
      this.debug(value);
      let post = this.get('post');
      post.set('post.description', value);
    },
    onImageChange(file, idFile, urlFile){ //urlFile, file yg ada di server, sudah di upload
      let reader = new FileReader();
      const context = this;
      reader.onload = function (e) {
        context.get("images").pushObject({
          id: idFile,
          src: e.target.result,
          url: ENV.APP.API_URL + urlFile
        });
      };
      reader.readAsDataURL(file);
    },
    doSave(event){
      const context = this;
      if (this.checkBtnSaveDisabled(event)) {
        let post = this.get('post');
        let postEl = Ember.$("<p>").append(Ember.$(post.get('post.description')));
        post.set('post.user_id', this.commonService.getId());
        post.set('post.imageposts_attributes', imageposts);
        post.set('post.review', postEl.text().replace(/\s+/g, ' ').trim().substring(0, 150));
        post.set('post.descriptiontext', postEl.text());

        this.doSave("post", post).then(function (response) {
          context.emptyField();
          context.transitionToRoute('post-detail', response.id);
        });
      }
    }
  }
});
