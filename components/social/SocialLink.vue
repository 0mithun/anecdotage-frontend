<template>
  <div class="card card-m-5">
    <div class="card-body">
      <div class="social-follow-btn">
        <!-- social_facebook:"social facebook here"
        social_instagram:"social instagram here"
        social_linkedin:"social linkedin here"
        social_twitter: -->
        <a :href="settings.social_facebook" class="follow-item" target="_blank">
          <img
            class="follow-item-icon"
            src="~assets/images/social/facebook.png"
            alt=""
          />
        </a>
        <a :href="settings.social_twitter" class="follow-item" target="_blank">
          <img
            class="follow-item-icon"
            src="~assets/images/social/twitter.png"
            alt=""
          />
        </a>
        <a
          :href="settings.social_instagram"
          class="follow-item"
          target="_blank"
        >
          <img
            class="follow-item-icon"
            src="~assets/images/social/instagram.png"
            alt=""
          />
        </a>
      </div>
      <h3 class="follow-on-title">Follow Us On</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
};
</script>

<style lang="scss" scoped>
.social-follow-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.follow-item {
  display: inline-block;
  padding: 10px;
}

.follow-item-icon {
  width: 48px;
  height: 48px;
}

.follow-on-title {
  padding: 0;
  margin-top: 0;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
}
</style>
