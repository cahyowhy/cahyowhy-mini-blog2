import Vuex from 'vuex';
import posts from './modules/posts';
import statuses from './modules/statuses';
import images from './modules/images';
import currentUser from './modules/currentUser';
import user from './modules/entity/user';
import profile from './modules/route/profile';
import notifications from './modules/notifications';

const {state: postsState, mutations:postsMutations, actions:postsActions} = posts;
const {state: statusesState, mutations:statusesMutations, actions:statusesActions} = statuses;
const {state: currentUserState, mutations:currentUserMutations, actions:currentUserActions} = currentUser;
const {state: userState, mutations:userMutations, getters:userGetters} = user;
const {state: profileState, mutations: profileMutation, actions: profileAction} = profile;
const {state: notificationsState, mutations: notificationsMutation, actions: notificationsAction} = notifications;
const {state: imagesState, mutations: imagesMutation, actions: imagesAction} = images;

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
      images: {
        namespaced: true,
        state: imagesState,
        mutations: imagesMutation,
        actions: imagesAction
      },
      notifications: {
        namespaced: true,
        state: notificationsState,
        mutations: notificationsMutation,
        actions: notificationsAction
      },
      statuses: {
        namespaced: true,
        state: statusesState,
        mutations: statusesMutations,
        actions: statusesActions
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
      },
      profile: {
        namespaced: true,
        state: profileState,
        mutations: profileMutation,
        actions: profileAction
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
