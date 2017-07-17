import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Controller.extend({
    setImages() {
        const context = this;
        this.imageService.findImageByUserid(this.commonService.getId()).then(function(response) {
            let images = [];
            response.forEach(function(item) {
                images.push({
                    id: item.id,
                    src: ENV.APP.API_URL + item.path.url
                });
            });
            context.set('images', images);
        });
    }
});
