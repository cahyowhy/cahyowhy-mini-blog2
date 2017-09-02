<template>
  <div>

  </div>
</template>
<script>
  export default {
    async fetch(context){
      const query = {
        id: context.params.id,
        offset: process.env.APP.DEFAULT_OFFSET,
        limit: process.env.APP.DEFAULT_LIMIT,
      };
      await context.store.dispatch('statuses/fetchStatus', {param: query});
    },
    mounted(){

    }
  }
</script>
