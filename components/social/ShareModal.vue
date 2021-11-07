<template>
     <!-- Modal -->
    <div
      class="modal fade show"
      id="shareThreadModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      style="display: block;"
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
              aria-label="Close"
              @click.prevent="hideShareModal"
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
</template>

<script>
  export default {
    props: {
      thread: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        share_on_facebook: false,
        share_on_twitter: false,
      }
    },
    methods: {
      shareThread() {
        this.$axios
          .post(`threads/${this.thread.slug}/share`, {
            share_on_facebook: this.share_on_facebook,
            share_on_twitter: this.share_on_twitter,
          })
          .then((res) => {
            this.$emit('share-complete')
          })
          .catch((err) => {});
      },
      closeShareModal() {
        this.$emit('share-cancel')
      },
      hideShareModal() {
        this.$emit('hide-share-modal')
      },
      skip() {
        this.$axios
          .$put(`threads/${this.thread.slug}/skipThumbnailEdit`)
          .then((res) => {
            // this.$emit('share-skip')
            this.$emit('share-cancel')
          });
      },
    },
  }
</script>

<style lang="scss" scoped>
  .modal.show .modal-dialog {
    -webkit-transform: translate(0,0);
    transform: translate(0,0);
  }
  .modal.show {
    background-color: rgba($color: #000000, $alpha: .5);
  }
</style>
