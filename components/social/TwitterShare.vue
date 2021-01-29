<template>
  <a
    :href="threadUrl"
    target="_blank"
    class="btn btn-xs twitter-share-btn"
    @click.prevent="share"
  >
    <i class="fab fa-twitter" aria-hidden="true" @click.prevent="share"></i>
    Share
  </a>
</template>

<script>
export default {
  props: {
    thread: {
      type: Object,
    },
  },

  computed: {
    threadUrl() {
      // return 'https://www.facebook.com/sharer/sharer.php?u='+ this.thread.path + '&quote='+this.thread.title+'&title='+this.thread.title;

      let routeData = this.$router.resolve({
        name: 'threads.show',
        params: { slug: this.thread.slug },
      });

      return (
        'https://www.facebook.com/sharer/sharer.php?u=' +
        routeData +
        '&title=' +
        this.thread.title
      );
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

  methods: {
    share() {
      if (!this.signedIn) {
        this.$router.push({ name: 'login' });
      }

      window.open(this.threadUrl, 'Share on Twitter', 'width=600, height=400');
    },
  },
};
</script>


<style scoped>
.twitter-share-btn {
  /* padding: 5px; */
  color: white;
  background-color: #12cad6;
  padding: 2px 5px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
}
</style>
