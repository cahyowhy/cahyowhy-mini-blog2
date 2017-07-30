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
      imageposts.push(JSON.parse(JSON.stringify(imagepost.getChildWithSelection(['imageurl','user_id']))));

      // this.debug(imageposts);
      // this.debug(imagepost);
      // this.debug(imagepost.getChildWithSelection(['imageurl','user_id']));
      // this.debug(JSON.stringify(this.get('imagepost')));
      this.set("post.post.description", this.get("post.post.description") + img);
    },
    onDeleteImage(index, id){
      const context = this;
      let descriptionhtml = Ember.$(this.get("description"));
      let editEl = Ember.$("<p>").append(descriptionhtml);
      let image = editEl.find("img#" + index);

      this.debug(image.attr('src'));
      let imageposts_ = [];
      imageposts.forEach(function (item) {
        if (item.imageurl !== image.attr('src')) {
          imageposts_.push(item);
        }
      });

      imageposts = imageposts_;
      this.debug(imageposts);
      image.remove();
      let newDescriptionHtml = editEl.html();

      this.set("post.post.description", newDescriptionHtml);
      /*this.doRemove("image", id).then(function () {
       let images = [];
       context.get("images").forEach(function (item) {
       if (item.id !== id) {
       images.push(item);
       }
       });
       context.set("images", images);
       context.set("post.post.description", newDescriptionHtml);
       });*/
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
        post.set('post.user_id', this.commonService.getId());
        post.set('post.imageposts_attributes', imageposts);

        this.debug(JSON.stringify(post));
        // this.doSave("post", Post).then(function (response) {
        //   context.emptyField();
        //   context.transitionToRoute('post-detail', response.id);
        // });
      }
    }
  }
});
