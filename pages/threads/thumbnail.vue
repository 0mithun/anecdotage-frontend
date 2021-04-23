<template>
  <div class="container">
    <div class="card card-m-5">
      <div class="card-header">
        <div class="left float-left">Add an Image</div>
        <div class="right float-right">
          <button
            class="btn btn-success btn-lg"
            type="button"
            @click.prevent="skip"
          >
            Skip
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-md-6">
            <div class="card bg-white shadow-sm">
              <div class="d-flex flex-column justify-content-center p-1">
                <div class="alert alert-danger" v-if="error">
                  <p>An error occurred during the upload process</p>
                  <p>{{ error }}</p>
                </div>
                <slim-cropper :options="slimOptions" :src="src">
                  <input type="file" name="image" />
                </slim-cropper>
                <div class="text-success caption-sm mt-2" v-if="uploading">
                  <i class="fas fa-spinner fa-spin"></i>
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
      </div>
    </div>

    <div class="card card-m-5">
      <div class="card-header">Or Enter Image link</div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <form action="" @submit.prevent="imageDescriptionSubmit">
              <div class="col-md-12">
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
                  <label for="wiki_info_page_url" class="control-label">
                    Enter Image link
                  </label>
                  <input
                    type="text"
                    id="wiki_info_page_url"
                    class="form-control"
                    v-model="form.temp_image_url"
                    @click="clickOnCopyright = true"
                  />
                </div>
                <div class="form-group" v-if="showCopyrightFree">
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
                    Image description</label
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

    <!-- Modal -->
    <div
      class="modal fade"
      id="shareThreadModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">
              Share article on social media
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="checkbox">
                <label
                  ><input
                    type="checkbox"
                    value="1"
                    name="share_on_facebook"
                    v-model="share_on_facebook"
                  />Share on Facebook</label
                >
              </div>
              <div class="checkbox">
                <label
                  ><input
                    type="checkbox"
                    value="1"
                    name="share_on_twitter"
                    v-model="share_on_twitter"
                  />Share on Twitter</label
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default btn-sm"
              type="button"
              @click.prevent="closeShareModal"
            >
              Skip
            </button>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              @click.prevent="shareThread"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slim from '@/components/slim/slim.vue';
import { mapGetters } from 'vuex';
export default {
  middleware: ['auth'],
  components: {
    'slim-cropper': Slim,
  },
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
        minSize: '200,300',
        label: 'Select image...',
        // maxFileSize: 2,
        autoCrop: true,
      },
      uploading: false,
      error: '',
      form: {
        temp_image_url: null,
        image_copyright_free: false,
        temp_image_description: null,
        amazon_product_url: null,
      },
      clickOnCopyright: false,
      share_on_facebook: false,
      share_on_twitter: false,
    };
  },
  mounted() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    this.form.temp_image_url = this.thread.remote_image_url;
    this.form.temp_image_description = this.thread.image_description;
    this.form.amazon_product_url = this.thread.amazon_product_url;

    if (this.form.temp_image_url == '' || this.form.temp_image_url == null) {
      this.form.image_copyright_free = false;
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
    thread() {
      return this.$store.state.threads.thread;
    },
    src() {
      return this.$store.state.threads.thread.thread_image_path;
    },
    isDisabled() {
      // return false;
      // return form.temp_image_url && !form.image_copyright_free;
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
      // if (this.form.temp_image_url == null) {
      //   return false;
      // } else if (this.form.temp_image_url == '') {
      //   return false;
      // }
      // return true;

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
    signedIn() {
      return this.$auth.loggedIn;
    },
    isAdmin() {
      if (this.signedIn) {
        return this.$store.state.auth.user.is_admin;
      }
      return false;
    },
  },
  methods: {
    slimService(formdata, progress, success, failure, slim) {
      this.uploading = true;
      this.$axios
        .post(`threads/${this.thread.slug}/thumbnail`, formdata)
        .then((res) => {
          console.log(res);
          // this.$router.push({name:'designs.edit',params:{id:res.data.id}})
        })
        .catch((err) => {
          const message = err.response.data.errors;
          this.error = message[Object.keys(message)[0]][0];
          failure(500);
        })
        .finally(() => {
          this.uploading = false;
          $('#shareThreadModal').modal('show');
        });
    },
    imageDescriptionSubmit() {
      this.$axios
        .$put(`threads/${this.thread.slug}/imageDescription`, this.form)
        .then((res) => {
          $('#shareThreadModal').modal('show');
        })
        .catch((err) => {});
    },
    shareThread() {
      this.$axios
        .post(`threads/${this.thread.slug}/share`, {
          share_on_facebook: this.share_on_facebook,
          share_on_twitter: this.share_on_twitter,
        })
        .then((res) => {
          $('#shareThreadModal').modal('hide');
          this.$router.push({
            name: 'threads.show',
            params: { slug: this.thread.slug },
          });
        })
        .catch((err) => {});
    },
    closeShareModal() {
      $('#shareThreadModal').modal('hide');
      this.$router.push({
        name: 'threads.show',
        params: { slug: this.thread.slug },
      });
    },
    skip() {
      this.$axios
        .$put(`threads/${this.thread.slug}/skipThumbnailEdit`)
        .then((res) => {
          // this.$router.push({name:'threads.show', params:{slug: this.thread.slug}});
          $('#shareThreadModal').modal('show');
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
</style>
