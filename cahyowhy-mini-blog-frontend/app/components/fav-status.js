import Ember from 'ember';
import mainService from '../routes/main-service';
import Likestatus from '../entity/likestatus';

const lodash = window._;
export default Ember.Component.extend(mainService, {
  emoticons: [],
  isCurrentUserLikeIt: false,
  thumbIcon: Ember.computed('isCurrentUserLikeIt', function () {
    const userId = parseInt(this.commonService.getId());
    const context = this;
    const emoticonUserResponse = function () {
      let image = context.get('likestatuses').filter((item) => {
        return item.user_id === userId
      })[0].emoticons;

      return `/img/${image}.png`;
    };

    return this.get('isCurrentUserLikeIt') ? emoticonUserResponse() : "fa-thumbs-o-up";
  }),
  detailIcon: Ember.computed('isCurrentUserLikeIt', function () {
    const userId = parseInt(this.commonService.getId());
    const context = this;
    const emoticonUserResponse = function () {
      return context.get('likestatuses').filter((item) => {
        return item.user_id === userId
      })[0].emoticons;
    };

    return this.get('isCurrentUserLikeIt') ? emoticonUserResponse() : "Suka";
  }),
  init(){
    this._super(...arguments);
  },
  clearAttributes(){
    this.set('emoticons', []);
    this.set('isCurrentUserLikeIt', false);
  },
  didInsertElement(){
    this._super(...arguments);
    const context = this;
    this.clearAttributes();
    const userId = parseInt(this.commonService.getId());
    const isCurrentUserLikeIt = this.get('likestatuses').filter((item) => {
        return item.user_id === userId
      }).length !== 0;

    this.set('isCurrentUserLikeIt', isCurrentUserLikeIt);
    this.doFind("likestatus", "/emoticons/all").then(function (results) {
      context.set('emoticons', results);
    });

    Ember.$(`#likestatus-${this.get('statusId')}`).on('mouseleave', function () {
      Ember.$(this).collapse('hide');
    });
  },
  actions: {
    onSelectEmoticon(value){
      if (this.get('isLogedIn')) {
        let likestatus = new Likestatus().getInitializeValue();
        const statusId = this.get('statusId');
        const context = this;
        const userId = parseInt(this.commonService.getId());
        const likestatusItem = {
          status_id: statusId,
          user_id: userId,
          emoticons: this.get('emoticons')[value].name
        };

        likestatus.likestatus.status_id = statusId;
        likestatus.likestatus.user_id = userId;
        likestatus.likestatus.emoticons = value;
        likestatus = new Likestatus().getValue(likestatus);
        this.doSave("likestatus", likestatus).then(function (result) {
          if (result.userlike) {
            Ember.$(`#likestatus-${context.get('statusId')}`).collapse('hide');
            context.get('likestatuses').pushObject(likestatusItem);
          } else {
            context.set('likestatuses', context.get('likestatuses').filter((item) => {
              return item.user_id !== userId
            }));
          }

          context.set('isCurrentUserLikeIt', result.userlike);
        });
      } else {
        this.showAlertLogin();
      }
    }
  }
});
