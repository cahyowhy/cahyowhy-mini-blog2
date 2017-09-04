<template>
  <ul class="list-group notif">
    <li class="list-group-item" v-for="notification in $store.state.notifications.notificationItems">
      <a :href="link(notification.link)" target="_blank">
        <div class="pull-left">
          <background className="bg cust-229" :src="imageUrl(notification.userhasresponse.imageurl)"/>
        </div>
        <div class="media-body widthAuto">
          <p class="no-margin-bottom">{{notification.message}}</p>
          <p class="no-margin-bottom">{{notification.created_at}}</p>
        </div>
      </a>
    </li>
    <div class="margin-top30" v-if="$store.state.notifications.isNotificationItemsEmpty">
      <content-empty/>
    </div>
    <div v-else class="btn-wrapper-post margin-top15">
      <a @click="onLoadNotification" class="btn-primary btn-medium btn">Load more</a>
    </div>
  </ul>
</template>

<script>
  import contentEmpty from '~/components/content-empty.vue';
  import background from '~/components/background-image.vue';
  export default {
    components: {
      'content-empty': contentEmpty,
      'background': background
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
    async fetch(context){
      const query = {
        offset: process.env.APP.DEFAULT_OFFSET,
        limit: process.env.APP.DEFAULT_LIMIT,
        user_id: context.params.id
      };

      await context.store.dispatch('notifications/fetchNotifications', {param: query})
    },
    methods: {
      async onLoadNotification(){
        this.query.offset = this.query.offset + this.query.limit;
        await this.$store.dispatch('images/fetchImages', {param: this.query, method: 'PUSH'})
      },
      link(param){
        return `/${param.replace("dashboard", "profile")}`;
      }
    }
  }
</script>
