<template>
    <div>
        <div v-if="isVertical">
            <div class="col-sm-12">
                <div class="row post-vertical">
                    <div class="pull-left">
                        <nuxt-link :to="{name: 'post-detail-id', params:{id: idPost}}">
                            <background :src="img" :classNames="img-content"/>
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
                            <!--{{fav-icon action="onFavouritePost" _id=idPost likes=likes}}-->
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="col-sm-4 sm-margin-b-50 post-item">
                <div class="post-detail-inner">
                    <!--{{fav-icon action="onFavouritePost" _id=idPost likes=likes}}-->
                    <div class="margin-b-20">
                        <div class="wow zoomIn pos-relative">
                            <div class="category-post">
                                <h5>{{category}}</h5></div>
                            <nuxt-link :to="{name: 'post-detail-id', params:{id: idPost}}">
                                <background :src="img" className="img-content"/>
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
    </div>
</template>
<script>
    import background from './background-image.vue';
    export default {
        components: {
            'background': background
        },
        props: ['isVertical', 'likes', 'category', 'img', 'idPost', 'title', 'username', 'createdAt', 'review']
    }
</script>