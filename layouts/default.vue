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
  }
}
</script>
