import Ember from 'ember';
import mainService from '../routes/main-service';
import Status from '../entity/status';
import ImageStatus from '../entity/imagestatus';
import Statuses from '../entity/statuses';

export default Ember.Component.extend(mainService, {
  images: [],
  imagestatuses: [],
  status: new Status().getInitializeValue(),
  imagestatus: new ImageStatus().getInitializeValue(),
  currentProfile: false,
  isBtnDisable: Ember.computed.empty('status.status.statushtml'),
  isPropertyEmpty: Ember.computed('isBtnDisable', function () {
    /**
     * return true if booth empty
     */
    return this.get('isBtnDisable');
  }),
  isLogedIn: Ember.computed('auth.authentication', function () {
    return this.get("auth.authentication");
  }),
  didInsertElement(){
    this._super(...arguments);
    this.debug(this.get('routeUserId'));
    const condition = !this.get("isTimeline") && this.commonService.getId().toString() === this.get('routeUserId').toString();
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
    window.tinyMCE.activeEditor.setContent('');
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
      const valueText = Ember.$(`${value}`).text().replace(/\s+/g, '').trim().match("^[a-zA-Z]+$");
      const isStatusContainLeter = valueText !== null && Array.isArray(valueText) && valueText[0].lenght !== 0;
      this.set('status.status.statushtml', isStatusContainLeter ? value : "");
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
        imagestatus.imagestatuses_attributes.imageurl = src;
        imagestatus.imagestatuses_attributes.user_id = this.commonService.getId();
        this.get('images').pushObject({id: id, src: src, index: index});
        this.get('imagestatuses').pushObject(JSON.parse(JSON.stringify(new ImageStatus().getChildValue(imagestatus))));
        this.sendAction("action", this.get('isPropertyEmpty'));
      } else {
        const isHasImage = images.any((item) => {
          return item.id === id
        });

        if (isHasImage) {
          this.commonService.showCustomNotification("foto ini sudah ditambahkan ke status anda");
        } else {
          imagestatus.imagestatuses_attributes.imageurl = src;
          imagestatus.imagestatuses_attributes.user_id = this.commonService.getId();
          this.get('images').pushObject({id: id, src: src, index: index});
          this.get('imagestatuses').pushObject(JSON.parse(JSON.stringify(new ImageStatus().getChildValue(imagestatus))));
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
        let statustEl = Ember.$("<p>").append(Ember.$(this.get('status.status.statushtml')));
        this.set('status.status.statustext', statustEl.text());
        this.set('status.status.imagestatuses_attributes', this.get('imagestatuses'));
        this.set('status.status.user_id', this.commonService.getId());
        this.set('status', new Status().getValue(this.get('status')));

        this.doSave("status", this.get('status')).then(function (result) {
          context.doEmptyField();
          context.get("statuses").unshiftObject(result);
        });
      }
    }
  }
});
