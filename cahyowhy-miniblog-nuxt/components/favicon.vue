<template>
  <div class="hearticon" @click="onFav">
    <i v-if="currentUserLikes" class="fa fa-heart"></i>
    <i v-else class="fa fa-heart-o"></i>
  </div>
</template>
<script>
export default {
  props: ['likes', 'id'],
  computed: {
    isLogedIn: {
      get() {
        return this.$store.state.auth.isLogedIn;
      }
    }
  },
  data() {
    return {
      currentUserLikes: false
    }
  },
  mounted() {
    if (this.isLogedIn) {
      const id = this.$store.state.auth.user.id;
      this.currentUserLikes = this.likes.filter(function(item) {
        return item.user.id === id;
      }).length > 0;
    }
  },
  methods: {
    onFav() {
      if (this.isLogedIn) {
        this.currentUserLikes = !this.currentUserLikes;
        this.$emit("onLiked", this.id);
      } else {
      	this.showCustomNotification("Login Dahulu", "Anda harus login terlebih dahulu", "error");
      }
    }
  }
}

</script>
