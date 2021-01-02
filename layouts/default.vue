<template>
  <div>
    <SiteNavigation />
    <div class="wrapper">
      <nuxt />
    </div>

  </div>
</template>

<script>
import SiteNavigation from './partials/navigation'
import SiteFooter from './partials/footer'

export default {
  components:{
    SiteNavigation
  },
  head() {
    return {
      link: [
        { rel: 'icon', type: 'image/png', href: this.settings.favicon_path}
      ]
    }
  },
  computed:{
    settings() {
      return this.$store.getters.settings;
    },
  },
}
</script>
