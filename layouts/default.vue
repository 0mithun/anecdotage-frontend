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
        // text = `${text} Read More: ${url}/?utm_campaign=clip`;
        text = `${text} Read More: ${url}`;
        await navigator.clipboard.writeText(text);
      }
    },
  },
  mounted() {
    // document.addEventListener('copy', this.copyCut);
    // document.addEventListener('cut', this.copyCut);

    // console.log(this.$route.name);

    if ('threads.show' == this.$route.name) {
      document.addEventListener('copy', this.copyCut);
      document.addEventListener('cut', this.copyCut);
    }
  },
};
</script>
