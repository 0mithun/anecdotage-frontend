<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-m-5">
          <div class="card-body" v-html="settings.privacypolicy"></div>
        </div>
      </div>
      <!-- <div class="col-md-4">
        <Sidebar />
      </div> -->
    </div>
  </div>
</template>

<script>
import Sidebar from '@/layouts/partials/Sidebar';

import { mapGetters } from 'vuex';
import scrollToTop from '@/mixins/scrollToTop'
export default {
  name: 'faq',
  components: {
    Sidebar,
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  mixins: [scrollToTop],
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
};
</script>
