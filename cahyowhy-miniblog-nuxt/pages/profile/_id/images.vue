<template>
  <div class="work-section width800" id="work">
    <div class="container content-lg padding0px width800">
      <div id="image-container" class="post">
        <div class="col-sm-4" v-for="image in $store.state.images.imageItems">
          <a :href="image.path.url" data-lightbox="user-image">
            <background :src="image.path.url" className="inner"/>
          </a>
        </div>
      </div>
      <div v-if="$store.state.images.isImageEmpty">
        <content-empty/>
      </div>
      <div v-else>
        <div class="btn-wrapper-post"><a @click="onLoadImages" class="btn-primary btn-medium btn">Load more</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import contentEmpty from '~/components/content-empty.vue';
  import background from '~/components/background-image.vue';
  export default {
    data(){
      return {
        query: {
          offset: process.env.APP.DEFAULT_OFFSET,
          limit: process.env.APP.DEFAULT_LIMIT,
          user_id: this.$route.params.id
        }
      }
    },
    async fetch(context){
      const query = {
        offset: process.env.APP.DEFAULT_OFFSET,
        limit: process.env.APP.DEFAULT_LIMIT,
        user_id: context.params.id
      };
      await context.store.dispatch('images/fetchImages', {param: query});
    },
    components: {
      'content-empty': contentEmpty,
      'background': background
    },
    methods: {
      async onLoadImages(){
        this.query.offset = this.query.offset + this.query.limit;
        await this.$store.dispatch('images/fetchImages', {param: this.query, method: 'PUSH'})
      }
    }
  }
</script>
