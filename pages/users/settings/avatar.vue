<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="card-body">
          <div
            class="row justify-content-center align-items-center text-center"
          >
            <div class="col-md-5">
              <div class="card bg-white shadow-sm">
                <div class="d-flex flex-column justify-content-center p-1">
                  <div class="alert alert-danger" v-if="error">
                    <p>An error occurred during the upload process</p>
                    <p>{{ error }}</p>
                  </div>
                  <slim-cropper :options="slimOptions" :src="src">
                    <input type="file" name="avatar_path" />
                  </slim-cropper>
                  <div class="text-success caption-sm mt-2" v-if="uploading">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="upload-para mt-2">
                <p class="font-14 fw-400">
                  Your image dimensions must be at least 100px x 100px in size.
                  Also the image size should be a maximum of 2MB. Please resize
                  your file accordingly before you upload.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Slim from '@/components/slim/slim.vue';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      slimOptions: {
        service: this.slimService,
        post: 'output',
        defaultInputName: 'avatar_path',
        minSize: '100,100',
        label: 'Select Avatar image...',
        maxFileSize: 2,
        ratio: '1:1',
        // initialImage: this.src,
      },
      uploading: false,
      error: '',
    };
  },
  components: {
    'slim-cropper': Slim,
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
    user() {
      return this.$auth.user;
    },
    src() {
      return this.user.photo_url;
    },
  },
  methods: {
    slimService(formdata, progress, success, failure, slim) {
      this.uploading = true;
      this.$axios
        .post(`settings/avatar`, formdata)
        .then((res) => {
          this.$auth.fetchUser();
          this.$toast.open({
            type: 'success',
            position: 'top-right',
            message: 'Avatar Update Successfully',
          });
        })
        .catch((err) => {
          const message = err.response.data.errors;
          this.error = message[Object.keys(message)[0]][0];
          failure(500);
        })
        .finally(() => {
          this.uploading = false;
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.form-check {
  padding-left: 0;
}
h3 {
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
