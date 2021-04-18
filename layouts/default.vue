<template>
  <div>
    <SiteNavigation />
    <div class="wrapper">
      <nuxt />
    </div>
    <SiteFooter />
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
  head() {
    return {
      link: [
        { rel: 'icon', type: 'image/png', href: this.settings.favicon_path },
      ],
    };
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },
  methods: {},
  mounted() {
    console.log(this.$route.name);
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
};
</script>
