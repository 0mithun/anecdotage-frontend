<template>
  <div class="tools-single-item tools-single-item-align-bottoms">
    <button
      class="btn thread-items-show-tools-btn report-btn"
      type="button"
      data-toggle="modal"
      data-target="#showReportModal"
      @click.prevent="showModal = true"
    >
      Report
    </button>
    <div
      class="modal d-block fade in"
      tabindex="-1"
      role="dialog"
      id="showReportModal"
      style="display: block"
      v-if="showModal"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="gridSystemModalLabel">Item Report</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click.prevent="showModal = false"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="This item contains">Reason</label>
              <select class="form-control" v-model="report_type">
                <option value="">Please select a reason</option>
                <option value="copyright_material">Copyright material</option>
                <option value="untrue_or_libelous">Untrue or libelous</option>
                <option value="racist_or_hateful">Racist or hateful</option>
                <option value="pornographic">Pornographic</option>
                <option value="18">
                  Adult content (should be R-rated/18+)
                </option>
                <option value="13">Mature content (should be PG-13)</option>
                <!-- <option value="0">PG-13</option> -->
                <option value="miscategorized">Miscategorized</option>
                <option value="not_a_story">Not a story</option>
                <option value="Incorrect">Incorrect</option>
                <option value="spam">Spam</option>
              </select>
            </div>
            <div class="form-group">
              <label for="This item contains">Email & Other Contact</label>
              <textarea
                name="contact"
                id="contact"
                rows="2"
                class="form-control"
                v-model="contact"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="This item contains">Additional Notes</label>
              <textarea
                name="reason"
                id="reason"
                rows="2"
                class="form-control"
                v-model="reason"
              ></textarea>
            </div>
            <div class="form-group">
              <button
                class="btn btn-primary"
                @click.prevent="report"
                :disabled="isDiabled"
              >
                Report
              </button>
            </div>

            <div class="form-group" v-if="isAdmin">
              <button class="btn btn-primary" @click.prevent="review">
                Review
              </button>
            </div>
          </div>
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
    },
  },

  data() {
    return {
      reason: '',
      report_type: 'spam',
      showModal: false,
      contact: '',
    };
  },
  created() {},

  computed: {
    signedIn() {
      // return window.App.user ? true : false;
    },
    isAdmin() {
      // return  window.App.user && window.App.user.id == 1;
    },
    isDiabled() {
      if (this.reason == '' && this.report_type == '') {
        return true;
      }
    },
  },

  methods: {
    closePopup() {
      this.showModal = false;
      setTimeout(() => {
        // window.location = '/';
      }, 300);
    },
    report() {
      if (!this.signedIn) {
        // this.redirectToLogin();
      }

      this.$axios
        .$post(`threads/${this.thread.slug}/report`, {
          report_type: this.report_type,
          reason: this.reason,
          contact: this.contact,
        })
        .then((res) => {
          this.report_type = 'spam';
          this.reason = '';
          this.contact = '';
          this.showModal = false;
          $('#showReportModal').modal('hide');

          // this.$swal(res.message, "This item is under review. Thank you for reporting.", "success");
          this.$swal({
            title: res.message,
            text: 'This item is under review. Thank you for reporting.',
            icon: 'success',
            button: 'CLose',
          });
        })
        .catch((err) => {
          this.$toast.open({
            type: 'warning',
            position: 'top-right',
            message: res.message,
          });
        });
    },
    review() {
      if (!this.signedIn) {
        this.redirectToLogin();
      }
      axios
        .post('/report/thread/review', {
          id: this.thread.id,
          reason: this.reason,
          contact: this.contact,
          report_type: this.report_type,
        })
        .then((res) => {
          this.showModal = false;
          flash('This item review successfully.');
        });
    },
    redirectToLogin() {
      // window.location = "/redirect-to?page=" + location.pathname;
    },
  },
};
</script>

<style scoped>
.tools-single-item-align-bottoms {
  /* align-self: flex-end; */
}
.report-btn {
  background-color: transparent;
  border: none;
  font-size: 14px;
  padding: 0;
  height: auto;
  width: auto;
}
#reason {
  resize: vertical;
}
.alert {
  margin-bottom: 0px;
}

.thread-items-show-tools-btn {
  border-radius: 50%;
  color: #92959e;
  font-weight: 900;
  text-align: center;
  line-height: 0;
}

.report-btn {
  background-color: transparent;
  border: none;
  font-size: 14px;
  padding: 0;
  height: auto;
  width: auto;
}

.tools-single-item {
  margin: 0 5px;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
