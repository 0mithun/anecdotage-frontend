<template>
  <div>
    <a
      href="#"
      class="btn btn-link social-icon facebook"
      @click.prevent="socialLogin('facebook')"
      >Facebook</a
    >
    <a
      href="#"
      class="btn btn-link social-icon twitter"
      @click.prevent="socialLogin('twitter')"
      >Twitter</a
    >
    <!-- <a
      href="#"
      class="btn btn-link social-icon instagram"
      @click.prevent="socialLogin('instaagram')"
      >Instagram</a
    > -->
  </div>
</template>

<script>
export default {
  methods: {
    socialLogin(provider) {
      window.location.href = `${process.env.API_URL}/login/${provider}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.social-icon {
  text-decoration: none;
  background-repeat: no-repeat;
  background-size: 32px;
  background-position: 0 0;
  display: inline-block;
  overflow: hidden;
  padding-left: 36px;
}
.facebook {
  background-image: url('~assets/images/social/facebook.png');
}
.twitter {
  background-image: url('~assets/images/social/twitter.png');
}
.instagram {
  background-image: url('~assets/images/social/instagram.png');
}
</style>
