import Vuex from 'vuex';
import posts from './modules/posts';
import currentUser from './modules/currentUser';
import user from './modules/entity/user';

const {state: postsState, mutations:postsMutations, actions:postsActions} = posts;
const {state: currentUserState, mutations:currentUserMutations, actions:currentUserActions} = currentUser;
const {state: userState, mutations:userMutations, getters:userGetters} = user;
const createStore = () => {
  return new Vuex.Store({
    state: {},
    modules: {
      posts: {
        namespaced: true,
        state: postsState,
        mutations: postsMutations,
        actions: postsActions
      },
      auth: {
        namespaced: true,
        state: currentUserState,
        mutations: currentUserMutations,
        actions: currentUserActions
      },
      user: {
        namespaced: true,
        state: userState,
        mutations: userMutations,
        getters: userGetters
      }
    },
    mutations: {
      pushPost (state, payloads) {
        payloads.forEach(function (item) {
          state.posts.push(item)
        });
      },
      setPost(state, payloads){
        state.posts = payloads;
      }
    }
  })
};
export default createStore
