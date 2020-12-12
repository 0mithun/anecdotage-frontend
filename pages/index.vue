<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <SingleThread v-for="thread in threads" :key="thread.id" :thread="thread"></SingleThread>
      </div>
      <div class="col-md-4">
        <SocialLink></SocialLink>
        <SingleTrendingThread v-for="trending in trendings" :key="trending.id" :thread="trending"></SingleTrendingThread>
      </div>
    </div>
  </div>
</template>

<script>
import SingleThread from '@/components/threads/SingeThread'
import SingleTrendingThread from '@/components/threads/SingleTrendingThread'
import SocialLink from '~/components/social/SocialLink';

export default {
  name: 'index',
  components:{
    SingleThread,
    SingleTrendingThread,
    SocialLink
  },
  created(){
    this.$nuxt.$on('logout', res=>{
      window.location = '/';
    });
  },
  async asyncData({ params, query, app, $axios }) {

    // const q = await Object.keys(query)
    //   .map(k => `${k}=${query[k]}`)
    //   .join('&');

    try {
      const threadRresponse = await $axios.$get('threads');
      const trendingResponse = await $axios.$get('trending/threads')

      return { threads: threadRresponse.data, pageinateData: threadRresponse.meta, trendings: trendingResponse.data };
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


