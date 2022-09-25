<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div></div>
        <div class="card card-m-5" v-for="pix in pixex" :key="pix.id">
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
                  :src="pix.image_url"
              />
            </div>
            <div class="image_description">
              {{ pix.description}}
            </div>
          </div>
        </div>
        <Pagination
          :pagination="pageinateData"
          routeName="pix.index"
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
  name: 'pix.index',
  watchQuery: true,
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters({
      // settings: 'settings',
      pageinateData: 'pix/pageinateData',
      pixex: 'pix/pixes',
    }),
  },
  async fetch({ params, query, app, $axios, store }) {
    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    try {
      const pixResponse = await $axios.$get(`pix/?${q}`);

      store.commit('pix/setPixes', pixResponse.data);
      store.commit('pix/setPageinateData', pixResponse.meta);
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
<style>
.image_description {
    font-size: 14px;
}
</style>
