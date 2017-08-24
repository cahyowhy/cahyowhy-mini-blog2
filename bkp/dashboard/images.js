import Ember from 'ember';
import Image from '../../entity/image';
import offsetlimit from '../../entity/offsetlimit';
import ENV from '../../config/environment';
import BaseController from '../base-controller';

let offset = 0;
export default Ember.Controller.extend(BaseController, {
    images: '',
    isContentEmpty: Ember.computed('images', function () {
      return this.get('images').length === 0;
    }),
    actions: {
      onLoadImage(){
        const context = this;
        offset = offset + ENV.APP.DEFAULT_LIMIT;
        let offsetlimit_ = offsetlimit(offset);
        let image = Image.create();
        image.set('image.user_id', this.commonService.getId());
        image = image.getChildWithSelection(['user_id']);
        for (let key in offsetlimit_) {
          image[key] = offsetlimit_[key];
        }

        this.doFind("image", image).then(function (response) {
          if (response.length === 0) {
            context.set('isContentEmpty', true);
          }
          response.forEach(function (item) {
            context.get('images').pushObject({
              id: item.id,
              src: ENV.APP.API_URL + item.path.url
            });
          });
        });
      }
    }
  }
)
;
