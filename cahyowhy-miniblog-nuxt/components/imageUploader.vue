<template>
  <input :id="id" :class="className+' upload'" name="file" type="file" accept="image/*" @change="onPhotoSelected">
</template>
<script>
  export default {
    props: ['id', 'className', 'url'],
    methods: {
      onPhotoSelected (e){
        const context = this;
        if (e.target.files.length) {
          const fileReader = new FileReader()
          fileReader.onload = (e) => {
            if (e.target.result) {
              const src = e.target.result;
              let blob = context.dataUrlToBlob(src);
              const fileName = context.generateId();
              const file = new File([blob], fileName);
              let data = new FormData();
              data.append(`${process.env.APP.API_IMAGE_PARAM_NAME}[]`, file);
              context.imageUploader(context.url, data).then(function (response) {
                let data = response[0];
                data.path.url = `${process.env.APP.IMAGE_RESOURCES}/${fileName}.jpg`
                context.showNotification(data.httpstatus);
                context.$store.commit('images/pushImage', [data]);
              });
            }
          };
          fileReader.readAsDataURL(e.target.files[0]);
        }
      }
    }
  }
</script>
