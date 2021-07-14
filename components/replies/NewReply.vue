<template>
  <div class="add-new-reply" id="comments" name="comments">
    <!-- <at :members="members"  name-key="sex" @at="handleAt" :hideOnBlur="false">
        <template slot="item" slot-scope="s">
          <img :src="s.item.avatar">
          <span v-text="s.item.name"></span>
        </template>
        <base-htmltextarea class="form-control" v-model="message"></base-htmltextarea>
    </at> -->
    <template v-if="$auth.loggedIn">
      <h3 class="comment-heading">What did you think?</h3>
      <form action @submit.prevent="addReply">
        <div class="input-group full-width">
          <input
            type="text"
            class="form-control"
            aria-label="..."
            name="body"
            id="body"
            v-model="body"
            placeholder="Add a comment"
          />

          <!-- <at :members="members"  name-key="sex" @at="handleAt" :hideOnBlur="false">
          <template slot="item" slot-scope="s">
            <img :src="s.item.avatar">
            <span v-text="s.item.name"></span>
          </template>
          <base-htmltextarea class="form-control" v-model="message"></base-htmltextarea> -->
          <!-- </at> -->

          <div class="input-group-append">
            <button class="btn btn-primary" type="submit">Post</button>
          </div>
        </div>
      </form>
    </template>
    <template v-else>
      <p class="text-center">
        Please
        <nuxt-link :to="{ name: 'login' }">sign in</nuxt-link> to participate in
        this discussion.
      </p>
    </template>
  </div>
</template>

<script>
//

export default {
  data() {
    return {
      body: '',
      completed: false,
      message: 'Hello World <a href="https://google.com">kemon aso</a> valo to',
      html: 'ami html bolsi',
      input: '@fritx @huangruichang ',
      members: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          name: 'Pinki rohman',
          sex: 'Oi sama <a href="https://twitter.com">Twitter</a>',
        },
        {
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
          name: 'Gobjob Ali',
          sex: ' Hi sexy <a href="https://facebook.com">Facebook</a> ',
        },
      ],
    };
  },
  computed: {
    thread() {
      return this.$store.state.threads.thread;
    },
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
    handleAt(chunk) {
      console.log([chunk]);
    },

    // async handleAt (chunk) {
    //   this.members = await fetchFromRemote(chunk)
    // },

    scrollToComment() {
      if (window.location.hash && window.location.hash != null) {
        var hash = window.location.hash;
        window.location.hash = '';
        window.location.hash = hash;
        const el = document.querySelector(hash);
        el && el.scrollIntoView();
      } else {
        const el = document.querySelector('#thread-card');

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    },
    addReply() {
      this.$axios
        .$post(`threads/${this.thread.slug}/replies`, { body: this.body })
        .catch((error) => {
          // flash(error.response.data, "danger");
        })
        .then((res) => {
          this.body = '';
          this.$nuxt.$emit('commentAdded-' + this.thread.id);
          this.$store.commit('replies/replyAdd', res);

          this.$toast.open({
            type: 'success',
            position: 'top-right',
            message: 'Reply Add Successfully',
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

.atwho-li {
  box-sizing: border-box;
  height: 27px;
  padding: 0 2px;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

li.atwho-li img {
  width: 27px;
  margin-right: 5px;
}

.input-group.full-width {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  justify-content: space-between;
}

.atwho-wrap {
  position: relative;
  width: 91%;
}
</style>
