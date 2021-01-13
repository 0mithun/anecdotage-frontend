<template>
  <div class="row">
    <div class="col-md-2">
      <PlaceSearch />
      <MapResults />
    </div>
    <div class="col-md-10">
      <ThreadMap />
    </div>
  </div>
</template>

<script>
import ThreadMap from '@/components/gmap/ThreadMap';
import MapResults from '@/components/gmap/MapResults';
import PlaceSearch from '@/components/gmap/PlaceSearch';
import { mapGetters } from 'vuex';
export default {
  components: {
    ThreadMap,
    MapResults,
    PlaceSearch,
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
