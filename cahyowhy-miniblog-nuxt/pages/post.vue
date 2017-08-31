<template>
    <div class="work-section" id="post-main">
        <div class="container content-lg">
            <slider>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">semua</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">uncategorized</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">sains</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">komedi</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">sejarah</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">gosip</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">puisi</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">pribadi</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">mistis</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">berita</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btn btn-sm btn-primary" to="post">teknologi</nuxt-link>
                </li>
            </slider>
            <div class="row margin-b-40">
                <div class="col-sm-12 textCenter">
                    <h2>Postingan Miniblog</h2>
                    <p>Miniblog, Baca dan Menulis dimari</p>
                </div>
            </div>
            <post-item
                    v-for="post in $store.state.posts"
                    :key="post.id"
                    :idPost="post.id"
                    :username="post.user.username"
                    :createdAt="post.created_at"
                    :category="post.category"
                    :img="post.image"
                    :title="post.title"
                    :review="post.review"/>
        </div>
    </div>
</template>

<script>
    import slider from '~/components/slider-horizontal.vue';
    import postService from '~/service/postService';
    import postItem from '~/components/postItem.vue';
    export default {
        components: {
            'slider': slider,
            'post-item': postItem
        },
        async fetch({store}){
            const {data} = await new postService().get();
            store.commit('setPost', data);
            console.log(this);
        },
        mounted(){
            console.log(this);
        }
    }
</script>