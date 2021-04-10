<template>
  <div class="container">
    <div class="card card-m-5">
      <div class="card-header">Post an Anecdote</div>
      <div class="card-body">
        <form
          class=""
          action=""
          method="post"
          enctype="multipart/form-data"
          @submit.prevent="updateThread"
        >
          <div class="row">
            <div class="col-md-6">
              <div class="form-group" :class="{ 'has-error': errors.title }">
                <label for="title" class="control-label"
                  >Title (required)</label
                >

                <base-input
                  :form="form"
                  field="title"
                  id="title"
                  v-model="form.title"
                  placeholder="Enter Thread Title"
                  inputType="text"
                ></base-input>
                <!-- <input type="text" id="title" class="form-control" v-model="form.title"> -->

                <!-- <span class="help-block error" v-if="errors.title">{{ errors.title[0] }}</span> -->
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="title_case"
                    v-model="form.title_case"
                  />
                  <label class="form-check-label" for="title_case"
                    >Apply Title Case</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="main_subject" class="control-label"
                  >Main Subject:</label
                >
                <input
                  type="text"
                  name="main_subject"
                  id="main_subject"
                  class="form-control"
                  v-model="form.main_subject"
                />
                <span class="help-block"
                  >Who or what is this story about? This will be added as a tag.
                </span>
              </div>
              <div class="form-group" v-if="isAdmin">
                <div class="checkbox">
                  <label
                    ><input
                      type="checkbox"
                      value="1"
                      v-model="form.scrape_image"
                    />
                    Scrape Image</label
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group" id="category">
                <label for="input">Category</label>
                <input
                  id="input"
                  class="form-control"
                  type="text"
                  placeholder="Choose a category"
                  autocomplete="false"
                  v-model="defaultChannel.name"
                />
                <typeahead
                  v-model="form.channel"
                  match-start
                  :append-to-body="true"
                  target="#input"
                  :data="allchannels"
                  item-key="name"
                />
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group">
                <label for="tags" class="control-label"> Tags </label>
                <v-select
                  taggable
                  push-tags
                  v-model="form.tags"
                  :options="alltags"
                  multiple
                  @search="searchTag"
                  @input="selecetdTag"
                >
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      No results found for <em>{{ search }}</em
                      >.
                    </template>
                    <em style="opacity: 0.5" v-else
                      >Start typing to search for a tags.</em
                    >
                  </template>
                </v-select>
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
                <button
                  tton
                  class="btn btn-default btn-sm"
                  type="button"
                  @click="show_more_fields = !show_more_fields"
                >
                  <span v-if="show_more_fields">
                    Hide More Fields
                    <i class="fas fa-angle-up"></i>
                  </span>
                  <span v-else>
                    Show More Fields <i class="fas fa-angle-down"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="more-fields" v-if="show_more_fields">
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
              <div class="col-md-6">
                <div class="form-group">
                  <label for="location" class="control-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    class="form-control"
                    v-model="form.location"
                  />
                  <span class="help-block"
                    >Where did your story take place? If google can find it,
                    we'll add maps & markers for this story. Example locations
                    are: "111 5th ave, NYC" and "Louvre."</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="age_restriction">Age Restriction</label>
                  <select
                    name="age_restriction"
                    id="age_restriction"
                    class="form-control"
                    v-model="form.age_restriction"
                  >
                    <option :value="0" selected>Ok for everyone</option>
                    <option :value="13">PG-13</option>
                    <option :value="18">R-rated (18+)</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="category" class="control-label"></label>

                  <div class="checkbox">
                    <label
                      ><input
                        type="checkbox"
                        value="1"
                        v-model="form.cno.famous"
                      />This story involves a famous person or thing</label
                    >
                  </div>

                  <div
                    class="checkbox"
                    v-if="form.cno.famous"
                    style="margin-left: 30px"
                  >
                    <label
                      ><input
                        type="checkbox"
                        value="1"
                        v-model="form.cno.celebrity"
                      />Is it a celebrity?</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <div class="checkbox">
                    <label
                      ><input
                        type="checkbox"
                        v-bind:value="1"
                        name="anonymous"
                        v-model="form.anonymous"
                      />Post Anonymously</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <template v-if="isAdmin">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="slide_body" class="control-label"
                      >Slide Body</label
                    >
                    <textarea
                      name="slide_body"
                      id="slide_body"
                      cols="30"
                      rows="3"
                      class="form-control"
                      v-model="form.slide_body"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="slide_image_pos" class="control-label"
                      >Slide Image Position</label
                    >
                    <input
                      name="slide_image_pos"
                      id="slide_image_pos"
                      class="form-control"
                      v-model="form.slide_image_pos"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="slide_color_bg" class="control-label"
                      >Slide Color BG</label
                    >
                    <input
                      name="slide_color_bg"
                      id="slide_color_bg"
                      class="form-control"
                      v-model="form.slide_color_bg"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slide_color_0" class="control-label"
                      >Slide Color 0</label
                    >
                    <input
                      name="slide_color_0"
                      id="slide_color_0"
                      class="form-control"
                      v-model="form.slide_color_0"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slide_color_1" class="control-label"
                      >Slide Color 1</label
                    >
                    <input
                      name="slide_color_1"
                      id="slide_color_1"
                      class="form-control"
                      v-model="form.slide_color_1"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slide_color_2" class="control-label"
                      >Slide Color 2</label
                    >
                    <input
                      name="slide_color_2"
                      id="slide_color_2"
                      class="form-control"
                      v-model="form.slide_color_2"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <!-- <button class="btn btn-primary" type="submit" :disabled="form.wiki_info_page_url !='' && form.wiki_image_copyright_free != true">Add Thread</button> -->

                <base-button :loading="form.busy">Update Thread</base-button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <nuxt-link
                  :to="{ name: 'threads.show', params: { slug: thread.slug } }"
                  href="#"
                  class="btn btn-danger"
                  ><i class="fas fa-arrow-left"></i> Cancel</nuxt-link
                >
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueCkeditor from 'vue-ckeditor2';
import { mapGetters } from 'vuex';
export default {
  components: { VueCkeditor },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
    allchannels() {
      return this.$store.state.channels;
    },
    thread() {
      return this.$store.state.threads.thread;
    },
    owns() {
      if (this.signedIn) {
        return this.$store.state.auth.user.id == this.thread.user_id;
      }

      return false;
    },
    isBan() {
      if (this.signedIn) {
        return this.$store.state.auth.user.is_banned;
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
  data() {
    return {
      defaultChannel: {
        name: '',
        id: '',
        slug: '',
      },

      config: {
        height: 300,
        extraAllowedContent: 'iframe[*]',
        contentsCss: ['body {font-size: 22px;}'],
      },
      alltags: [],
      errors: [],
      show_more_fields: false,
      form: this.$vform({
        channel: '',
        tags: [],
        title: '',
        title_case: true,
        body: '',
        source: '',
        location: '',
        cno: {
          famous: false,
          celebrity: false,
        },
        main_subject: '',
        scrape_image: false,
        age_restriction: 0,
        anonymous: 0,
        slide_body: '',
        slide_image_pos: '',
        slide_color_bg: '',
        slide_color_0: '',
        slide_color_1: '',
        slide_color_2: '',
      }),
    };
  },
  created() {
    if (!this.isAdmin && !this.owns) {
      this.$router.push({ name: 'index' });
    }
  },
  mounted() {
    if (this.thread) {
      this.form.title = this.thread.title;
      this.form.body = this.thread.body;
      this.form.source = this.thread.source;
      this.form.location = this.thread.formatted_address;
      this.form.main_subject = this.thread.main_subject;
      this.form.age_restriction = this.thread.age_restriction;
      this.form.anonymous = this.thread.anonymous;
      this.defaultChannel = this.thread.channel;
      // this.form.channel = this.thread.channel;

      this.form.slide_body = this.thread.slide_body;
      this.form.slide_image_pos = this.thread.slide_image_pos;
      this.form.slide_color_bg = this.thread.slide_color_bg;
      this.form.slide_color_0 = this.thread.slide_color_0;
      this.form.slide_color_1 = this.thread.slide_color_1;
      this.form.slide_color_2 = this.thread.slide_color_2;

      this.form.tags = this.thread.tags.map((tag) => {
        return tag.name;
      });

      if (this.thread.cno == 'C') {
        this.form.cno = {
          famous: true,
          celebrity: true,
        };
      } else if (this.thread.cno == 'N') {
        this.form.cno = {
          famous: true,
          celebrity: false,
        };
      } else {
        this.form.cno = {
          famous: false,
          celebrity: false,
        };
      }
    }
    const iframe = document.querySelectorAll('iframe');
    const threadBody = document.querySelector('.thread-body');
    const position = threadBody.getBoundingClientRect();
    for (let i = 0; i < iframe.length; i++) {
      iframe[i].width = position.width;
      iframe[i].height = position.height;
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    document.getElementById('title').focus;
  },
  async fetch({ params, query, error, $axios, store }) {
    try {
      const threadRresponse = await $axios.$get(`threads/${params.slug}`);
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
  methods: {
    selecetdTag() {
      let tags = this.form.tags.map((val) => {
        return val.toLowerCase();
      });
      this.form.tags = tags;
    },
    searchTag(search, loading) {
      loading(true);
      this.$axios.$get(`tag/search?q=${search}`).then((res) => {
        this.alltags = res;
        loading(false);
      });
    },
    searchChannel(query, done) {
      this.$axios
        .$get(`channel/search?name=${query}`)
        .then((res) => {
          done(res);
        })
        .catch((err) => {
          // any error handler
        });
    },
    updateThread() {
      this.errors = [];
      if (this.form.channel == '') {
        this.form.channel = this.defaultChannel;
      }
      this.form
        .put(`threads/${this.thread.slug}`, this.form)
        .then((res) => {
          if (this.form.scrape_image) {
            this.$toast.open({
              type: 'success',
              position: 'top-right',
              message: 'Thread Update Successfully',
            });
            setTimeout(() => {
              this.$router.push({
                name: 'threads.show',
                params: { slug: res.data.slug },
              });
            }, 1500);
          } else {
            this.$router.push({
              name: 'threads.thumbnail',
              params: { slug: res.data.slug },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.thread-thumb-placeholder {
  width: 150px;
  height: 150px;
  background-color: #eeeeee;
}

#tinymce iframe {
  width: 100% !important;
  height: 350px !important;
}
.tox-tinymce {
  min-height: 500px !important;
}

.error {
  color: red;
}
.help-block.error {
  color: red;
}

.uiv .dropdown-menu > .active > a,
.uiv .dropdown-menu > .active > a:focus,
.uiv .dropdown-menu > .active > a:hover {
  color: #fff;
  text-decoration: none;
  background-color: #337ab7;
  outline: 0;
}

dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #38a9ff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.thread-body {
  width: 100%;
  height: 100%;
}

body.cke_editable.cke_editable_themed.cke_contents_ltr.cke_show_borders {
  font-size: 20px !important;
}
</style>
