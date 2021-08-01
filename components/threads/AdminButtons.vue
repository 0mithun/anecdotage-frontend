<template>
  <div class="admin-buttons">
    <nuxt-link
      class="btn btn-sm btn-primary"
      v-if="isAdmin || owns"
      :to="{ name: 'threads.edit', params: { slug: thread.slug } }"
    >
      Edit
    </nuxt-link>
    <nuxt-link
      class="btn btn-sm btn-success"
      v-if="isAdmin"
      :to="{ name: 'threads.thumbnail',params: { slug: thread.slug }, }"
    >
      Image
    </nuxt-link>
    <button
      class="btn btn-sm btn-secondary"
      @click.prevent="duplicateItem"
      v-if="isAdmin"
    >
      <span v-if="duplicateForm.busy">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
        </svg>
      </span>
      Dup
    </button>

    <button
      class="btn btn-sm btn-primary"
      data-toggle="modal"
      :data-target="`#edit-title-${thread.id}`"
      v-if="isAdmin"
    >
      Edit Title
    </button>
    <button
      class="btn btn-danger btn-sm"
      @click.prevent="deleteThread"
      v-if="owns"
    >
      Delete
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      :id="`edit-title-${thread.id}`"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      v-if="isAdmin"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit title</h5>
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
              <label for="" class="control-label">Title</label>
              <input type="text" class="form-control" v-model="form.title" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="submit"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from '@/mixins/swal'
  export default {
    mixins: [swal],
  props: {
    thread: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: this.$vform({
        title: '',
      }),

      duplicateForm: this.$vform({
        channel: '',
        tags: [],
        title: '',
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
        isDuplicate: true,
      }),
    };
  },
  mounted() {
    this.form.title = this.thread.title;
  },

  computed: {
    signedIn() {
      return this.$auth.loggedIn;
    },
    isAdmin() {
      if (this.signedIn) {
        return this.$store.state.auth.user.is_admin;
      }
      return false;
    },
    owns(thread) {
      if (this.signedIn) {
        return this.$store.state.auth.user.id == this.thread.user_id;
      }

      return false;
    },
  },
  methods: {
    async loadTrending(){
      const trendingResponse = await this.$axios.$get('trending/threads')
      return this.$store.commit('setTrendings', trendingResponse.data)
    },
    submit() {
      this.form
        .put(`admin/threads/${this.thread.slug}`, this.form)
        .then((res) => {
          this.$toast.open({
            type: 'success',
            position: 'top-right',
            message: 'Title Update Successfully',
          });

          // edit-title-${thread.id}

          $(`#edit-title-${this.thread.id}`).modal('hide');
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitDuplicate() {
      this.duplicateForm
        .post('threads')
        .then((res) => {
          this.submitDuplicateImage(res.data.slug);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitDuplicateImage(newThread) {
      this.$axios
        .$post(`threads/${newThread}/duplicateImage`, {
          old_thread: this.thread.slug,
        })
        .then((res) => {
          this.$router.push({
            name: 'threads.edit',
            params: { slug: newThread },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    duplicateItem() {
      this.$axios
        .$get(`threads/${this.thread.slug}`)
        .then((res) => {
          const thread = res.data;
          this.form.channel = thread.channel;
          this.duplicateForm.title = thread.title;
          this.duplicateForm.body = thread.body;
          this.duplicateForm.source = thread.source;
          this.duplicateForm.location = thread.formatted_address;
          this.duplicateForm.main_subject = thread.main_subject;
          this.duplicateForm.age_restriction = thread.age_restriction;
          this.duplicateForm.anonymous = thread.anonymous;

          // this.form.channel = this.thread.channel;

          // this.duplicateForm.tags = thread.tags.map((tag) => {
          //   return tag.name;
          // });

          if (thread.cno == 'C') {
            this.duplicateForm.cno = {
              famous: true,
              celebrity: true,
            };
          } else if (thread.cno == 'N') {
            this.duplicateForm.cno = {
              famous: true,
              celebrity: false,
            };
          } else {
            this.duplicateForm.cno = {
              famous: false,
              celebrity: false,
            };
          }
        })
        .then((res) => {
          this.submitDuplicate();
        });
    },
    deleteThread() {
      this.$swal({
        title: 'Are you sure?',
        // text: "Are you sure delete this reply",
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .$delete(`threads/${this.thread.slug}`)
            .then((res) => {
              this.$toast.open({
                type: 'success',
                position: 'top-right',
                message: 'Thread Delete Successfully.',
              });
              this.loadTrending();
              setTimeout(() => {
                // this.$router.push({ name: 'index' }).catch(err => {
                //   // console.log(this.$nuxt.context)
                // });
                if (this.$nuxt.$route.name == 'threads.show') {
                  this.$router.push({ name: 'index' });
                }else{
                  this.$router.go(this.$router.currentRoute)
                }

              }, 2000);
            })
            .catch((err) => {
              // console.log(err);
            });
        } else {
          // console.log('no Delete')
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
