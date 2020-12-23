<template>
  <div>
    <SingleThread v-for="thread in threads" :key="thread.id" :thread="thread"></SingleThread>
    <Pagination :pagination="threads_paginate" routeName="profile.show.posts" :param="{key:'username',value:''}" />
  </div>
</template>

<script>
  import SingleThread from '@/components/threads/SingeThread'
  import Pagination from '@/components/Pagination'
  import {mapGetters} from 'vuex'
  export default {
    components:{
      SingleThread,
      Pagination
    },
    computed:{
      ...mapGetters({
        profile_user: 'user/profileUser',
        threads: 'user/threads',
        threads_paginate: 'user/threads_paginate',
      }),
    },
      watchQuery: true,
     async fetch({ params, query, error, $axios, store,redirect }) {
      try {
        const userRresponse = await $axios.$get(`profile/${params.username}`);
        if(userRresponse.data.is_blocked){
          redirect('/');
        }

        const q = await Object.keys(query)
        .map(k => `${k}=${query[k]}`)
        .join('&');
        const threadRresponse = await $axios.$get(`profile/${params.username}/threads?${q}`);
        store.commit('user/SET_USER', userRresponse.data);
        store.commit('user/SET_USER_PRIVACY', userRresponse.data.privacy);

        store.commit('user/SET_THREADS', threadRresponse.data);
        store.commit('user/SET_THREADS_PAGINATE', threadRresponse.meta);

      } catch (err) {
        if(err.response.status === 404){
          error({statusCode : 404, message:'user Not Found'})
        }
        else if(err.response.status === 403){
         redirect('/');
        }else if(err.response.status === 429){
          error({statusCode : 429, message:'Too Many Attempt'})
        }else if(err.response.status === 401){
          redirect('/login');
        }else{
          error({statusCode : 500, message:'Server Error'})
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
