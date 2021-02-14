<template>
  <div class="container">
    <div class="card card-m-5">
      <div class="card-header">
        <div class="left float-left">Edit Tag</div>
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
              <p class="font-14 fw-400">
                Your image dimensions must be at least 800px x 600px in size.
                Also the image size should be a maximum of 2MB. Please resize
                your file accordingly before you upload.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-m-5">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <form @submit.prevent="updateTag">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name" class="control-label">
                    Enter tag name
                  </label>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    v-model="form.name"
                  />
                </div>
                <div class="form-group">
                  <label for="description" class="control-label">
                    Enter tag description</label
                  >
                  <textarea
                    name=""
                    cols="30"
                    rows="5"
                    class="form-control"
                    id="description"
                    v-model="form.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block">Save</button>
                </div>
              </div>
            </form>
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
        defaultInputName: 'photo',
        minSize: '200,300',
        label: 'Select image...',
        maxFileSize: 2,
      },
      uploading: false,
      error: '',
      form: this.$vform({
        name: '',
        description: '',
      }),
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
    tag() {
      return this.$store.state.tags.tag;
    },
    src() {
      return this.tag.photo_url;
    },
  },
  mounted() {
    this.form.name = this.tag.name;
    this.form.description = this.tag.description;
  },
  methods: {
    slimService(formdata, progress, success, failure, slim) {
      this.uploading = true;
      this.$axios
        .post(`tags/${this.tag.slug}`, formdata)
        .then((res) => {
          this.$router.push({ name: 'tags', params: { slug: res.data.slug } });
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
    updateTag() {
      this.$axios
        .$post(`tags/${this.tag.slug}`, this.form)
        .then((res) => {
          this.$router.push({ name: 'tags', params: { slug: res.slug } });
        })
        .catch((err) => {});
    },
  },
  async fetch({ params, query, error, $axios, store }) {
    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    try {
      const tagRresponse = await $axios.$get(`tags/${params.slug}?${q}`);
      store.commit('tags/setTags', tagRresponse.tag.data);
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Tag Not Found' });
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },
};
</script>

<style></style>
