<template>
  <a
    :href="threadUrl"
    target="_blank"
    class="btn btn-xs facebook-share-btn"
    rel="noreferrer"
    @click.prevent="share"
  >
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-square" class="svg-inline--fa fa-facebook-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
    </svg>
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
