import Ember from 'ember';

/**
 * this component is allow user to crop
 * and edit their photo using filter(caman js) like
 * instagram
 */
let imgWidth, imgHeight, file, editMode, src;
export default Ember.Component.extend({
  efects: ['vintage', 'lomo', 'clarity', 'sinCity', 'sunrise', 'crossProcess', 'orangePeel', 'love', 'grungy', 'jarques', 'pinhole', 'oldBoot', 'glowingSun', 'hazyDays', 'herMajesty', 'nostalgia', 'hemingway', 'concentrate',],
  didInsertElement(){
    this._super(...arguments);
  },
  dataURLtoBlob(dataurl) {
    let data = dataurl.split(','),
      mimetypeFile = data[0].match(/:(.*?);/)[1],
      bytestring = atob(data[1]),
      index = bytestring.length, blobArray = new window.Uint8Array(index);
    while (index--) {
      blobArray[index] = bytestring.charCodeAt(index);
    }
    return new Blob([blobArray], {type: mimetypeFile});
  },
  emptyFields(){
    const id = this.get("id");
    Ember.$('#img-gallery-' + id).cropper('destroy');
    Ember.$("#uploadphoto-" + id + " .edit-action-wrapper").addClass("hidden");
    Ember.$("#uploadphoto-" + id + " .slimScrollDiv").addClass("hidden");
    Ember.$("#uploadphoto-" + id + " #uploadBtn").removeClass("hidden");
    Ember.$('canvas#img-gallery-' + id).remove();
    if (Ember.$('img#img-gallery-' + id) !== 1) {
      Ember.$('img#img-gallery-' + id).remove();
      Ember.$(`<img src="${src}" alt="" id="img-gallery-${id}">`).insertAfter("#uploadphoto-" + id + " .edit-action-wrapper");
    }

    editMode = "";
  },
  /**
   * when user click edit button (wand icon)
   * this function is to handle the scroll bottom
   * to the caman js efect filter
   */
  initScrollBottomCategory(){
    Ember.$("#uploadphoto-" + this.get("id") + " .img-preset-wrapper").slimscroll({
      height: '120px',
      width: imgWidth + "px",
      axis: 'x'
    });
  },
  /**
   * allow user to undo edit their
   * picture to original picture
   */
  undoFilter(){
    window.Caman('#img-gallery-' + this.get("id"), function () {
      this.revert();
      this.render();
    });
  },
  actions: {
    /**
     * apply caman js filter for user picture
     * @param param
     */
    applyFilter(param){
      const ell = Ember.$('img#img-gallery-' + this.get("id"));
      const naturalWidth = ell.prop('naturalWidth');
      const naturalHeight = ell.prop('naturalHeight');
      const width = naturalWidth > 680 ? 680 : naturalWidth;
      const height = width / (naturalWidth / naturalHeight);
      window.Caman('#img-gallery-' + this.get("id"), function () {
        /**
         * resize the canvas for better performance
         * */
        if (ell.length > 0) {
          this.resize({
            width: width,
            height: height
          });
        }
        this[param]();
        this.render();
      });
    },
    onOpenModal(e){
      file = e.target.files[0];
      const context = this;

      if (e.target.files.length) {
        const fileReader = new FileReader();
        let parentElement = "#uploadphoto-" + context.get("id");
        fileReader.onload = (e) => {
          if (e.target.result) {
            src = e.target.result;
            Ember.$('#img-gallery-' + context.get("id")).attr('src', src);

            /**
             * call this function after we load the images from file explorer
             * */
            context.initScrollBottomCategory();
            Ember.$(parentElement + " .slimScrollDiv").addClass("hidden");
            Ember.$(parentElement).modal({backdrop: 'static', keyboard: false, show: 'true'});

            /**
             * event called when modal is open
             * */
            Ember.$(parentElement).on('shown.bs.modal', function () {
              Ember.$(this).appendTo("body");
              let imageHeight = Ember.$('#img-gallery-' + context.get("id")).prop('naturalHeight');
              let windowHeight = Ember.$(window).height();
              context.debug(imageHeight);
              if (imageHeight > windowHeight) {
                let modalWidth = (1024 / (imageHeight / windowHeight)) + 30;
                Ember.$(parentElement).find('.modal-dialog').width(modalWidth);
              }

              /**
               * crop Image via cropper js
               * */
              Ember.$(parentElement + " #cropImage").on('click', function () {
                editMode = "CROP";
                Ember.$(parentElement + " #uploadBtn").addClass("hidden");
                Ember.$(parentElement + " .slimScrollDiv").addClass('hidden');
                Ember.$(parentElement + " .edit-action-wrapper").removeClass("hidden");
                Ember.$('#img-gallery-' + context.get("id")).cropper({
                  crop: function (e) {
                    imgWidth = e.width;
                    imgHeight = e.height;
                  }
                });
              });

              /**
               * edit foto like instagram filter via camman js
               * */
              Ember.$(parentElement + " #editImage").on('click', function () {
                editMode = "EDIT";
                Ember.$(parentElement + " #uploadBtn").addClass("hidden");
                Ember.$(parentElement + " .edit-action-wrapper").removeClass("hidden");
                Ember.$(parentElement + " .undoOperation").removeClass("hidden");
                Ember.$(parentElement + " .slimScrollDiv").toggleClass('hidden');
              });

              /*
               * undo button to revert action when we click the filter button in editMode
               * */
              Ember.$(parentElement + " .undoOperation").on("click", function () {
                context.undoFilter();
              });

              /*
               * event called when modal is hidden
               * */
              Ember.$(parentElement).on('hidden.bs.modal', function () {
                context.emptyFields();
              });
            });

            /*
             * save change
             * */
            Ember.$(parentElement + " .saveEdit").on('click', function () {
              if (editMode === "CROP") {
                src = Ember.$('#img-gallery-' + context.get("id")).cropper('getCroppedCanvas', {
                  width: imgWidth,
                  height: imgHeight
                }).toDataURL("image/png");
                let blob = context.dataURLtoBlob(src);
                file = new File([blob], "image.jpg");
              } else {
                let canvas = Ember.$('canvas#img-gallery-' + context.get("id"));
                src = canvas[0].toDataURL("image/png");
                let blob = context.dataURLtoBlob(src);
                file = new File([blob], "image.jpg");
                canvas.remove();
              }
              context.emptyFields();
            });

            /**
             * cancel change
             * */
            Ember.$(parentElement + " .cancelEdit").on('click', function () {
              context.emptyFields();
            }); //cancel edit
          }
        };
        fileReader.readAsDataURL(e.target.files[0]);
      }
    },
    doUpload(){
      this.sendAction("action", file, '#uploadphoto-' + this.get("id"));
    }
  }
});
