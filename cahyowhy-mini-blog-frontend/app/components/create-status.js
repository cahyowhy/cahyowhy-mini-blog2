import Ember from 'ember';
import BaseController from '../controllers/base-controller';
import Status from '../entity/status';
import ImageStatus from '../entity/imagestatus';
import Statuses from '../entity/statuses';

let imagestatuses = [];
export default Ember.Component.extend(BaseController, {
  images: [],
  status: Status.create(),
  imagestatus: ImageStatus.create(),
  isBtnDisable: Ember.computed.empty('status.status.statushtml'),
  didInsertElement(){
    if (this.get("isTimeline")) {
      this.set("statuses", Statuses.statuses);
    }
    this._super(...arguments);
  },
  doEmptyField(){
    this.set('status.status.statushtml', '');
    this.set('status.status.statustext', '');
    this.set('status.status.imagestatuses_attributes', []);
    this.set('images', []);
    imagestatuses = [];
  },
  options: {
    selector: 'textarea',
    branding: false,
    height: "54",
    menubar: false,
    statusbar: false,
    toolbar: false
  },
  deleteImage(id){
    let images = [];
    this.get("images").forEach(function (item) {
      if (item.id !== id) {
        images.push(item);
      }
    });

    return images;
  },
  actions: {
    onTypeSomething(value){
      let status = this.get('status');
      status.set('status.statushtml', value);
    },
    onDeleteStatusPhoto(id){ //delete the images[] property
      this.set('images', this.deleteImage(id));
    },
    onAddImage(index, id, src){ //action from photocollection
      let imagestatus = this.get('imagestatus');
      let images = this.get('images');
      if (images.length === 0) {
        imagestatus.set('imagestatuses_attributes.imageurl', src);
        imagestatus.set('imagestatuses_attributes.user_id', this.commonService.getId());
        this.get('images').pushObject({id: id, src: src, index: index});
        imagestatuses.push(JSON.parse(JSON.stringify(imagestatus.getChildWithSelection(['imageurl', 'user_id']))));
      } else {
        let isHasImage = images.any((item) => {
          return item.id === id
        });
        if (isHasImage) {
          this.commonService.showCustomNotification("foto ini sudah ditambahkan ke status anda");
        } else {
          imagestatus.set('imagestatuses_attributes.imageurl', src);
          imagestatus.set('imagestatuses_attributes.user_id', this.commonService.getId());
          this.get('images').pushObject({id: id, src: src, index: index});
          imagestatuses.push(JSON.parse(JSON.stringify(imagestatus.getChildWithSelection(['imageurl', 'user_id']))));
        }
      }
    },
    onDelImage(index, id, src){ //action from photocollection
      this.set('images', this.deleteImage(id));
    },
    doSave(event){
      if (this.checkBtnSaveDisabled(event)) {
        const context = this;
        let status = this.get('status');
        let statustEl = Ember.$("<p>").append(Ember.$(status.get('status.statushtml')));
        status.set('status.statustext', statustEl.text());
        status.set('status.imagestatuses_attributes', imagestatuses);
        status.set('status.user_id', this.commonService.getId());

        context.debug(JSON.stringify(status));
        this.doSave("status", status).then(function (result) {
          context.doEmptyField();
          context.get("statuses").unshiftObject(result);
        });
      }
    }
  }
});
