<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="card card-m-5">
          <div class="card-body" v-html="settings.tos"></div>
        </div>
      </div>
      <div class="col-md-4">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/layouts/partials/Sidebar';
import scrollToTop from '@/mixins/scrollToTop'
import { mapGetters } from 'vuex';

export default {
  name: 'faq',
  components: {
    Sidebar,
  },
  mixins: [scrollToTop],
  head() {
    return {
      title: this.settings.site_title,
    };
  },

  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
};
</script>
