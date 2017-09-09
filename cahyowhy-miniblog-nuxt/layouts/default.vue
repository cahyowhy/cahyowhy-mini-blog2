<template>
  <div>
    <navbar/>
    <no-ssr>
      <notifications group="info">
        <template slot="body" scope="props">
          <div :class="'cust333 vue-notification '+props.item.type">
            <a class="title titlenotifinfo">
              {{props.item.title}}
            </a>
            <a class="close" @click="props.close">
              <i class="fa fa-fw fa-close"></i>
            </a>
            <div v-html="props.item.text">
            </div>
          </div>
        </template>
      </notifications>
    </no-ssr>
    <nuxt/>
  </div>
</template>

<script>
  import navbar from '~/components/navbar.vue';
  import noSSR from '~/components/noSSR.vue';
  export default{
    components: {
      'navbar': navbar,
      'no-ssr': noSSR
    }
  }
</script>
