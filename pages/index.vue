<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <SingleThread v-for="thread in threads" :key="thread.id" :thread="thread"></SingleThread>






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

export default {
  name: 'index',
  components:{
    SingleThread,
    Sidebar
  },

  async asyncData({ params, query, app, $axios }) {

    const q = await Object.keys(query)
      .map(k => `${k}=${query[k]}`)
      .join('&');

    try {
      const threadRresponse = await $axios.$get(`threads?${q}`);
      return { threads: threadRresponse.data, pageinateData: threadRresponse.meta};
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


