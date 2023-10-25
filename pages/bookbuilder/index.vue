<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div></div>
          <template v-if="loading">
            <div class="loading-box">
              <img src="~assets/images/loading.gif" alt="" />
            </div>
          </template>
        <div class="card card-m-5" v-for="thread in threads" :key="thread.id">
          <div class="card-body">
            <div
              class="thread-thumbnail"
              style="background: rgb(31, 50, 90); cursor: pointer"
            >
              <img
                  title=""
                  alt="Al Franken &nbsp;(1951–)&nbsp;&nbsp;&nbsp;&nbsp; Alternative names Alan Stuart Franken Description American politician, comedian and writer Date of birth 21 May 1951&nbsp; Location of birth Manhattan Work period 1973-present Work location United States Authority control : Q319084 VIAF: 86425630 ISNI: 0000 0001 1681 9289 LCCN: no93004145 NLA: 40034595 MusicBrainz: b0a3dda1-2cc0-404e-a26d-cdb3f302eb41 WorldCat creator QS:P170,Q319084 Senator from Minnesota. Credit: Jeff McEvoy, United States Senate Photographer (Public domain)"
                  heigh="240"
                  width="auto"
                  class="thread-image thread_thumb_image lazyLoad isLoading"
                  style="width: auto; height: 240px"
                  :src="thread.image_url"
              />
            </div>
            <div class="image_description">
              {{ thread.description}}
            </div>
          </div>
        </div>
        <!-- <Pagination
          :pagination="pageinateData"
          routeName="bookbuilder.index"
          :param="{ key: 'term', value: $route.params.term }"
        /> -->
        <Pagination
          :pagination="pageinateData"
          routeName="bookbuilder.index"
          :param="{ key: '', value: '' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import { mapGetters } from 'vuex';

export default {
  name: 'bookbuilder.index',
  watchQuery: true,
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters({
      // settings: 'settings',
      pageinateData: 'bookbuilder/pageinateData',
      threads: 'bookbuilder/threads',
      loading: 'bookbuilder/loading',
    }),
  },
  async fetch({ params, query, app, $axios, store }) {

    // if (!query.q && (query.q != '' || query.q != null)) {
    //   redirect('/');
    // }


    const q = await Object.keys(query)
    .map((k) => `${k}=${query[k]}`)
    .join('&');
    try {
      store.commit('bookbuilder/SET_LOADING', true);


      const response = await $axios.$get(`admin/bookbuilder?${q}`);

      store.commit('bookbuilder/setThreads', response.threads.data);
      store.commit('bookbuilder/setPageinateData', response.threads.meta);


      // store.commit('search/SET_LOADING', true);
      // const searchResponse = await $axios.$get(`search?${q}`);

      // store.commit('search/SET_TAGS', searchResponse.tags.data);
      // store.commit('search/SET_THREADS', searchResponse.threads.data);
      // store.commit('search/SET_PAGINATE_DATA', searchResponse.threads.meta);
      // store.commit('search/setTotalThreadsCount', searchResponse.total_threads_count);

      // let queryString = query;
      // if (queryString.hasOwnProperty('page')) {
      //   delete queryString.page;
      // }
      // store.commit('pagination/SET_QUERY_STRING', queryString);


      let queryString = query;
      if (queryString.hasOwnProperty('page')) {
        delete queryString.page;
      }
      store.commit('pagination/SET_QUERY_STRING', queryString);

      store.commit('bookbuilder/SET_LOADING', false);


    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped>

.thread-thumbnail {
  display: flex;
  justify-content: center;
}

.image_description {
    text-align: center;
    width: 100%;
    padding: 5px;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
    flex-wrap: wrap;
}
.image_description {
    font-size: 14px;
}

.loading-box {
  // widows: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
}
</style>
