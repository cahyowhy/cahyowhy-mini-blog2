<template>
    <div class="overflow-hiden">
        <div :class="'emoticons-list collapse '+className" :id="!currentUserLikes ? 'likestatus-'+statusId : ''">
            <img v-for="emoticon in $store.state.statuses.emoticons" :src="'/img/'+ emoticon.name +'.png'" alt="" @click="onSelectEmoticon(emoticon.value)">
        </div>
        <div :data-target="'#likestatus-'+statusId" data-toggle="collapse" class="fadeIn animated">
            <span v-if="currentUserLikes" @click="onSelectEmoticon(1)" class="fa margin-ri5">
      <img :src="thumbIcon" alt="" width="18px">
    </span>
            <i v-else :class="'fa margin-ri5 '+ thumbIcon"></i>
            <h3 class="pull-right">{{detailIcon}}</h3>
        </div>
    </div>
</template>
<script>
export default {
    props: ['statusId', 'likestatuses', 'className'],
    computed: {
        isLogedIn: {
            get() {
                return this.$store.state.auth.isLogedIn;
            }
        },
        thumbIcon: {
            get() {
                if (this.isLogedIn) {
                    const userId = parseInt(this.$store.state.auth.user.id);
                    const context = this;
                    const emoticonUserResponse = function() {
                        let image = context.likestatuses.filter((item) => {
                            return item.user_id === userId
                        })[0].emoticons;

                        return `/img/${image}.png`;
                    };

                    return this.currentUserLikes ? emoticonUserResponse() : "fa-thumbs-o-up";
                }
            }
        },
        detailIcon: {
            get() {
                const userId = parseInt(this.$store.state.auth.user.id);
                const context = this;
                const emoticonUserResponse = function() {
                    return context.likestatuses.filter((item) => {
                        return item.user_id === userId
                    })[0].emoticons;
                };

                return this.currentUserLikes ? emoticonUserResponse() : "Suka";
            }
        }
    },
    data() {
        return {
            currentUserLikes: false
        }
    },
    mounted() {
        $(`#likestatus-${this.statusId}`).on('mouseleave', function() {
            $(this).collapse('hide');
        });
        if (this.isLogedIn) {
            const id = this.$store.state.auth.user.id;
            this.currentUserLikes = this.likestatuses.filter(function(item) {
                return item.user_id === id;
            }).length > 0;
        }
    },
    methods: {
        async onSelectEmoticon(param) {
            if (this.isLogedIn) {
                const query = {
                    user_id: this.$store.state.auth.user.id,
                    status_id: this.statusId,
                    emoticons: parseInt(param),
                };
                const context = this;
                const data = await this.$store.dispatch('statuses/onLiked', { param: query, context: this });
                if (data) {
                    this.currentUserLikes = !this.currentUserLikes;
                    if (result.userlike) {
                        $(`#likestatus-${context.statusId}`).collapse('hide');
                        context.likestatuses.push(query);
                    } else {
                        context.likestatuses = context.likestatuses.filter((item) => {
                            return item.user_id !== userId
                        });
                    }
                }
            } else {
                this.showCustomNotification("Login Dahulu", "Anda harus login terlebih dahulu", "error");
            }
        }
    }
}
</script>