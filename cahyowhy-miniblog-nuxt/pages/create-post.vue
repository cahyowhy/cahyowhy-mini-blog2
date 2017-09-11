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
            <photoCollections id="create-post" title="Foto Anda" @onAddImage="onAddImage" @onDelImage="onDelImage" />
          </div>
          <noSSR>
            <tinymce id="create-post" :options="options" :content="$store.state.post.post.description" 
            v-model="$store.state.post.post.description"
            @change="onTypeContent"></tinymce>
          </noSSR>
          <!--{{tinymce-editor options=options value=post.post.description onValueChanged=(action (route-action-->
          <!--"onTypeSomething"))}}-->
          <div class="btn-wrapper margin-top30">
            <a :disabled="isBtnDisable" @click="doSave" class="btn btn-primary btn-md">Save</a></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import photoCollections from '~/components/photoCollections.vue';
import noSSR from '~/components/noSSR.vue';

export default {
  components: {
    photoCollections,
    noSSR
  },
  data() {
    return {
      options: {
        selector: 'textarea',
        branding: false,
        height: "500",
        plugins: 'codesample autolink link',
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
          { text: 'PHP', value: 'php' },
          { text: 'Ruby', value: 'ruby' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C', value: 'c' },
          { text: 'C#', value: 'csharp' },
          { text: 'C++', value: 'cpp' }
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link codesample',
      },
      imagepost: []
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
    await context.store.dispatch('posts/fetchPost', { categories: true, param: '/categories/all' })
  },
  methods: {
    doSave() {

    },
    onAddImage(index, id, src) {
      let img = `<img id="${index}" class="imgPost" src="${src}" style="width: 100%; height: auto"> `;
      this.imagepost.push({
        imageurl: src,
        user_id: this.$store.state.auth.user.id
      });
      console.log(img);
      this.$store.commit('post/ADD_DESCRIPTION', img);
    },
    onDelImage(index, id, src) {
      let descriptionhtml = this.$store.getters['post/postDescription'];

      let editEl = $("<p>").append(descriptionhtml);
      let image = editEl.find("img#" + index);
      image.removeAttr("style").removeAttr("width").removeAttr("height");


      this.imagepost = this.imagepost.filter(function(item) {
        return item.src !== src;
      });
      image.remove();
      this.$store.commit('post/SET_DESCRIPTION', editEl.html());
    },
    onTypeContent(editor, content) {
      // this.$store.commit('post/SET_DESCRIPTION', content);
    }
  }
}

</script>
