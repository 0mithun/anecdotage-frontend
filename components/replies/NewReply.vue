<template>
  <div class="add-new-reply" id="comments" name="comments">

    <h3 class="comment-heading">What did you think?</h3>
      <form action @submit.prevent="addReply">
        <div class="input-group">
        <input
            type="text"
            class="form-control"
            aria-label="..."
            name="body"
            id="body"
            v-model="body"
            placeholder="Add a comment"
          />
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">Post</button>
        </div>
      </div>
      </form>


    <!-- <p class="text-center" v-else>
      Please
      <a :href="redirectToLogin">sign in</a> to participate in this discussion.
    </p> -->
  </div>
</template>

<script>
// import "jquery.caret";
// import "at.js";

export default {
  data() {
    return {
      body: "",
      completed: false,
    };
  },
  computed: {
    redirectToLogin() {
      return "/redirect-to?page=" + location.pathname;
    },
    thread(){
      return this.$store.state.threads.thread;
    }
  },
  mounted() {
    // $("#body").atwho({
    //   at: "@",
    //   delay: 750,
    //   callbacks: {
    //     remoteFilter: function(query, callback) {
    //       $.getJSON("/api/users", { name: query }, function(usernames) {
    //         callback(usernames);
    //       });
    //     },
    //   },
    // });

   this.scrollToComment();

  },

  methods: {
    scrollToComment(){
       if(window.location.hash){
          var hash = window.location.hash;
          window.location.hash = "";
          window.location.hash = hash;

          const el = document.querySelector(hash)
          el && el.scrollIntoView()
       }

    },
    addReply() {
      this.$axios
        .$post(`threads/${this.thread.slug}/replies`, { body: this.body })
        .catch((error) => {
          // flash(error.response.data, "danger");
        })
        .then((res) => {
          this.body = "";
          this.$nuxt.$emit('commentAdded-'+ this.thread.id)
          this.$store.commit('replies/replyAdd', res)

          this.$toast.open({
            type:'success',
            position: 'top-right',
            message: 'Reply Add Successfully'
          });
        });
    },
  },
};
</script>

<style scoped>
.comment-body {
  resize: vertical !important;
}
.add-new-reply {
  padding: 15px 15px;
}
.comment-heading {
  color: black;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
}
</style>
