<template>
  <div class="container">
    <div class="row mt-10">
      <div class="col-md-8">
        <SingleThread v-for="thread in threads" :key="thread.id" :thread="thread"></SingleThread>
      </div>
      <div class="col-md-4">
        <SingleTrendingThread></SingleTrendingThread>
      </div>
    </div>
  </div>
</template>

<script>
import SingleThread from '@/components/threads/SingeThread'
import SingleTrendingThread from '@/components/threads/SingleTrendingThread'
export default {
  components:{
    SingleThread,
    SingleTrendingThread
  },
  async asyncData({ params, query, app, $axios }) {
    // const q = await Object.keys(query)
    //   .map(k => `${k}=${query[k]}`)
    //   .join('&');

    try {
      const response = await $axios.$get('threads');
      return { threads: response.data, pageinateData: response.meta };
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


