<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="work" class="create-post">
    <div class="container content-lg paddingbot0px width800">
      <div class="row">
        <div class="col-sm-12 sm-margin-b-50 margin-top30 dashboard-index">
          <div class="header-profile">
            <div class="pull-left">
              <i v-if="isCurrentUser" class="ion ion-android-camera">
                <!--{{photocropper-uploader-galleries id="photos" action=(route-action "doUpload")}}-->
              </i>
              <background :src="imageUrl($store.state.profile.user.imageurl)" className="img-profile-dashboard"/>
            </div>
            <div class="media-body">
              <div class="inner">
                <h1>{{$store.state.profile.user.name}}</h1>
                <p>{{$store.state.profile.user.username}}</p>
                <a v-if="isAnotherUser" @click="onFollowing" class="btn btn-primary">{{btnFollow}}</a>
                <a class="btn btn-default">{{$store.state.profile.user.total_follower}} follower</a>
                <a class="btn btn-default">{{$store.state.profile.user.total_following}} following</a>
              </div>
            </div>
          </div>
          <div class="navigation">
            <nuxt-link :to="{name:'profile-id', params:{id: idUser}}" tag="div"
                       v-bind:class="'textCenter '+ navigationClass">
              <i class="ion ion-compose">
                <p>status</p>
              </i>
            </nuxt-link>
            <nuxt-link v-if="isCurrentUser" :to="{name:'profile-id-notifications', params:{id: idUser}}" tag="div"
                       v-bind:class="'textCenter '+ navigationClass">
              <i class="ion ion-earth">
                <p>pemberitahuan</p>
              </i>
            </nuxt-link>
            <nuxt-link :to="{name:'profile-id-posts', params:{id: idUser}}"
                       v-bind:class="'textCenter '+ navigationClass"
                       tag="div">
              <i class="ion ion-ios-bookmarks-outline">
                <p>post</p>
              </i>
            </nuxt-link>
            <nuxt-link :to="{name:'profile-id-images', params:{id: idUser}}"
                       v-bind:class="'textCenter '+ navigationClass" tag="div">
              <i class="ion ion-images">
                <p>gallery</p>
              </i>
            </nuxt-link>
            <nuxt-link :to="{name:'profile-id-settings', params:{id: idUser}}" v-if="isCurrentUser"
                       v-bind:class="'textCenter '+ navigationClass" tag="div">
              <i class="ion ion-android-settings">
                <p>pengaturan</p>
              </i>
            </nuxt-link>
          </div>
          <div class="content overflow-hiden padtopbot15px">
            <nuxt-child/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import background from '~/components/background-image.vue';
  export default {
    components: {
      'background': background
    },
    validate ({params}) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    async fetch(context){
      await context.store.dispatch('profile/fetchProfile', context.params.id);
    },
    data(){
      return {
        idUser: this.$store.state.profile.id
      }
    },
    computed: {
      btnFollow: {
        get(){
          return "follow";
        }
      },
      isCurrentUser: {
        get(){
          const state = this.$store.state;
          return state.auth.isLogedIn && parseInt(this.$route.params.id) === state.auth.user.id;
        }
      },
      navigationClass: {
        get(){
          return this.isCurrentUser ? "col-sm-5ths" : "col-sm-4";
        }
      },
      isAnotherUser: {
        get(){
          const state = this.$store.state;
          return state.auth.isLogedIn && parseInt(this.$route.params.id) !== state.auth.user.id;
        }
      }
    },
    mounted(){

    },
    methods: {
      onFollowing(){

      }

    }
  }
</script>
