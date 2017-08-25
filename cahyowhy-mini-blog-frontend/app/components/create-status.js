import Ember from 'ember';
import mainService from '../routes/main-service';
import Status from '../entity/status';
import ImageStatus from '../entity/imagestatus';
import Statuses from '../entity/statuses';

export default Ember.Component.extend(mainService, {
  images: [],
  imagestatuses: [],
  status: Status.create(),
  imagestatus: ImageStatus.create(),
  currentProfile: false,
  isBtnDisable: Ember.computed.empty('status.status.statushtml'),
  isPropertyEmpty: Ember.computed('isBtnDisable', function () {
    /**
     * return true if booth empty
     */
    return this.get('isBtnDisable');
  }),
  isLogedIn: Ember.computed('authentication', function () {
    return this.get("authentication");
  }),
  didInsertElement(){
    this._super(...arguments);
    this.debug(this.get('routeUserId'));
    const condition = !this.get("isTimeline") && this.commonService.getId() === this.get('routeUserId').toString();
    condition ? this.set("currentProfile", true) : this.set("currentProfile", false);

    if (this.get("isTimeline")) {
      this.set("statuses", Statuses.statuses);
      this.set("currentProfile", true);
    }
  },
  willDestroyElement(){
    this._super(...arguments);
    this.doEmptyField();
  },
  doEmptyField(){
    this.set('status.status.statushtml', '');
    this.set('status.status.statustext', '');
    this.set('status.status.imagestatuses_attributes', []);
    this.set('imagestatus.imagestatuses_attributes.imageurl', []);
    this.set('images', []);
    this.set('imagestatuses', []);
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
      const valueText = Ember.$(`${value}`).text().replace(/\s+/g, '').trim().match("^[a-zA-Z]+$");
      const isStatusContainLeter = valueText !== null && Array.isArray(valueText) && valueText[0].lenght !== 0;
      isStatusContainLeter ? status.set('status.statushtml', value) : status.set('status.statushtml', '');
      this.debug(valueText);
      this.sendAction("action", this.get('isPropertyEmpty'));
    },
    onDeleteStatusPhoto(id){
      this.set('images', this.deleteImage(id));
      this.sendAction("action", this.get('isPropertyEmpty'));
    },
    /**
     * action invoke after user add image
     * to photocollections image
     * @param{int} index
     * @param{int} id
     * @param{string} src
     */
    onAddImage(index, id, src){
      let imagestatus = this.get('imagestatus');
      let images = this.get('images');
      if (images.length === 0) {
        imagestatus.set('imagestatuses_attributes.imageurl', src);
        imagestatus.set('imagestatuses_attributes.user_id', this.commonService.getId());
        this.get('images').pushObject({id: id, src: src, index: index});
        this.get('imagestatuses').pushObject(JSON.parse(JSON.stringify(imagestatus.getChildWithSelection(['imageurl', 'user_id']))));
        this.sendAction("action", this.get('isPropertyEmpty'));
      } else {
        const isHasImage = images.any((item) => {
          return item.id === id
        });

        if (isHasImage) {
          this.commonService.showCustomNotification("foto ini sudah ditambahkan ke status anda");
        } else {
          imagestatus.set('imagestatuses_attributes.imageurl', src);
          imagestatus.set('imagestatuses_attributes.user_id', this.commonService.getId());
          this.get('images').pushObject({id: id, src: src, index: index});
          this.get('imagestatuses').pushObject(JSON.parse(JSON.stringify(imagestatus.getChildWithSelection(['imageurl', 'user_id']))));
        }
        this.sendAction("action", this.get('isPropertyEmpty'));
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
        status.set('status.imagestatuses_attributes', this.get('imagestatuses'));
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
