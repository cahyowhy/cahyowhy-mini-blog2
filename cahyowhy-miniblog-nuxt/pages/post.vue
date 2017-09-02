<template>
  <div class="work-section" id="post-main">
    <div class="container content-lg">
      <slider>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" to="post">semua</nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '0' }}">uncategorized
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '1' }}">sains</nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '2' }}">komedi</nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '3' }}">sejarah</nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '4' }}">gosip</nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '5' }}">puisi</nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '6' }}">pribadi</nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '7' }}">mistis</nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '8' }}">berita</nuxt-link>
        </li>
        <li>
          <nuxt-link class="btn btn-sm btn-primary" :to="{path: 'post', query:{ category: '9' }}">teknologi</nuxt-link>
        </li>
      </slider>
      <div class="row margin-b-40">
        <div class="col-sm-12 textCenter">
          <h2>Postingan Miniblog</h2>
          <p>Miniblog, Baca dan Menulis dimari</p>
        </div>
      </div>
      <div id="post-container" class="row post">
        <post-item
          v-for="post in $store.state.posts.postItems"
          :key="post.id"
          :idPost="post.id"
          :username="post.user.username"
          :createdAt="post.created_at"
          :category="post.category"
          :img="post.image"
          :title="post.title"
          :review="post.review"/>
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
  import slider from '~/components/slider-horizontal.vue';
  import postService from '~/service/postService';
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
    components: {
      'slider': slider,
      'post-item': postItem,
      'content-empty': contentEmpty,
    },
    data(){
      return {
        query: {
          offset: process.env.APP.DEFAULT_OFFSET,
          limit: process.env.APP.DEFAULT_LIMIT
        }
      }
    },
    async fetch(context){
      const categoryEmpty = context.query.category !== undefined;
      const query = categoryEmpty ? {
          offset: process.env.APP.DEFAULT_OFFSET,
          limit: process.env.APP.DEFAULT_LIMIT,
          category: context.query.category
        } : {
          offset: process.env.APP.DEFAULT_OFFSET,
          limit: process.env.APP.DEFAULT_LIMIT
        };
      categoryEmpty ? context.store.commit('posts/setPostCategory', null) :
        context.store.commit('posts/setPostCategory', context.query.category);

      await context.store.dispatch('posts/fetchPost', {
        param: query,
        type: "POST_ITEMS"
      });
    },
    methods: {
      async onLoadPost(){
        const postCategory = this.$store.state.posts.postItemCategory;
        this.query.offset = this.query.offset + this.query.limit;
        if (postCategory) this.query.category = postCategory;

        await this.$store.dispatch('posts/fetchPost', {
          param: this.query,
          type: "POST_ITEMS",
          method: 'PUSH'
        });
      }
    }
  }
</script>
