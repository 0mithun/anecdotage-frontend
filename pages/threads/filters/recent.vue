<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
         <total-counts></total-counts>
        <SingleThread
          v-for="thread in threads"
          :key="thread.id"
          :thread="thread"
        ></SingleThread>
        <Pagination
          :pagination="pageinateData"
          routeName="threads.recent"
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
  name: 'thread-recent',
  mixins: [scrollToTop,getSettings, threadLists],
  watchQuery: true,

  async fetch({ params, query, app, $axios, store }) {
    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    try {
      const threadRresponse = await $axios.$get(`threads/filter/recent?${q}`);
      store.commit('threads/setThreads', threadRresponse.data);
      store.commit('threads/setPageinateData', threadRresponse.meta);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


