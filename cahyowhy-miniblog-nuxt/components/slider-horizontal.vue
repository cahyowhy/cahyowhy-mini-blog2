<template>
    <ul class="post-ul-category">
        <slot></slot>
    </ul>
</template>
<script>
    export default {
        props: ['height'],
        mounted(){
            const width = $(this.$el).width();
            $(this.$el).slimscroll({
                width: width + "px",
                height: this.height + "px",
                axis: 'x'
            });
        }
    }
</script>