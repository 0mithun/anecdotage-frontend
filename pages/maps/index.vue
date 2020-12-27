<template>
  <div>
    <ThreadMap />
  </div>
</template>

<script>
import ThreadMap from '@/components/gmap/ThreadMap';
import MapResults from '@/components/gmap/MapResults';
import PlaceSearch from '@/components/gmap/PlaceSearch';
  export default {
    components:{
      ThreadMap,
      MapResults,
      PlaceSearch
    }
  }
</script>

<style lang="scss" scoped>

</style>
