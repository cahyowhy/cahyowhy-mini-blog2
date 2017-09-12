<template>
  <div id="fb-root"></div>
</template>
<script>
  export default {
    mounted () {
      $('#post-detail-wrapper').append(`
        <div class="fb-outer">
        <div class="fb-inner">
            <div class="fb-comments" data-href="${window.location}" data-numposts="10" data-width="100%" data-colorscheme="light"></div>
        </div>
        </div>`
      );
    }
  }
</script>
