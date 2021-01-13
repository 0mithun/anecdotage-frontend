<template>
  <div class="location">
    <img :src="mapIcon" alt />
    <span
      class="map-location"
      v-if="location != null && location != 'null' && location != ''"
      >{{ address }}</span
    >
  </div>
</template>

<script>
export default {
  props: ['location', 'address'],
  computed: {
    mapIcon() {
      if (
        this.location == null ||
        this.location == '' ||
        this.location == 'null'
      ) {
        return require(`assets/images/map-icon-black.png`);
      } else {
        return require(`assets/images/map-icon-red.png`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.location {
  display: flex;
}
.map-location {
  color: black;
  font-weight: bold;
  font-size: 13px;
  margin-left: 5px;
}
</style>
