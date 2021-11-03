<template>
  <div>
    <client-only>
      <SiteNavigation />
      <div class="wrapper">
        <nuxt />
      </div>
      <SiteFooter />

    </client-only>
  </div>
</template>

<script>
import SiteNavigation from './partials/navigation';
import SiteFooter from './partials/footer';

export default {
  components: {
    SiteNavigation,
    SiteFooter,
  },
  head(){
    return {
      htmlAttrs: {
      lang: 'en'
    },
      link: [{
          hid: 'icon',
          rel: 'icon',
          type: 'image/x-icon',
          href: this.settings.favicon_path
      }]
    }
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },
  methods: {},
  mounted() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });



  },
};
</script>
