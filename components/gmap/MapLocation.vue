<template>
  <div
    class="location"
    data-toggle="tooltip"
    data-placement="bottom"
    :title="address"
  >
    <img :src="mapIcon" alt style="height:16px" height="16" width="auto" />
    <span
      class="map-location"
      v-if="location != null && location != 'null' && location != ''"
      v-html="showAddress"
    ></span>
  </div>
</template>

<script>
export default {
  props: ['location', 'address'],
  data() {
    return {
      addressWordLimit: 3,
    };
  },
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
    showAddress() {
      // return this.address
      //   .split(/\s/)
      //   .splice(0, this.addressWordLimit)
      //   .join(' ');

      const splitAddress = this.address.split(/\s/);

      if (splitAddress.length > this.addressWordLimit) {
        return (
          splitAddress
            .splice(0, this.addressWordLimit)
            .join(' ')
            .replace(/,$/, '') +
          ' <i class="fas fa-plus-square" style="font-size:14px;color:#636f6f"></i>'
        );
      } else {
        return splitAddress.splice(0, this.addressWordLimit).join(' ');
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

.svg-inline--fa {
  font-size: 18px !important;
}
</style>
