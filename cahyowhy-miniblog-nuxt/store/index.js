import Vuex from 'vuex';
import posts from './modules/posts';

const {state: postsState, mutations:postsMutations, actions:postsActions} = posts;
const createStore = () => {
    return new Vuex.Store({
        state: {
            posts: [],
        },
        modules:{
            posts:{
                namespaced: true,
                state: postsState,
                mutations: postsMutations,
                actions: postsActions
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