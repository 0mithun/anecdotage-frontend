<template>
  <div class="container">
    <div></div>
    <div class="row">
      <div class="col-md-8">
        <div></div>
        <FilterSearch routeName="search" />
        <div></div>
        <template v-if="loading">
          <div class="loading-box">
            <img src="~assets/images/loading.gif" alt="" />
          </div>
        </template>
        <template v-else>
          <template v-if="threadsCount > 0">
            <template v-if="$route.query.show && $route.query.show == 'all' ">
            <ThreadSimple
              v-for="thread in threads"
              :key="thread.id"
              :thread="thread"
            />
        </template>

        <template v-else>
          <SingleThread
            v-for="thread in threads"
            :key="thread.id"
            :thread="thread"
          ></SingleThread>
        </template>
            <Pagination
              :pagination="pageinateData"
              routeName="search"
              :param="{ key: '', value: '' }"
            />
          </template>
          <template v-else>
            <div class="alert alert-danger">No Results Found</div>
          </template>
        </template>
      </div>
      <div class="col-md-4">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import SingleThread from '@/components/threads/SingeThread';
import Sidebar from '@/layouts/partials/Sidebar';
import Pagination from '@/components/Pagination';

import FilterSearch from '@/components/search/FilterSearch';
import { mapGetters } from 'vuex';
import scrollToTop from '@/mixins/scrollToTop'
import ThreadSimple from '@/components/threads/ThreadSimple'

export default {
  mixins: [scrollToTop],
  data() {
    return {
      q: '',
    };
  },
  components: {
    SingleThread,
    Sidebar,
    Pagination,
    FilterSearch,
    ThreadSimple
  },
  head() {
    return {
      title: `${this.settings.site_title} | Search: ${this.q}`,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      threads: 'search/threads',
      tags: 'search/tags',
      pageinateData: 'search/pageinateData',
      loading: 'search/loading',
      threadsCount: 'search/threadsCount',
    }),
  },

  created() {
    if (this.$route.query.q) {
      this.q = this.$route.query.q;
        console.log( 'created', this.$route.query)

        let queryString = this.$route.query;

        this.$store.commit('pagination/SET_QUERY_STRING', queryString);
    }
  },
  watchQuery: true,

  async fetch({ params, query, app, $axios, store, redirect }) {
    console.log('fetch', query)
    if (!query.q && (query.q != '' || query.q != null)) {
      redirect('/');
    }

    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    console.log('q', q);

    try {
      store.commit('search/SET_LOADING', true);
      const searchResponse = await $axios.$get(`search?${q}`);

      store.commit('search/SET_TAGS', searchResponse.tags.data);
      store.commit('search/SET_THREADS', searchResponse.threads.data);
      store.commit('search/SET_PAGINATE_DATA', searchResponse.threads.meta);
      store.commit('search/setTotalThreadsCount', searchResponse.total_threads_count);

      let queryString = query;
      if (queryString.hasOwnProperty('page')) {
        delete queryString.page;
      }
      console.log('queryString', queryString)
      store.commit('pagination/SET_QUERY_STRING', queryString);

      store.commit('search/SET_LOADING', false);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped>
.alert {
  margin-top: 10px;
}
.loading-box {
  // widows: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
}
</style>
