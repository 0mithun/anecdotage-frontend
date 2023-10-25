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
                <button class="btn btn-danger" @click.prevent="reset">RESET</button>
              </div>
              <div class="col-md-6 d-flex justify-content-end">
                <button class="btn btn-primary ml-auto"  @click.prevent="skip" v-if="pageinateData.next_page_url">SKIP</button>
                <button class="btn btn-success ml-auto" @click.prevent="add">ADD</button>
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
              <div class="col-md-12">
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
        <div  class="mt-3 d-flex justify-content-between">
          <button class="btn btn-success" @click.prevent="update">SAVE</button>
          <button class="btn btn-primary ml-auto" @click.prevent="getFile">GETFILE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import { mapGetters, mapActions } from 'vuex';
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
  async fetch({ params, query, app, $axios, store, redirect, }) {
    try {

      const term = params.term
      await store.dispatch('bookbuilder/getThreads', {term, query})

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
    ...mapActions({}),
    setFormData(){
      this.form.title = this.thread.title
      this.form.body = this.thread.body
      this.form.source = this.thread.source
    },
    async skip() {
      if(!this.pageinateData.next_page_url) return
      const page = this.pageinateData.current_page + 1;
      const term = this.$route.params.term


      await this.$store.dispatch('bookbuilder/getThreads', {term: term,  query: { ...this.$route.query, page: page},})
      this.setFormData()
    },
    update(){
      this.$axios
        .$put(`admin/bookbuilder/${this.thread.slug}`, this.form)
        .then((res) => {
          console.log(res)
        });
    },
    add(){
      const term = this.$route.params.term
      this.$axios
        .$post(`admin/bookbuilder/${this.thread.slug}`, {
          term: term
        })
        .then((res) => {
            this.skip()
        });
    },
    async reset(){
      try {
        const term = this.$route.params.term
        await this.$axios
          .$delete(`admin/bookbuilder/${term}/reset`, {
            term: term,
          })

        await this.$store.dispatch('bookbuilder/getThreads', {term: term,  query: { ...this.$route.query, page: 1},})
        this.setFormData()

        this.$toast.open({
            type: 'success',
            position: 'top-right',
            message: 'Bookbuilder reset Successfully',
          });
      } catch (error) {

      }
    },
    async getFile() {
      try {
        const term = this.$route.params.term
        const response = await this.$axios({
              url: `admin/bookbuilder/${term}/get-file`,
              method: 'GET',
              responseType: 'blob', // important
          })

          let fileName = term + '.txt'

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName); //or any other extension
          document.body.appendChild(link);
          link.click();

      } catch (error) {

      }


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
