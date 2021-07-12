<template>
  <a
    :href="threadUrl"
    target="_blank"
    class="btn btn-xs facebook-share-btn"
    rel="noreferrer"
    @click.prevent="share"
  >
    <i class="fab fa-facebook-square" aria-hidden="true"></i> Share
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
    appurl() {
      return process.env.APP_URL;
    },
    threadUrl() {
      // return 'https://www.facebook.com/sharer/sharer.php?u='+ this.thread.path + '&quote='+this.thread.title+'&title='+this.thread.title;

      let routeData = this.$router.resolve({
        name: 'threads.show',
        params: { slug: this.thread.slug },
      }).href;

      const routeURL = routeData.replace(/^\//g, '');

      return (
        'https://www.facebook.com/sharer/sharer.php?u=' +
        this.appurl +
        routeURL +
        '&title=' +
        this.thread.title
      );
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
        return;
      }

      window.open(this.threadUrl, 'Share on Facebook', 'width=600, height=400');
    },
  },
};
</script>


<style scoped>
.facebook-share-btn {
  color: white;
  background-color: #1b6ca8;
  padding: 2px 5px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
}
</style>
