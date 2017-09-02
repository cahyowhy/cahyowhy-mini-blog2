<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="status-item" v-bind:id="'status-'+statusId">
    <div class="status-detail">
      <div class="pull-left">
        <background className="cust21" :src="imageUrl(imageProfile)"/>
      </div>
      <div class="media-body">
        <p>{{username}}</p>
        {{{status}}}
        <div v-for="(statusImage, index) in statusImages" class="imagestatuses-wrapper">
          <div v-if="or(eq(statusImagesSize, 2), gte(statusImagesSize, 4))">
            <a v-if="lte(index, 2)"
               v-bind:href="statusImage.imageurl"
               v-bind:data-lightbox="'status-image-'+statusId"
               v-bind:data-title="statusText">
              <div class="col-sm-6  margin-bot30">
                <background :src="statusImage.imageurl" class="item"/>
              </div>
            </a>
            <a v-else-if="eq(index, 3)"
               v-bind:href="statusImage.imageurl" v-bind:data-lightbox="'status-image-'+statusId"
               v-bind:data-title="statusText">
              <div class="col-sm-6  margin-bot30">
                <background :src="statusImage.imageurl" class="item">
                  <div class="item-morethan">
                    <p>
                      {{statusImagesSizeIfGT3}} +
                    </p>
                  </div>
                </background>
              </div>
            </a>
            <a v-else
               v-bind:href="statusImage.imageurl"
               v-bind:data-title="statusText" v-bind:data-lightbox="'status-image-'+statusId"></a>
          </div>
          <!--if image length == 3-->
          <div v-else-if="eq(statusImagesSize, 3)">
            <a v-bind:href="statusImage.imageurl" v-bind:data-lightbox="'status-image-'+statusId"
               v-bind:data-title="statusText">
              <div v-if="lt(index, 2)" class="col-sm-6 margin-bot15">
                <background :src="statusImage.imageurl" class="item"/>
              </div>
              <div v-else class="col-sm-12  margin-bot15">
                <background :src="statusImage.imageurl" class="item margin-top15"/>
              </div>
            </a>
          </div>
          <a v-else v-bind:href="statusImage.imageurl" v-bind:data-lightbox="'status-image-'+statusId"
             v-bind:data-title="statusText">
            <div class="col-sm-12  margin-bot15">
              <background :src="statusImage.imageurl" class="item"/>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="comment-statuses">
      <div class="detailwrapper">
        <div class="pull-left">
          <div v-bind:data-target="'#comment-'+statusId" data-toggle="collapse" class="pull-left margin-ri15">
            <i class="ion-chatbubble ion margin-ri5"></i>
            <h3 class="pull-right">Komentar</h3>
          </div>
          <!--{{fav-status isLogedIn=isLogedIn statusId=statusId likestatuses=likestatuses class="margin-ri15 pull-left"}}-->
        </div>
        <a href="javascript:void(0);" v-bind:data-target="'#comment-'+statusId" data-toggle="collapse"
           class="pull-right"><p class="pull-right">lihat komentar</p></a>
      </div>
      <div v-bind:id="'comment-'+statusId" class="collapse in comment-wrapper">
        <div v-if="isCommentMax" @click="onloadcomment(statusId)" class="more-comment">
          <span class="text-muted">
            lihat komentar sebelumnya
          </span>
        </div>
        <div v-for="comment in commentstatuses" v-bind:id="'user-status-'+comment.id" class="comment-status">
          <div class="pull-left">
            <background className="cust21" :src="imageUrl(comment.user.imageurl)"/>
          </div>
          <div class="media-body">
            <p>{{comment.user.username}}</p>
            <p>{{comment.comment}}</p>
          </div>
        </div>

        <div v-if="$store.state.auth.isLogedIn">
          <!--{{textarea value=comment }}-->
          <textarea class="form-control" placeholder="tulis komentar"></textarea>
          <a v-bind:disabled="isBtnDisable" @click="doSaveComment" class="btn btn-primary pull-right cust-24">Save</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import background from '~/components/background-image.vue';
  export default{
    props: ['id'],
    computed: {
      isBtnDisable: {
        get(){
          return true;
        }
      },
      statusImagesSizeIfGT3: {
        get(){
          return false
        }
      },
      isCommentMax: {
        get(){
          return false;
        }
      }
    },
    components: {
      'background': background
    },
    methods: {
      doSaveComment(){

      },
      onloadcomment(param){

      }
    }
  }
</script>
