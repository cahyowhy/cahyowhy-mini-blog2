<template>
  <div class="work-section width800" id="work">
    <div class="content-lg padding0px width800 margin-bot50">
      <div id="post-container" class="post">
        <div class="button-fly-wrapper">
          <div v-if="$store.state.auth.isLogedIn" class="btn-wrapper">
            <nuxt-link to="/create-post" tag="a" class="btn btn-lg btn-primary pull-right cust-226">
              <i class="ion-plus-round ion"></i>
            </nuxt-link>
          </div>
        </div>
        <post-item v-for="post in $store.state.posts.postItems"
                   :key="post.id"
                   :idPost="post.id"
                   :username="post.user.username"
                   :createdAt="post.created_at"
                   :category="post.category"
                   :img="post.image"
                   :title="post.title"
                   :likes="post.likeposts"
                   :review="post.review"
        />
      </div>
      <div v-if="isPostsEmpty">
        <content-empty/>
      </div>
      <div v-if="!isPostsEmpty">
        <div class="btn-wrapper-post"><a @click="onLoadPost" class="btn-primary btn-medium btn">Load more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import postItem from '~/components/postItem.vue';
  import contentEmpty from '~/components/content-empty.vue';
  export default {
    computed: {
      isPostsEmpty: {
        get(){
          return this.$store.state.posts.postItems.length === 0 || this.$store.state.posts.isPostItemEmpty;
        }
      }
    },
    async fetch(context){
      const query = {
        offset: process.env.APP.DEFAULT_OFFSET,
        limit: process.env.APP.DEFAULT_LIMIT,
        user_id: context.params.id
      };

      await context.store.dispatch('posts/fetchPost', {
        param: query,
        type: "POST_ITEMS"
      });
    },
    data(){
      return {
        query: {
          offset: process.env.APP.DEFAULT_OFFSET,
          limit: process.env.APP.DEFAULT_LIMIT,
          user_id: this.$route.params.id
        }
      }
    },
    components: {
      'post-item': postItem,
      'content-empty': contentEmpty
    },
    methods: {
      async onLoadPost(){
        this.query.offset = this.query.offset + this.query.limit;
        await this.$store.dispatch('posts/fetchPost', {
          param: this.query,
          type: "POST_ITEMS",
          method: 'PUSH'
        });
      }
    }
  }
</script>
