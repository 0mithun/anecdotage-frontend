<template>
  <div class="container">
    <div></div>
    <div class="row">
      <!-- <div class="col-md-8">
        <SingleThread
          v-for="thread in threads"
          :key="thread.id"
          :thread="thread"
        ></SingleThread>
        <Pagination
          :pagination="pageinateData"
          routeName="emojis"
          :param="{ key: 'emoji', value: emoji.name }"
        />
      </div> -->
      <div></div>
      <div class="col-md-8">
        <FilterSearch routeName="emoji" />

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
                :thread="thread" />
            </template>

            <template v-else>
              <SingleThread
                v-for="thread in threads"
                :key="thread.id"
                :thread="thread"
              ></SingleThread>
              <Pagination
                :pagination="pageinateData"
                routeName="emojis"
                :param="{ key: 'emoji', value: emoji.name }"
              />
            </template>
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
import scrollToTop from '@/mixins/scrollToTop'
import ThreadSimple from '@/components/threads/ThreadSimple';
import { mapGetters } from 'vuex';
export default {
  name: 'index',
  mixins: [scrollToTop],
  components: {
    SingleThread,
    Sidebar,
    Pagination,
    FilterSearch,
    ThreadSimple
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      threads: 'emoji/threads',
      emoji: 'emoji/emoji',
      pageinateData: 'emoji/pageinateData',
      loading: 'emoji/loading',
      threadsCount: 'emoji/threadsCount',
    }),
  },
  watchQuery: true,

  async fetch({ params, query, app, $axios, store, error }) {
    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    try {
      store.commit('search/SET_LOADING', true);

      const emojiRresponse = await $axios.$get(`emojis/${params.emoji}?${q}`);

      store.commit('emoji/SET_EMOJI', emojiRresponse.emoji.data);
      store.commit('emoji/SET_TAGS', emojiRresponse.tags.data);
      store.commit('emoji/SET_THREADS', emojiRresponse.threads.data);
      store.commit('emoji/SET_PAGINATE_DATA', emojiRresponse.threads.meta);
      store.commit('emoji/setTotalThreadsCount', emojiRresponse.total_threads_count);

      let queryString = query;
      if (queryString.hasOwnProperty('page')) {
        delete queryString.page;
      }
      store.commit('pagination/SET_QUERY_STRING', queryString);

      store.commit('emoji/SET_LOADING', false);
    } catch (err) {
      if (err.response.status === 404) {
        // error({ statusCode: 404, message: 'Tag Not Found' });
        redirect('/');
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },
};
</script>


