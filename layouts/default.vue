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
  methods: {
    async copyCut(e) {
      if (window.getSelection) {
        let text = window.getSelection().toString();
        let url = window.location.href;
        text = `${text} Read More: ${url}/?utm_campaign=clip`;
        await navigator.clipboard.writeText(text);
      }
    },
  },
  mounted() {
    document.addEventListener('copy', this.copyCut);
    document.addEventListener('cut', this.copyCut);
  },
};
</script>
