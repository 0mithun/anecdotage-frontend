<template>
  <GmapMap
    :center="center"
    :zoom="zoom"
    map-type-id="terrain"
    style="width: 100%; height: 55vh"
  >
    <GmapMarker :position="center" :clickable="true" :draggable="false" />
  </GmapMap>
</template>

<script>
export default {
  props: ['thread'],
  data() {
    return {
      zoom: 6,
    };
  },
  computed: {
    center() {
      return {
        lat: parseFloat(this.thread.location.coordinates[1]),
        lng: parseFloat(this.thread.location.coordinates[0]),
      };
    },
  },
};
</script>

<style>
</style>
