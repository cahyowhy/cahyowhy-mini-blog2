<template>
  <div>
    <div :class="'photo-collections '+className">
      <h5 class="photo-collection-title">{{title}}</h5>
      <div class="photo-collection-inner">
        <div class="photo" style="background: white">
          <imageUploader id="photos-create-post"
                         :url="url"
                         className="upload cust-input"/>
          <div class="photo-overlay"></div>
          <i class="ion ion-plus-circled"></i>
        </div>
        <backgroundImage v-for="(image, index) in $store.state.images.imageItems"
                         :key="image.id"
                         :src="image.path.url" className="photo">
          <div class="photo-overlay"></div>
          <a class="delete-photo" @click="onDelImage(index, image.id, image.path.url)"
             :data-target="'#modal-delete-photo-'+id"
             :href="'#modal-delete-photo-'+id" data-toggle="modal">
            <i class="ion ion-close-circled"></i>
          </a>
          <i @click="onAddImage(index, image.id, image.path.url)" class="ion ion-plus-circled"></i>
        </backgroundImage>
      </div>
    </div>
    <div class="modal fade" :id="'modal-delete-photo-'+id" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h3>If you delete this. all your post that depend on this photo will also deleted</h3>
          </div>
          <div class="modal-footer">
            <a class="btn btn-danger delete-photo margin-bot5 ">delete</a>
            <a type="button" class="btn btn-default no-margin" data-dismiss="modal">Close</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import backgroundImage from '~/components/background-image.vue';
  import imageUploader from '~/components/imageUploader.vue';

  export default {
    props: ['title', 'id', 'className'],
    components: {
      backgroundImage,
      imageUploader
    },
    data() {
      return {
        url: process.env.APP.API_IMAGE
      }
    },
    async mounted() {
      const param = {
        user_id: this.$store.state.auth.user.id
      };

      await this.$store.dispatch('images/fetchImages', {param});
    },
    methods: {
      onAddImage(index, id, src) {
        this.$emit('onAddImage', index, id, src);
      },
      onDelImage(index, id, src) {
        console.log('iam here');
        const context = this;
        $(`#modal-delete-photo-${this.id}`).on('shown.bs.modal', function () {
          const modal = $(this);
          modal.find('a.delete-photo').on('click', function () {
            const modal = $(this);
            context.$store.dispatch('images/delete', {param: id, context}).then(function () {
              modal.modal('hide');
              context.$emit('onDelImage', index, id, src);
            });
          });
        });
      }
    }
  }
</script>
