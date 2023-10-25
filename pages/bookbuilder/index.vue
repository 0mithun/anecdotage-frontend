<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div></div>
          <template v-if="loading">
            <div class="loading-box">
              <img src="~assets/images/loading.gif" alt="" />
            </div>
          </template>
        <div class="card card-m-5">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <button class="btn btn-danger">Reset</button>
              </div>
              <div class="col-md-6 d-flex justify-content-end">
                <button class="btn btn-primary ml-auto"  @click.prevent="skip">Skip</button>
                <button class="btn btn-success ml-auto">Add</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group" :class="{ 'has-error': errors.title }">
                  <label for="title" class="control-label"
                    >Title (required)</label
                  >

                  <BaseInput
                    :form="form"
                    field="title"
                    id="title"
                    v-model="form.title"
                    placeholder="Enter Thread Title"
                    inputType="text"
                  ></BaseInput>
                </div>

              </div>


            </div>

            <div class="row">
              <div class="col-md-12">
                <div
                  class="form-group thread-body"
                  :class="{ 'is-invalid': form.errors.errors.body }"
                >
                  <label for="body" class="control-label"
                    >Your Story (required)</label
                  >
                  <vue-ckeditor v-model="form.body" :config="config" />

                  <p class="text-danger" v-if="form.errors.errors.body">
                    {{ form.errors.errors.body[0] }}
                  </p>
                </div>
                <div class="form-group">
                  <has-error :form="form" field="body"></has-error>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="source" class="control-label">Source</label>
                  <input
                    type="text"
                    name="source"
                    id="source"
                    class="form-control"
                    v-model="form.source"
                  />
                  <span class="help-block">
                    Where did you hear this story? If this story was reported on
                    a website or other publication please list it here
                    (&lt;i&gt; &lt;a&gt; tags are allowed).</span
                  >
                </div>
              </div>


            </div>
          </div>
        </div>
        <div  class="mt-3">
          <button class="btn btn-success ml-auto" @click.prevent="update">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import { mapGetters } from 'vuex';
import VueCkeditor from 'vue-ckeditor2';
import BaseButton from '@/components/form/buttons/BaseButton'
import BaseInput from '@/components/form/inputs/BaseInput'

export default {
  name: 'bookbuilder.index',
  watchQuery: true,
  components: {
    Pagination,
    VueCkeditor,
    BaseButton,
    BaseInput,
  },
  computed: {
    ...mapGetters({
      // settings: 'settings',
      pageinateData: 'bookbuilder/pageinateData',
      threads: 'bookbuilder/threads',
      loading: 'bookbuilder/loading',
    }),

    thread() {
      if(this.threads.length) {
        return this.threads[0]
      }
      return {}
    }
  },
  data() {
    return {
      config: {
        height: 300,
        extraAllowedContent: 'iframe[*]',
        contentsCss: [
          'body {font-size: 22px;}',
          'blockquote { display: block !important;}',
          'blockquote { margin-block-start: 1em !important;}',
          'blockquote { margin-block-end: 1em !important;}',
          'blockquote { margin-inline-start: 40px !important;}',
          'blockquote { margin-inline-end: 40px !important;}',
          // 'blockquote { quotes: "“" "”" "‘" "’" !important;}',
          // 'blockquote::before { content:  "“";}',
          // 'blockquote::after { content:  "”";}',
        ],
        scayt_autoStartup: true
      },
      errors: [],
      form: this.$vform({
        title: '',
        body: '',
        source: '',
      }),
    };
  },
  async fetch({ params, query, app, $axios, store, redirect }) {

    if (!query.q && (query.q != '' || query.q != null)) {
      redirect('/');
    }


    const q = await Object.keys(query)
    .map((k) => `${k}=${query[k]}`)
    .join('&');
    try {
      store.commit('bookbuilder/SET_LOADING', true);


      const response = await $axios.$get(`admin/bookbuilder?${q}`);

      store.commit('bookbuilder/setThreads', response.threads.data);
      store.commit('bookbuilder/setPageinateData', response.threads.meta);


      let queryString = query;
      if (queryString.hasOwnProperty('page')) {
        delete queryString.page;
      }
      store.commit('pagination/SET_QUERY_STRING', queryString);

      store.commit('bookbuilder/SET_LOADING', false);


    } catch (e) {
      console.log(e);
    }
  },
  mounted() {
    this.form.title = this.thread.title
    this.form.body = this.thread.body
    this.form.source = this.thread.source
   },

  methods: {
    skip() {
      const page = this.pageinateData.current_page + 1;

      this.$router.push({
        name: this.$route.name,
        // params: params,
        query: { ...this.$route.query, page: page},
      });
    },
    update(){
      this.$axios
        .$put(`admin/bookbuilder/${this.thread.slug}`, this.form)
        .then((res) => {
          console.log(res)
          // this.show_share_modal= true;
          // this.$router.push({name:'threads.show', params:{slug: this.thread.slug}});
        });
    }
  }
};
</script>

<style lang="scss" scoped>

.thread-thumbnail {
  display: flex;
  justify-content: center;
}

.image_description {
    text-align: center;
    width: 100%;
    padding: 5px;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
    flex-wrap: wrap;
}
.image_description {
    font-size: 14px;
}

.loading-box {
  // widows: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
}
</style>
