import Vuex from 'vuex';
const createStore = () => {
    return new Vuex.Store({
        state: {
            posts: [],
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