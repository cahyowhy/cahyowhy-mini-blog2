<template>
  <div id="work" class="create-post margin-top100">
    <div class="width800 content-lg padding0px">
      <div class="row">
        <div class="col-sm-12 sm-margin-b-50 margin-top30">
          <div class="posting">
            <div class="form-group">
              <label>Judul</label>
              <input type="text" class="form-control" id="usr" v-model="$store.state.post.post.title">
            </div>
            <div class="form-group">
              <label for="sel1">Kategori</label>
              <select class="form-control" id="sel1" v-model="$store.state.post.post.category">
                <option :key="postCategory.id" v-for="postCategory in $store.state.posts.categories">
                  {{postCategory.name}}
                </option>
              </select>
            </div>
            <photoCollections id="create-post" title="Foto Anda" @onAddImage="onAddImage" @onDelImage="onDelImage"/>
          </div>
          <!--{{tinymce-editor options=options value=post.post.description onValueChanged=(action (route-action-->
          <!--"onTypeSomething"))}}-->
          <div class="btn-wrapper margin-top30">
            <a :disabled="isBtnDisable" @click="doSave"
               class="btn btn-primary btn-md">Save</a></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import photoCollections from '~/components/photoCollections.vue';

  export default {
    components: {
      photoCollections
    },
    data() {
      return {
        category: ''
      }
    },
    computed: {
      isBtnDisable: {
        get() {
          return false
        }
      }
    },
    async asyncData(context) {
      await context.store.dispatch('posts/fetchPost', {categories: true, param: '/categories/all'})
    },
    methods: {
      doSave () {
      },
      onAddImage() {
      },
      onDelImage() {
      }
    }
  }
</script>
