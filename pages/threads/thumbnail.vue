<template>
  <div class="container">
    <div></div>
    <div class="card card-m-5">
      <div class="card-header">
        <div class="left float-left big-label">Upload an Image (Optional)</div>
        <div class="right float-right" style="display:flex;">
        <AdminButtons :thread="thread" />
          <button
            class="btn btn-success btn-lg"
            type="button"
            @click.prevent="skip"
            style="margin-left:40px;"
          >
            Skip
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-md-8">
            <div class="card bg-white shadow-sm">
              <div class="d-flex flex-column justify-content-center p-1 image-box">
                <div class="alert alert-danger" v-if="error">
                  <p>An error occurred during the upload process</p>
                  <p>{{ error }}</p>
                </div>
                <!-- Click the arrow to upload -->
                <slim-cropper :options="slimOptions" :src="src">
                  <input type="file" name="image" />
                </slim-cropper>
                <span data-toggle="tooltip" data-placement="bottom" title="Click the arrow to upload" id="imageSelectCompleteTooltip"></span>

                <div class="text-success caption-sm mt-2" v-if="uploading">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                  </svg>
                </div>

              </div>
            </div>
            <div class="upload-para mt-2">
              <!-- <p class="font-14 fw-400">
                Your image siz must be maximum of 2MB. Please resize your file
                accordingly before you upload.
              </p> -->
            </div>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-12">
            <form action="" @submit.prevent="UploadImageDescriptionSubmit">
              <div class="form-group">
                <label for="temp_image_description" class="control-label">
                  Image Description</label
                >
                <textarea
                  name=""
                  cols="30"
                  rows="2"
                  class="form-control"
                  id="upload_temp_image_description"
                  v-model="uploadImageform.temp_image_description"
                ></textarea>
              </div>
              <div class="form-group">
                <button
                  class="btn btn-primary btn-block"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div></div>
    <div class="card card-m-5">
      <div class="card-header big-label">Or Use An Online Image</div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <form action="" @submit.prevent="imageDescriptionSubmit">
              <div class="col-md-12">
                <div class="form-group" v-if="isAdmin">
                  <label for="hex_code" class="control-label">
                    Image Hex Color</label
                  >
                  <input
                    type="text"
                    id="hex_code"
                    class="form-control"
                    v-model="form.hex_code"
                  />
                </div>
                <div class="form-group" v-if="isAdmin">
                  <label for="amazon_product_url" class="control-label">
                    Amazon Product URL</label
                  >
                  <input
                    type="text"
                    id="amazon_product_url"
                    class="form-control"
                    v-model="form.amazon_product_url"
                  />
                </div>
                <div class="form-group">
                  <label for="wiki_info_page_url" class="control-label " data-toggle="tooltip" data-placement="top" :title="imageTooltipText">
                    Enter An Image URL
                  </label>
                  <input
                    type="text"
                    id="wiki_info_page_url"
                    class="form-control"
                    v-model="form.temp_image_url"
                    @click="clickOnCopyright = true"
                    :class="{'is-invalid': !isValidURL }"
                  />
                  <span class="invalid-feedback" v-if="!isValidURL">Invalid Image URL</span>
                </div>
                <div class="form-group" v-if="showCopyrightFree && isValidURL">
                  <label for="" :class="{ error: copyrightButtonError }">
                    <input
                      type="checkbox"
                      v-model="form.image_copyright_free"
                    />
                    I own this image, or credit & license info are included
                    below.
                  </label>
                  <!-- <span
                    class="help-block error"
                    v-if="form.temp_image_url && !form.image_copyright_free"
                    >I own this image, or credit & license info are included
                    below.</span
                  >
                  -->
                </div>

                <div class="form-group">
                  <label for="temp_image_description" class="control-label">
                    Image Description</label
                  >
                  <textarea
                    name=""
                    cols="30"
                    rows="2"
                    class="form-control"
                    id="temp_image_description"
                    v-model="form.temp_image_description"
                  ></textarea>
                </div>

                <div class="form-group">
                  <button
                    class="btn btn-primary btn-block"
                    :disabled="isDisabled"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div></div>
    <ShareModal v-if="show_share_modal" :thread="thread" @share-cancel="cancelShare(thread)" @hide-share-modal="show_share_modal = false"  @share-complete="completeShare(thread)" />
  </div>
</template>

<script>
import Slim from '@/components/slim/slim.vue';
import { mapGetters } from 'vuex';
import scrollToTop from '@/mixins/scrollToTop'
import userStatus from '@/mixins/userStatus'
import ThreadShare from '@/mixins/threadShare'
import AdminButtons from '@/components/threads/AdminButtons';

export default {
  middleware: ['auth'],
  components: {
    'slim-cropper': Slim,
    AdminButtons
  },
   mixins: [scrollToTop,userStatus, ThreadShare],
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  data() {
    return {
      slimOptions: {
        service: this.slimService,
        post: 'output',
        defaultInputName: 'image',
        // minSize: '200,300',
        label: 'Click here to upload an image...',
        // maxFileSize: 2,
        autoCrop: true,
        didLoad: this.selectImae,
        labelLoading: ''
      },
      uploading: false,
      error: '',
      form: {
        temp_image_url: null,
        image_copyright_free: false,
        temp_image_description: null,
        amazon_product_url: null,
        hex_code: null
      },
      uploadImageform: {
        temp_image_description: null,
        imageUploadComplete: false,
      },
      clickOnCopyright: false,
    };
  },
  mounted() {
    this.form.temp_image_url = this.thread.remote_image_url;
    this.form.temp_image_description = this.thread.image_description;
    this.uploadImageform.temp_image_description = this.thread.image_description;
    this.form.amazon_product_url = this.thread.amazon_product_url;
    this.form.amazon_product_url = this.thread.amazon_product_url;
    this.form.hex_code = this.rgbToHex(this.thread.image_path_pixel_color);

    if (this.form.temp_image_url == '' || this.form.temp_image_url == null) {
      this.form.image_copyright_free = false;
    }

   },
  created() {
    if (!this.isAdmin && !this.owns) {
      this.$router.push({ name: 'index' });
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      thread: 'threads/thread',
    }),
    owns() {
      if (this.signedIn) {
        return this.$store.state.auth.user.id == this.thread.user_id;
      }

      return false;
    },
    imageTooltipText(){
      return `This image will appear at the top of your article. You can also embed images with the editor on the previous page.`;
    },
    src() {
      return this.$store.state.threads.thread.thread_image_path;
    },
    isDisabled() {
      if (
        this.form.temp_image_url != null &&
        !this.form.image_copyright_free &&
        this.clickOnCopyright
      ) {
        return true;
      }
      return false;
    },
    showCopyrightFree() {
      if(this.form.temp_image_url == null || this.form.temp_image_url == ''){
        return false;
      }

      if (this.clickOnCopyright == true) {
        return true;
      }
      return false;
    },
    copyrightButtonError() {
      if (
        this.form.temp_image_url != null &&
        this.form.image_copyright_free == false
      ) {
        return true;
      } else if (
        this.form.temp_image_url == '' &&
        this.form.image_copyright_free == false
      ) {
        return true;
      } else if (
        this.form.temp_image_url == '' &&
        this.form.image_copyright_free == ''
      ) {
        return true;
      } else if (
        this.form.temp_image_url == null &&
        this.form.image_copyright_free == ''
      ) {
        return true;
      }
      return false;
    },

    isValidURL() {
      if(this.form.temp_image_url == null || this.form.temp_image_url == ''){
        return true;
      }

        var res = this.form.temp_image_url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }
  },
  methods: {
    selectImae(){
      $('#imageSelectCompleteTooltip').tooltip('show')
      console.log('image selected')
      return true;
    },
    slimService(formdata, progress, success, failure, slim) {
      this.uploading = true;
      this.$axios
        .post(`threads/${this.thread.slug}/thumbnail`, formdata)
        .then((res) => {
          document.getElementById('upload_temp_image_description').focus();
          this.uploadImageform.imageUploadComplete = true;
          console.log(res);
          // data.image_path_pixel_color
          this.form.hex_code = this.rgbToHex(res.data.image_path_pixel_color);
          // this.$axios
          //   .$put(`threads/${this.thread.slug}/imageDescription`, this.form)
          //   .then((res) => {

          //   })
          //    .catch((err) => {});
        })
        .catch((err) => {
          const message = err.response.data.errors;
          this.error = message[Object.keys(message)[0]][0];
          failure(500);
        })
        .finally(() => {
          this.uploading = false;
          // $('#shareThreadModal').modal('show');
          $('#imageSelectCompleteTooltip').tooltip('hide')
        });
    },
    imageDescriptionSubmit() {
      this.$axios
        .$put(`threads/${this.thread.slug}/imageDescription`, this.form)
        .then((res) => {

          // $('#shareThreadModal').modal('show');
          this.show_share_modal= true;
        })
        .catch((err) => {});
    },
    UploadImageDescriptionSubmit() {
      this.$axios
        .$put(`threads/${this.thread.slug}/imageDescription`, this.uploadImageform)
        .then((res) => {
          // $('#shareThreadModal').modal('show');
           this.show_share_modal= true;
        })
        .catch((err) => {});
    },


    rgbToHex(rgb) {
      if(rgb == null || rgb == ''){
        return '';
      }

      let rgbVal = rgb.split(',');
      rgbVal.pop();

      return  rgbVal.join(',').match(/[0-9|.]+/g).map((x,i) => i === 3 ? parseInt(255 * parseFloat(x)).toString(16) : parseInt(x).toString(16)).join('')
    },
    skip() {
      this.$axios
        .$put(`threads/${this.thread.slug}/skipThumbnailEdit`)
        .then((res) => {
          this.show_share_modal= true;
          // this.$router.push({name:'threads.show', params:{slug: this.thread.slug}});
        });
    },

  },
  async fetch({ params, query, error, $axios, store }) {
    try {
      const threadRresponse = await $axios.$get(`threads/${params.slug}`);
      // return { thread: threadRresponse.data};
      store.commit('threads/setCurrentThread', threadRresponse.data);
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Thread Not Found' });
      } else if (err.response.status === 429) {
        error({ statusCode: 429, message: 'Too Many Attempt' });
      } else if (err.response.status === 401) {
        redirect('/login');
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },

};
</script>

<style lang="scss" scoped>
.error {
  color: red;
}

.big-label{
  font-weight: 700;
  font-size:20px;
}

.image-box{
  height:350px;
}
</style>
