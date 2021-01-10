<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <SingleThread v-for="thread in threads" :key="thread.id" :thread="thread"></SingleThread>
        <Pagination :pagination="pageinateData" routeName="emojis" :param="{key:'emoji',value:emoji.name}" />
      </div>
      <div class="col-md-4">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import SingleThread from '@/components/threads/SingeThread'
import Sidebar from '@/layouts/partials/Sidebar'
import Pagination from '@/components/Pagination'

import {mapGetters} from 'vuex'
export default {
  name: 'index',
  components:{
    SingleThread,
    Sidebar,
    Pagination
  },
  computed:{
    ...mapGetters({
      threads: 'emoji/threads',
      emoji: 'emoji/emoji',
      pageinateData: 'emoji/pageinateData',
    }),
  },
  watchQuery: true,

  async fetch({ params, query, app, $axios, store }) {

    const q = await Object.keys(query)
      .map(k => `${k}=${query[k]}`)
      .join('&');

    try {
      const emojiRresponse = await $axios.$get(`emojis/${params.emoji}?${q}`);
      store.commit('emoji/SET_EMOJI', emojiRresponse.emoji.data)
      store.commit('emoji/SET_THREADS', emojiRresponse.threads.data)
      store.commit('emoji/SET_PAGINATE_DATA', emojiRresponse.threads.meta)

    } catch (e) {
      console.log(e);
    }
  },
};
</script>


