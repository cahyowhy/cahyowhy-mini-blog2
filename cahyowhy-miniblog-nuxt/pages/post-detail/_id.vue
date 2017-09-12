<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="post-detail-wrapper">
    <div id="post-detail">
      <article class="article">
        <header class="header">
          <div class="inner">
            <div class="category">{{$store.state.posts.postDetail.category}}</div>
            <h1 class="headline">
              {{$store.state.posts.postDetail.title}}
            </h1>
            <div class="meta">
              <span class="author">by <span
                class="author-name">{{$store.state.posts.postDetail.user.name}}</span></span>
              <span class="pub-date">Posted {{$store.state.posts.postDetail.created_at}}</span>
            </div>
          </div>
        </header>
        <div v-html="$store.state.posts.postDetail.description"></div>
      </article>
      <div class="post-arrow">
        <div v-if="isNextLinkVisible" class="post-right">
          <nuxt-link :to="{name: 'post-detail-id', params:{id: nextPost.id}}" tag="i" class="ion-chevron-right ion">
          </nuxt-link>
          <div class="inner">
            <p>{{nextPost.title}}</p>
            <p>{{nextPost.created_at}}</p>
          </div>
        </div>
        <div v-if="isPrevLinkVisible" class="post-left">
          <nuxt-link :to="{name: 'post-detail-id', params:{id: prevPost.id}}" tag="i" class="ion-chevron-left ion">
          </nuxt-link>
          <div class="inner">
            <p>{{prevPost.title}}</p>
            <p>{{prevPost.created_at}}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="post-detail-comment">
      <div class="comments-container">
        <ul class="list-group">
          <p class="resptext">Responses</p>
          <li v-if="$store.state.auth.isLogedIn" class="list-group-item comment-input">
            <div class="comment-inner">
              <div class="title  pull-left">
                <background className="custom-pp" :src="imageUrl($store.state.auth.user.imageurl)"/>
              </div>
              <div class="contentcomment media-body">
                <textarea class="form-control" v-model="$store.state.commentpost.commentpost.comment"/>
              </div>
            </div>
            <div class="btn-wrapper cust2">
              <a :disabled="$store.getters['commentpost/isAnyEmpty']" class="btn btn-sm btn-primary" @click="doSave">comment</a>
            </div>
          </li>
          <div v-if="$store.state.posts.isCommentPostsEmpty">
            <content-empty/>
          </div>
          <div v-else>
            <li v-for="comment in $store.state.posts.commentposts" v-bind:id="'user-commentpost-'+comment.id"
                class="list-group-item">
              <!--{{fav-icon _id = comment.id likes=comment.likecommentposts action=(route-action "onFavouriteComment")}}-->
              <div class="comment-inner">
                <div class="pull-left">
                  <background :src="imageUrl(comment.user.imageurl)" className="custom-pp"/>
                </div>
                <div class="media-body">
                  <div class="namecomment">
                    <p>{{comment.user.username}}</p>
                  </div>
                  <div class="contentcomment">
                    <p>
                      {{comment.comment}}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div v-if="!$store.state.posts.isCommentPostsEmpty" class="btn-wrapper-post bg-greyYoung padding-bot30">
      <a @click="onLoadcomment"
         class="btn-primary btn-medium btn width800">
        Load more commment</a>
    </div>
    <div class="width920">
      <facebookComment/>
    </div>
  </div>
</template>
<script>
  import postService from '~/service/postService';
  import facebookComment from '~/components/facebookComment.vue';
  import commentpostService from '~/service/commentpostService';
  import contentEmpty from '~/components/content-empty.vue';
  import background from '~/components/background-image.vue';

  export default {
    components: {
      'content-empty': contentEmpty,
      facebookComment,
      'background': background
    },
    async fetch(context) {
      await context.store.dispatch('posts/fetchPost', {
        param: context.params.id.toString(),
        type: "POST_DETAIL"
      });
      await context.store.dispatch('posts/fetchCommentPost', {
        param: {
          post_id: context.params.id,
          offset: process.env.APP.DEFAULT_OFFSET,
          limit: process.env.APP.DEFAULT_LIMIT,
        }
      });

      if (context.store.state.auth.isLogedIn) {
        context.store.commit('commentpost/SET_ID', {
          userId: context.store.state.auth.user.id,
          postId: context.params.id
        })
      }
      context.store.commit('posts/setPostId', context.params.id);
    },
    data(){
      return {
        commentposts: [],
        nextPost: {},
        comment: '',
        prevPost: {},
        query: {
          post_id: this.$route.params.id,
          offset: process.env.APP.DEFAULT_OFFSET,
          limit: process.env.APP.DEFAULT_LIMIT,
        }
      }
    },
    computed: {
      isPrevLinkVisible: {
        get(){
          return this.prevPost !== null;
        }
      },
      isNextLinkVisible: {
        get(){
          return this.nextPost !== null;
        }
      }
    },
    async mounted() {
      const state = this.$store.state.posts;
      const nextPost = await new postService().get("next/" + state.postId);
      const prevPost = await new postService().get("prev/" + state.postId);

      this.nextPost = nextPost.data;
      this.prevPost = prevPost.data;
    },
    methods: {
      async doSave(){
        await this.$store.dispatch('posts/saveCommentPost', {
          context: this,
          payload: this.$store.getters['commentpost/commentpost']
        });

        this.$store.commit('commentpost/CLEAN_COMMENT');
      },
      onLoadcomment(){

      }
    }
  }

</script>
