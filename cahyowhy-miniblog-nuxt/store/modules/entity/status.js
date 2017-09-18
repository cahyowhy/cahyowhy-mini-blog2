const lodash = require('lodash');

const state = () => {
  return {
    status: {
      user_id: '',
      statustext: "",
      statushtml: "",
      imagestatuses_attributes: []
    }
  }
};

const getters = {
  status: (state) => {
    state.imagestatuses_attributes = state.status.imagestatuses_attributes.map(function (item) {
      delete item.id
      return item
    });

    return {
      status: lodash.pickBy(state.status, lodash.identity)
    };
  },
  isAnyEmpty: (state) => {
    return state.status.statushtml.length === 0;
  },
  statusContent: (state) => {
    state.imagestatuses_attributes = state.status.imagestatuses_attributes.map(function (item) {
      delete item.id
      return item
    });

    return lodash.pickBy(state.status, lodash.identity);
  },
  statusHtml: (state) => {
    return state.status.statushtml;
  },
  imagestatusDescription: (state) => {
    return JSON.parse(`${JSON.stringify(state.status.imagestatuses_attributes)}`);
  }
};
const mutations = {
  SET_USER_ID(state, payload) {
    state.status.user_id = payload;
  },
  SET_STATUS_TEXT(state, payload) {
    state.status.statustext = payload;
  },
  SET_DESCRIPTION(state, payload) {
    state.status.statushtml = payload;
  },
  ADD_DESCRIPTION(state, payload) {
    state.status.statushtml = state.status.statushtml + payload;
  },
  CLEAN_STATUS(state){
    state.status.statushtml = "";
    state.status.statushtml = "";
    state.status.imagestatuses_attributes = [];
  },
  PUSH_IMAGESTATUS(state, payload) {
    state.status.imagestatuses_attributes = state.status.imagestatuses_attributes.concat(payload);
  },
  DELETE_IMAGESTATUS_ITEM(state, param) {
    state.status.imagestatuses_attributes = state.status.imagestatuses_attributes.filter(function (item) {
      return parseInt(item.id) !== parseInt(param)
    });
  }
};
export default {
  state,
  getters,
  mutations
}
