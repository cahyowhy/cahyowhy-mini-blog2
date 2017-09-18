<template>
  <div>
    <createStatus :currentProfile="currentProfile"/>
    <div class="status-wrapper">
      <status-item :key="status.id" v-for="(status, index) in $store.state.statuses.statusItems"
                   :username="status.user.username"
                   :count="index" :imageProfile="status.user.imageurl" :statushtml="status.statushtml"
                   :statusText="status.statustext"
                   :statusId="status.id" :statusImages="status.imagestatuses" :likestatuses="status.likestatuses"
                   :commentstatuses="status.commentstatuses"/>
    </div>
    <div v-if="isStatusesEmpty">
      <content-empty/>
    </div>
    <div v-if="!isStatusesEmpty">
      <div class="btn-wrapper-post"><a @click="onLoadStatus" class="btn-primary btn-medium btn">Load more</a>
      </div>
    </div>
  </div>
</template>
<script>
  import statusItem from '~/components/statusItem.vue';
  import createStatus from '~/components/createStatus.vue';
  import contentEmpty from '~/components/content-empty.vue';
  export default {
    components: {
      'status-item': statusItem,
      createStatus,
      'content-empty': contentEmpty
    },
    data() {
      return {
        currentProfile: parseInt(this.$route.params.id) === parseInt(this.$store.state.auth.user.id),
        query: {
          user_id: this.$route.params.id,
          offset: process.env.APP.DEFAULT_OFFSET,
          limit: process.env.APP.DEFAULT_LIMIT,
        }
      }
    },
    computed: {
      isStatusesEmpty: {
        get(){
          return this.$store.state.statuses.statusItems.length === 0 || this.$store.state.statuses.isStatusItemsEmpty;
        }
      }
    },
    async asyncData(context) {
      const query = {
        user_id: context.params.id,
        offset: process.env.APP.DEFAULT_OFFSET,
        limit: process.env.APP.DEFAULT_LIMIT,
      };
      await context.store.dispatch('statuses/fetchStatus', {param: query});
      await context.store.dispatch('statuses/fetchEmoticons');
    },
    methods: {
      async onLoadStatus() {
        this.query.offset = this.query.offset + this.query.limit;
        await this.$store.dispatch('statuses/fetchStatus', {param: this.query, method: "PUSH"})
      }
    }
  }

</script>
