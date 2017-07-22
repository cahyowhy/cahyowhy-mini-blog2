import Ember from 'ember';
import ENV from '../../config/environment';
import Post from '../../models/post';
import Basecontroller from '../base-controller';

export default Ember.Controller.extend(Basecontroller, {
  description: "",
  title: "",
  url: ENV.APP.API_IMAGE,
  files: [],
  images: [],
  isBtnDisable: Ember.computed.empty("description", "title"),
  onObjectChange: Ember.observer('description', 'title', function () {
    Post.title = this.get("title");
    Post.description = this.get("description");
  }),
  emptyField(){
    this.set("description","");
    this.set("title","");
    this.set("images","");
  },
  setImages(){
    let images = [];
    const context = this;
    context.imageService.findImageByUserid(context.commonService.getId()).then(function (response) { //set images
      response.forEach(function (item) {
        images.push({id: item.id, src: ENV.APP.API_URL + item.path.url, url: ENV.APP.API_URL + item.path.url});
      });
      context.set('images', images);
    });

    Ember.$('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: 920 / 3
    });
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
      Post.image = `${img}, ${Post.image}`;
      this.set("description", this.get("description") + img);
    },
    onDeleteImage(index, id){
      const context = this;
      let descriptionhtml = Ember.$(this.get("description"));
      let editEl = Ember.$("<p>").append(descriptionhtml);
      let image = editEl.find("img#" + index);
      let imagesearchstring = "";
      Post.image.split(",").forEach(function (item) {
        if(item!==image.removeAttr("style").removeAttr("width").removeAttr("height")[0].outerHTML){
          imagesearchstring += `${item}, ${imagesearchstring}`
        }
      });
      Post.image = imagesearchstring;
      image.remove();
      let newDescriptionHtml = editEl.html();

      this.doRemove("image", id).then(function () {
        let images = [];
        context.get("images").forEach(function (item) {
          if (item.id !== id) {
            images.push(item);
          }
        });
        context.set("images", images);
        context.set("description", newDescriptionHtml);
      });
    },
    onTypeSomething(value){
      this.debug(value);
      this.set("description", value);
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
        Post.user_id = this.localStorage.getItem('user').user.id;
        this.doSave("post", Post).then(function (response) {
          context.emptyField();
          context.transitionToRoute('post-detail', response.id);
        });
      }
    }
  }
});
