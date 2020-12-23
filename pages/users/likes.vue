<template>
  <div>
    <SingleThread v-for="thread in likes" :key="thread.id" :thread="thread"></SingleThread>
    <Pagination :pagination="likes_paginate" routeName="profile.show.likes" :param="{key:'username',value:''}" />
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
        likes: 'user/likes',
        likes_paginate: 'user/likes_paginate',
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
        const likeRresponse = await $axios.$get(`profile/${params.username}/likes?${q}`);
        store.commit('user/SET_USER', userRresponse.data);
        store.commit('user/SET_USER_PRIVACY', userRresponse.data.privacy);

        store.commit('user/SET_LIKES', likeRresponse.data);
        store.commit('user/SET_LIKES_PAGINATE', likeRresponse.meta);

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
