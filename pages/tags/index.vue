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

  async asyncData({ params, query, error, $axios }) {

    // const q = await Object.keys(query)
    //   .map(k => `${k}=${query[k]}`)
    //   .join('&');

    try {
      const tagRresponse = await $axios.$get(`tags/${params.slug}`);
      return { tag:tagRresponse.tag,threads: tagRresponse.threads.data, pageinateData: tagRresponse.threads.meta};
    } catch (err) {
      if(err.response.status === 404){
        error({statusCode : 404, message:'Tag Not Found'})
      }else{
        error({statusCode : 500, message:'Server Error'})
      }
    }
  },
};
</script>


