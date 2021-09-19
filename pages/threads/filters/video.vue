<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <safe-search :postCounts="pageinateData.total" :totalThreadsCount="totalThreadsCount" :card="true"></safe-search>
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
import scrollToTop from '@/mixins/scrollToTop'
import getSettings from '@/mixins/getSettings'
import threadLists from '@/mixins/threadLists'
export default {
  name: 'thread-video',
  mixins: [scrollToTop,getSettings, threadLists],

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


