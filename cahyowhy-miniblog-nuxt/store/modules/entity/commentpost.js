const lodash = require('lodash');

const state = () => {
  return {
    commentpost: {
      post_id: "",
      user_id: "",
      comment: "",
    }
  }
};

const getters = {
  commentpost: (state) => {
    return {
      commentpost: lodash.pickBy(state.commentpost, lodash.identity)
    };
  },
  isAnyEmpty: (state) => {
    console.log(state.commentpost);
    return state.commentpost.comment.length === 0;
  },
  commentpostContent: (state) => {
    return lodash.pickBy(state.commentpost, lodash.identity);
  }
};
const mutations = {
  SET_ID(state, {userId, postId}){
    state.commentpost.user_id = userId;
    state.commentpost.post_id = postId;
  },
  CLEAN_COMMENT(state) {
    state.commentpost.comment = "";
  }
};
export default {
  state,
  getters,
  mutations
}
