<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div v-bind:class="classNames" v-bind:style="image">
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
        some(){
        },
        mounted(){
            console.log(this);
            const context = this;
            if (this.src === undefined || this.src === null || this.src.length === 0) {
                this.image = {
                    "background-image": `url(${"/no-image.png"})`
                };
            } else {
                $('<img/>').attr('src', this.image).on('load', function () {
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