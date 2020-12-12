<template>
  <div class="card card-m-5">
    <div class="card-body">
      <div class="social-follow-btn">
        <a
          href="https://facebook.com/Anecdotagecom-104983414515616/"
          class="follow-item"
        >
          <img
            class="follow-item-icon"
            src="~assets/images/social/facebook.png"
            alt=""
          />
        </a>
        <a href="https://twitter.com/anecdotage_com" class="follow-item">
          <img
            class="follow-item-icon"
            src="~assets/images/social/twitter.png"
            alt=""
          />
        </a>
        <a href="https://www.instagram.com/anecdevs_ig/" class="follow-item">
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
export default {};
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
