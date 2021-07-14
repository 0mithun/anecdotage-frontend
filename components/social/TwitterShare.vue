<template>
  <a
    :href="threadUrl"
    target="_blank"
    class="btn btn-xs twitter-share-btn"
    rel="noreferrer"
    @click.prevent="share"
  >
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter-square" class="svg-inline--fa fa-twitter-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"></path></svg>
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
  background-color: #55acee;
  padding: 2px 5px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
}
</style>
