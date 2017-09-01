<template>
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
              <span class="author">by <span class="author-name">{{$store.state.posts.postDetail.user.name}}</span></span>
              <span class="pub-date">Posted {{$store.state.posts.postDetail.created_at}}</span>
            </div>
          </div>
        </header>
        <div v-html="$store.state.posts.postDetail.description"> </div>
      </article>
      <div class="post-arrow">
        <div class="post-right">
          <!-- <nuxt-link :to="{name: 'post-detail-id', params:{id: nextPost.id}}" tag="i" class="ion-chevron-right ion">
          </nuxt-link> -->
          <div class="inner">
            <!-- <p>{{nextPost.title}}</p>
            <p>{{nextPost.created_at}}</p> -->
          </div>
        </div>
        <div class="post-left">
          <!-- <nuxt-link :to="{name: 'post-detail-id', params:{id: prevPost.id}}" tag="i" class="ion-chevron-left ion">
          </nuxt-link> -->
          <div class="inner">
            <!-- <p>{{prevPost.title}}</p>
            <p>{{prevPost.created_at}}</p> -->
          </div>
        </div>
      </div>
    </div>
    <!-- {{#unless commentDisabled }}
    <div id="post-detail-comment">
      <div class="comments-container">
        <ul class="list-group">
          <p class="resptext">Responses</p>
          <li class="list-group-item comment-input">
            <div class="comment-inner">
              <div class="title  pull-left">
                {{background-image-container class="custom-pp" src=(image-url-helper imageProfile)}}
              </div>
              <div class="contentcomment media-body">
                {{textarea class="form-control" value=commentpost.commentpost.comment}}
              </div>
            </div>
            <div class="btn-wrapper cust2"><a class="btn btn-sm btn-primary" disabled={{isBtnDisabled}} onclick={{route-action
              'doSave'}}>comment</a></div>
          </li>
          {{#if isCommentEmpty}}
            {{content-is-empty}}
          {{else}}
            {{#each comments as |comment|}}
              <li id="user-commentpost-{{comment.id}}" class="list-group-item">
                {{fav-icon _id = comment.id likes=comment.likecommentposts action=(route-action "onFavouriteComment")}}
                <div class="comment-inner">
                  <div class="pull-left">
                    {{background-image-container src=(image-url-helper comment.user.imageurl) class="custom-pp"}}
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
            {{/each}}
          {{/if}}
        </ul>
      </div>
    </div>
    <div class="btn-wrapper-post">
      {{#if isLoadCommentBtnDisplayed}}
        <a onclick={{route-action "onloadcomment"}} class="btn-primary btn-medium btn width800 margin-bottom-30px">Load more
          commment</a>
      {{/if}}
    </div>
  {{/unless}} -->
    <div class="width920">
      <!-- {{facebook-comment fbAPPID=fbAPPID url=url}} -->
    </div>
  </div>
</template>
<script>
import postService from '~/service/postService';
import commentpostService from '~/service/commentpostService';

export default {
  async fetch(context) {
    // await context.store.dispatch('posts/fetchPost', {
    //   param: context.params.id,
    //   type: "POST_DETAIL"
    // });
    await new postService().get(context.params.id).then(function(data){
    	context.store.commit('posts/updatePostDetail', data.data);
    	console.log("adwadwadwadwadawd");
    	console.log(data);
    });
    context.store.commit('posts/setPostId', context.params.id);
  },
  // async mounted() {
  //   const state = this.$store.state.posts;
  //   console.log(state);
  //   // const nextPost = await new postService().get("next/" + state.postId);
  //   // const prevPost = await new postService().get("prev/" + state.postId);

  //   // // process.env.APP.API_POST
  //   // const queryparamCommentpost = {
  //   // 	post_id: state.postId,
  //   // 	offset: process.env.APP.DEFAULT_OFFSET,
  //   // 	limit: process.env.APP.DEFAULT_LIMIT
  //   // }
  //   // const commentPost = await new commentpostService().get(queryparamCommentpost);
  //   // console.log(nextPost);
  //   // console.log(prevPost);
  //   // console.log(queryparamCommentpost);
  // }
}

</script>
