<template>
  <div v-if="currentProfile">
    <photoCollections id="create-post" title="Foto Anda" @onAddImage="onAddImage" @onDelImage="onDelImage"/>
    <div class="create-status">
      <div class="pull-left">
        <backgroundImage className="cust21" :src="imageUrl(imageProfile)"/>
      </div>
      <div class="media-body">
        <noSSR>
          <tinymce id="create-post" :options="options" :v-model="content"
                   @change="onTypeContent"></tinymce>
        </noSSR>
        <div class="add-photo-to-status">
          <backgroundImage
            v-for="image in images"
            :key="image.id"
            className="photo-item" :src=image.src>
            <i @click="onDeleteStatusPhoto(image.id)" class="ion ion-close-circled"></i>
          </backgroundImage>
        </div>
        <a :disabled="isBtnDisable" @click="doSave" class="btn btn-primary margin-ri15">Update status</a>
        <a class="btn btn-primary"><i class="ion ion-camera"></i>Tambah foto</a>
      </div>
    </div>
  </div>
</template>
<script>
  import photoCollections from '~/components/photoCollections.vue'
  import backgroundImage from '~/components/background-image.vue'
  import noSSR from '~/components/noSSR.vue'
  export default {
    props: ['currentProfile'],
    components: {
      noSSR,
      photoCollections,
      backgroundImage
    },
    mounted() {
      this.$store.commit('status/SET_USER_ID', this.$store.state.auth.user.id)
    },
    data() {
      return {
        imagestatus: [],
        options: {
          selector: 'textarea',
          branding: false,
          height: "54",
          menubar: false,
          statusbar: false,
          toolbar: false
        },
        imageProfile: this.$store.state.auth.user.imageurl,
        images: [],
      }
    },
    computed: {
      isBtnDisable: {
        get() {
          return this.$store.getters['status/isAnyEmpty']
        }
      },
      content: {
        get() {
          return this.$store.getters['status/statusHtml'];
        },
        set(value) {
          this.$store.commit('status/SET_DESCRIPTION', value);
        }
      }
    },
    methods: {
      async doSave() {
        const statusEl = $("<p>").append($(this.$store.getters['status/statusHtml']));
        this.$store.commit('status/SET_STATUS_TEXT', statusEl.text());
        const data = await this.$store.dispatch('statuses/save', {
          context: this,
          payload: this.$store.getters['status/status']
        })
        if (data.httpstatus === 201) {
          this.$store.commit('status/CLEAN_STATUS');
          this.images = [];
          tinymce.activeEditor.execCommand('mceSetContent', false, '');
        }
      },
      addImage(index, id, src) {
        this.images.push({id: id, src: src, index: index})
        this.$store.commit('status/PUSH_IMAGESTATUS', {
          imageurl: src, user_id: parseInt(this.$store.state.auth.user.id), id: id
        })
      },
      onAddImage(index, id, src) {
        if (this.images.length === 0) {
          this.addImage(index, id, src);
        } else {
          const isHasImage = this.images.filter((item) => {
              return parseInt(item.id) === parseInt(id)
            }).length > 0;

          if (isHasImage) {
            this.showCustomNotification('Foto sudah ada', 'foto ini sudah ditambahkan ke status anda', 'error');
          } else {
            this.addImage(index, id, src);
          }
        }
      },
      onDelImage(index = null, id, src = null) {
        this.deleteImage(id)
      },
      onDeleteStatusPhoto(id) {
        this.deleteImage(id)
      },
      onTypeContent(editor = null, content) {
        this.$store.commit('status/SET_DESCRIPTION', content);
      },
      deleteImage(id) {
        this.$store.commit('status/DELETE_IMAGESTATUS_ITEM', parseInt(id))
        this.images = this.images.filter(function (item) {
          return parseInt(item.id) !== parseInt(id);
        });
      }
    }
  }
</script>
