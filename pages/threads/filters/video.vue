<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <SingleThread
          v-for="thread in threads"
          :key="thread.id"
          :thread="thread"
        ></SingleThread>
        <Pagination
          :pagination="pageinateData"
          routeName="threads.video"
          :param="{ key: '', value: '' }"
        />
      </div>
      <div class="col-md-4">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import SingleThread from '@/components/threads/SingeThread';
import Sidebar from '@/layouts/partials/Sidebar';
import Pagination from '@/components/Pagination';
import { mapGetters } from 'vuex';
import scrollToTop from '@/mixins/scrollToTop'
export default {
  name: 'thread-video',
  mixins:[scrollToTop],
  components: {
    SingleThread,
    Sidebar,
    Pagination,
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
    threads() {
      return this.$store.state.threads.threads;
    },
    pageinateData() {
      return this.$store.state.threads.pageinateData;
    },
  },
  watchQuery: true,

  async fetch({ params, query, app, $axios, store }) {
    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    try {
      const threadRresponse = await $axios.$get(`threads/filter/video?${q}`);
      store.commit('threads/setThreads', threadRresponse.data);
      store.commit('threads/setPageinateData', threadRresponse.meta);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


