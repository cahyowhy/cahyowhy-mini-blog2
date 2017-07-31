import Ember from 'ember';
import BaseController from '../controllers/base-controller';
import Image from '../entity/image';
import ENV from '../config/environment';

export default Ember.Component.extend(BaseController, {
  images: [],
  didInsertElement(){
    this._super(...arguments);
    this.debug(this.get('userId'));
    let image = Image.create();
    const context = this;
    image.set('image.user_id', this.get('userId'));
    image = image.getChildWithSelection(['user_id']);

    this.doFind('image', image).then(function (results) {
      results.forEach(function (item) {
        context.get('images').pushObject({
          id: item.id,
          src: ENV.APP.API_URL + item.path.url
        });
      });
    })
  },
  actions: {
    onAddImage(index, id, src){
      this.debug("add");
      this.sendAction("onAddImage", index, id, src);
    },
    onDelImage(index, id, src){
      this.debug("del");
      this.sendAction("onDelImage", index, id, src);
    }
  }
});
