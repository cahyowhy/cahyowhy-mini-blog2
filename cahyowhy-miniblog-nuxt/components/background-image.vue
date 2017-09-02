<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div v-bind:class="classNames" v-bind:style="image">
      <slot/>
    </div>
</template>
<script>
    export default {
        props: ['src', 'className'],
        data(){
            return {
                image: {
                    'background-image': `url("${this.src}")`
                },
                classNames: `${this.className} bg-image-container`
            }
        },
        mounted(){
            const context = this;
            if (this.src === undefined || this.src === null || this.src.length === 0) {
                this.image = {
                    "background-image": `url(${"/no-image.png"})`
                };
            } else {
                $('<img/>').attr('src', this.src).on('load', function () {
                   $(this).remove();
                    context.image = {
                        'background-image': "url(" + context.src + ")"
                    };
                }).on('error', function () {
                    context.image = {
                        "background-image": `url(${"/no-image.png"})`
                    };
                });
            }
        }
    }
</script>
