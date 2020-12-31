<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <FilterSearch />
        <SingleThread v-for="thread in threads" :key="thread.id" :thread="thread"></SingleThread>

        <Pagination :pagination="pageinateData" routeName="search" :param="{key:'',value:''} " />

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

import FilterSearch from '@/components/search/FilterSearch'
import {mapGetters} from 'vuex'

  export default {
    data(){
      return {
        q: '',
      }
    },
    components:{
      SingleThread,
      Sidebar,
      Pagination,
      FilterSearch
    },
    computed:{
      ...mapGetters({
        threads: 'search/threads',
        tags: 'search/tags',
        pageinateData: 'search/pageinateData',
      }),
    },
    created(){
      if(this.$route.query.q){
        this.q = this.$route.query.q
      }
    },
    watchQuery: true,

    async fetch({ params, query, app, $axios, store, redirect }) {
      if(!query.q && (query.q != "" || query.q != null)){
        redirect('/')
      }

      const q = await Object.keys(query)
        .map(k => `${k}=${query[k]}`)
        .join('&');

      try {
        const searchResponse = await $axios.$get(`search?${q}`);

        store.commit('search/SET_TAGS', searchResponse.tags.data)
        store.commit('search/SET_THREADS', searchResponse.threads.data)
        store.commit('search/SET_PAGINATE_DATA', searchResponse.threads.meta)

        let queryString = query
        if(queryString.hasOwnProperty('page')){
          delete queryString.page
        }
        store.commit('pagination/SET_QUERY_STRING', queryString)

      } catch (e) {
        console.log(e);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
