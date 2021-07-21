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
          @submit.prevent="addNewThread"
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
                  v-model="form.title"
                  placeholder="Enter Thread Title"
                  inputType="text"
                  :autofocus="true"
                ></base-input>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="title_case"
                    v-model="title_case"
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
                  autocomplete="off"
                />
                <typeahead
                  v-model="form.channel"
                  match-start
                  :append-to-body="true"
                  target="#input"
                  :async-function="searchChannel"
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
                  :closeOnSelect="false"
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
                class="form-group"
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
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" class="svg-inline--fa fa-angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path>
                    </svg>
                  </span>
                  <span v-else>
                    Show More Fields
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                    </svg>
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

<!-- Currently Unused -->
              <!-- <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="slide_image_path" class="control-label"
                      >Slide Image</label
                    >
                    <input type="file" name="slide_image_path" id="slide_image_path" @change="handleSlideImagePath">
                  </div>
                </div>
              </div> -->


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

                <base-button :loading="form.busy">Add Thread</base-button>
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
import {serialize} from 'object-to-formdata'
import scrollToTop from '@/mixins/scrollToTop'
import userStatus from '@/mixins/userStatus'
import createEditThread from '@/mixins/createEditThread'
export default {
  components: { VueCkeditor },
  mixins: [scrollToTop,userStatus,createEditThread],

  data() {
    return {
      title_case: true,
    };
  },
  methods: {
    addNewThread() {
      this.errors = [];
      this.form
        .submit('post',`threads`, {
              transformRequest: [ function (data, headers) {
                return serialize(data)
              }],

        } )
          .then((res) => {
          this.$router.push({
            name: 'threads.thumbnail',
            params: { slug: res.data.slug },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Currently unused
    //  handleSlideImagePath (event) {
    //   const file = event.target.files[0]
    //   this.form.slide_image_path = file
    // },
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
</style>
