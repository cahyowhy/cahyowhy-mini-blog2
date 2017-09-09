<template>
  <div class="photocropper">
    <input class="upload" name="file" type="file" accept="image/*" @change="onOpenModal">
    <div :id="'uploadphoto-'+id" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="icon-wrapper">
            <ul>
              <li id="cropImage"><a class="btn btn-primary"><i class="ion ion-crop"></i></a></li>
              <li id="editImage"><a class="btn btn-primary"><i class="ion ion-ios-color-wand"></i></a></li>
              <li><a class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i></a></li>
            </ul>
          </div>
          <div class="modal-body">
            <div class="edit-action-wrapper hidden">
              <a class="btn btn-default saveEdit">
                <span><i class="fa fa-floppy-o"></i>Simpan</span>
              </a>
              <a class="btn btn-danger cancelEdit">
                <span><i class="fa fa-times"></i>Batal</span>
              </a>
              <a class="btn btn-primary undoOperation hidden">
                <span><i class="ion ion-ios-undo"></i>Undo</span>
              </a>
            </div>
            <img src="" alt="" :id="'img-gallery-'+id">
            <div class="img-preset-wrapper">
              <div v-for="effect in effects" :key="effect" @click="applyFilter(effect)" class="img-preset-item"><span>{{effect}}</span>
              </div>
            </div>
            <slot/>
            <a id="uploadBtn" class="btn btn-success" @click="doUpload">Upload Foto</a>
          </div>
          <!--<div class="modal-footer">-->
          <!--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['id'],
    data () {
        return {
          effects : ['vintage', 'lomo', 'clarity', 'sinCity', 'sunrise', 'crossProcess', 'orangePeel', 'love', 'grungy', 'jarques', 'pinhole', 'oldBoot', 'glowingSun', 'hazyDays',
              'herMajesty', 'nostalgia', 'hemingway', 'concentrate',],
          imgWidth:'',
          imgHeight:'',
          file:'',
          editMode:'',
          src:'',
        }
    },
    methods: {
      /**
       * when user click edit button (wand icon)
       * this function is to handle the scroll bottom
       * to the caman js efect filter
       */
      initScrollBottomFilter(){
        $("#uploadphoto-" + this.id + " .img-preset-wrapper").slimscroll({
          height: '120px',
          width: this.imgWidth + "px",
          axis: 'x'
        })
      },
      emptyFields(){
        const id = this.id
        $('#img-gallery-' + id).cropper('destroy')
        $("#uploadphoto-" + id + " .edit-action-wrapper").addClass("hidden")
        $("#uploadphoto-" + id + " .slimScrollDiv").addClass("hidden")
        $("#uploadphoto-" + id + " #uploadBtn").removeClass("hidden")
        $('canvas#img-gallery-' + id).remove()
        if ($('img#img-gallery-' + id) !== 1) {
          $('img#img-gallery-' + id).remove()
          $(`<img src="${this.src}" alt="" id="img-gallery-${id}">`).insertAfter("#uploadphoto-" + id + " .edit-action-wrapper")
        }

        this.editMode = ""
      },
      applyFilter (param) {
        const ell = $('img#img-gallery-' + this.id)
        const naturalWidth = ell.prop('naturalWidth')
        const naturalHeight = ell.prop('naturalHeight')
        const width = naturalWidth > 680 ? 680 : naturalWidth
        const height = width / (naturalWidth / naturalHeight)
        window.Caman('#img-gallery-' + this.id, function () {
          /**
           * resize the canvas for better performance
           * */
          if (ell.length > 0) {
            this.resize({
              width: width,
              height: height
            })
          }
          this[param]()
          this.render()
        })
      },
      /**
       * allow user to undo edit their
       * picture into original picture
       */
      undoFilter (){
        window.Caman('#img-gallery-' + this.id, function () {
          this.revert()
          this.render()
        })
      },
      beforeDestroyed () {
        $("#uploadphoto-" + this.id).find('*').off();
        $("#uploadphoto-" + this.id).off();
      },
      doUpload () {
        this.$emit("onEditCroping", this.file, '#uploadphoto-' + this.id)
      },
      onOpenModal (e){
        this.file = e.target.files[0]
        const context = this

        if (e.target.files.length) {
          const fileReader = new FileReader()
          let parentElement = "#uploadphoto-" + context.id
          fileReader.onload = (e) => {
            if (e.target.result) {
              context.src = e.target.result
              $('#img-gallery-' + context.id).attr('src', context.src)

              /**
               * call this function after we load the images from file explorer
               * */
              context.initScrollBottomFilter()
              $(parentElement + " .slimScrollDiv").addClass("hidden")
              $(parentElement).modal({backdrop: 'static', keyboard: false, show: 'true'})

              /**
               * event called when modal is open
               * */
              $(parentElement).on('shown.bs.modal', function () {
                $('.inner-btn-scrolltop').hide()
                $(this).appendTo("body")
                let imageHeight = $('#img-gallery-' + context.id).prop('naturalHeight')
                let windowHeight = $(window).height()
                if (imageHeight > windowHeight) {
                  let modalWidth = (1024 / (imageHeight / windowHeight)) + 30
                  $(parentElement).find('.modal-dialog').width(modalWidth)
                }

                /**
                 * crop Image via cropper js
                 * */
                $(parentElement + " #cropImage").on('click', function () {
                  context.editMode = "CROP"
                  $(parentElement + " #uploadBtn").addClass("hidden")
                  $(parentElement + " .slimScrollDiv").addClass('hidden')
                  $(parentElement + " .edit-action-wrapper").removeClass("hidden")
                  $('#img-gallery-' + context.id).cropper({
                    crop: function (e) {
                      context.imgWidth = e.width
                      context.imgHeight = e.height
                    }
                  })
                })

                /**
                 * edit foto like instagram filter via camman js
                 * */
                $(parentElement + " #editImage").on('click', function () {
                  context.editMode = "EDIT"
                  $(parentElement + " #uploadBtn").addClass("hidden")
                  $(parentElement + " .edit-action-wrapper").removeClass("hidden")
                  $(parentElement + " .undoOperation").removeClass("hidden")
                  $(parentElement + " .slimScrollDiv").toggleClass('hidden')
                })

                /*
                 * undo button to revert action when we click the filter button in editMode
                 * */
                $(parentElement + " .undoOperation").on("click", function () {
                  context.undoFilter()
                })

                /*
                 * event called when modal is hidden
                 * */
                $(parentElement).on('hidden.bs.modal', function () {
                  $('.inner-btn-scrolltop').show()
                  context.emptyFields()
                })
              })

              /*
               * save change
               * */
              $(parentElement + " .saveEdit").on('click', function () {
                if (context.editMode === "CROP") {
                  context.src = $('#img-gallery-' + context.id).cropper('getCroppedCanvas', {
                    width: context.imgWidth,
                    height: context.imgHeight
                  }).toDataURL("image/png")
                  let blob = context.dataURLtoBlob(context.src)
                  context.file = new File([blob], "image.jpg")
                } else {
                  let canvas = $('canvas#img-gallery-' + context.id)
                  context.src = canvas[0].toDataURL("image/png")
                  let blob = context.dataURLtoBlob(context.src)
                  context.file = new File([blob], "image.jpg")
                  canvas.remove()
                }
                context.emptyFields()
              })

              /**
               * cancel change
               * */
              $(parentElement + " .cancelEdit").on('click', function () {
                context.emptyFields()
              })
            }
          }
          fileReader.readAsDataURL(e.target.files[0])
        }
      },
    }
  }
</script>
