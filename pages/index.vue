<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div>

          <!-- Ezoic - TEST - top_of_page -->
          <div id="ezoic-pub-ad-placeholder-125"> </div>
          <!-- End Ezoic - TEST - top_of_page -->
        </div>
        <safe-search :postCounts="pageinateData.total" :totalThreadsCount="totalThreadsCount" :card="true"></safe-search>
        <div>
          <!-- Ezoic - mid_content - mid_content -->
          <!-- <div id="ezoic-pub-ad-placeholder-105"> </div> -->
          <!-- End Ezoic - mid_content - mid_content -->
        </div>
        <SingleThread
          v-for="thread in threads"
          :key="thread.id"
          :thread="thread"
        ></SingleThread>

        <!-- <Pagination
          :pagination="pageinateData"
          routeName="index"
          :param="{ key: '', value: '' }"
        /> -->
        <Pagination
          :pagination="pageinateData"
          routeName="threads.rated"
          :param="{ key: '', value: '' }"
        />
        <!-- Ezoic - bottom_of_page - bottom_of_page -->
          <div id="ezoic-pub-ad-placeholder-120"> </div>
          <!-- End Ezoic - bottom_of_page - bottom_of_page -->
      </div>
      <div class="col-md-4">
        <div></div>
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
  name: 'index',
  mixins: [scrollToTop,getSettings, threadLists],

  watchQuery: true,


  async fetch({ params, query, app, $axios, store }) {
    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    try {
      // const threadRresponse = await $axios.$get(`threads?${q}`);
      const threadRresponse = await $axios.$get(`threads/filter/rated?${q}`);
      store.commit('threads/setThreads', threadRresponse.data);
      store.commit('threads/setPageinateData', threadRresponse.meta);
      store.commit('threads/setTotalThreadsCount', threadRresponse.total_threads_count);
      // return { threads: threadRresponse.data, pageinateData: threadRresponse.meta};
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


