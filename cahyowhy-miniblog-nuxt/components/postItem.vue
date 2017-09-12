<template>
  <div>
    <div v-if="isVertical" class="col-sm-12">
      <div class="row post-vertical">
        <div class="pull-left">
          <nuxt-link :to="{name: 'post-detail-id', params:{id: idPost}}">
            <background :src="img" :classNames="img-content" />
          </nuxt-link>
        </div>
        <div class="media-body">
          <nuxt-link :to="{name: 'post-detail-id', params:{id: idPost}}">
            <h3>{{title}}</h3>
          </nuxt-link>
          <p class="names">{{username}}, {{createdAt}}</p>
          <p class="text-muted">{{review}}</p>
          <a class="btn btn-default">
            {{category}}
          </a>
          <a class="btn btn-default">
            <favicon :id="idPost" @onLiked="onLiked" :likes="likes" />
          </a>
        </div>
      </div>
    </div>
    <div v-else class="col-sm-4 sm-margin-b-50 post-item animated fadeIn">
      <div class="post-detail-inner">
        <favicon :id="idPost" @onLiked="onLiked" :likes="likes" />
        <div class="margin-b-20">
          <div class="wow zoomIn pos-relative">
            <div class="category-post">
              <h5>{{category}}</h5></div>
            <nuxt-link :to="{name: 'post-detail-id', params:{id: idPost}}">
              <background :src="img" className="img-content" />
            </nuxt-link>
          </div>
        </div>
        <h4>
          <nuxt-link :to="{name: 'post-detail-id', params:{id: idPost}}">
            {{title}}
          </nuxt-link>
        </h4>
        <p class="names">{{username}}, {{createdAt}}</p>
        <p>{{review}}</p>
        <nuxt-link :to="{name: 'post-detail-id', params:{id: idPost}}" class="link">
          Read More
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import background from './background-image.vue';
import favicon from './favicon.vue';
export default {
  components: {
    'background': background,
    favicon
  },
  props: ['isVertical', 'likes', 'category', 'img', 'idPost', 'title', 'username', 'createdAt', 'review'],
  mounted() {
    if (!this.isVertical) {
      this.applyLayout();
    }
  },
  methods: {
    async onLiked() {
      const query = {
        user_id: this.$store.state.auth.user.id,
        post_id: this.idPost
      };

      await this.$store.dispatch('posts/onLiked', { param: query, context: this });
    },
    applyLayout() {
      const container = $('#post-container');
      const context = this;
      $(this.$el).find('*').addClass('opacity-0');
      const $grid = container.imagesLoaded(function() {
        $grid.masonry({
          itemSelector: '.post-item',
          percentPosition: true,
          columnWidth: '.post-item',
        });
        setTimeout(function() {
          $(context.$el).find('*').removeClass('opacity-0').addClass('hidden');
          setTimeout(function() {
            $(context.$el).find('*').removeClass('hidden');
          }, 500);
        }, 500);
      });

      $grid.masonry('reloadItems');
    }
  }
}

</script>
