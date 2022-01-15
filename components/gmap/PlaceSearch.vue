<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group place-search">

      <gmap-autocomplete
        class="form-control"
        placeholder="Type location for search thread"
        @place_changed="setRelatedThread"
        :select-first-on-enter="true"
      ></gmap-autocomplete>
      </div>
    </div>
    <!-- <div class="col-md-3">
                <select name="" id="" class="form-control" v-model="radius" @change="fetchNearestLocations">
                    <option value="">Select Radius</option>
                    <option value="0"> {{ nearest ? '0' : 'Full' }}</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="2000">2000</option>
                    <option value="5000">5000</option>
                </select>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      radius: 1000,
      query: "",
      //    center:{lat:42.363211, lng:-105.071875},
      center: { lat: 0, lng: 0},
      radiusOptions: [0, 100, 200, 300, 400, 500, 1000, 2000, 5000],
    };
  },
  created() {
    // this.query = location.search;
    // this.fetchNearestLocations();
  },
  methods: {
    fetchNearestLocations() {
       const location = this.center;
        this.$axios.$get(`maps?q=${this.query}&lat=${ location.lat}&lng=${ location.lng}`)
        .then((res) => {
          let data = res;
          let zoom = 8;

          this.$nuxt.$emit("markers_fetched", data);
          this.$nuxt.$emit("change_center", this.center);
          if (this.radius == 0) {
            zoom = 2;
          } else if (this.radius == 500) {
            zoom = 8;
          } else if (this.radius == 1000) {
            zoom = 6;
          } else if (this.radius == 2000) {
            zoom = 4;
          } else if (this.radius == 5000) {
            zoom = 3;
          }
          // this.$nuxt.$emit("zoom_decreased", zoom);
        });
    },
    setRelatedThread(place) {
      if(place.geometry){
        this.query = '';

        this.$nuxt.$emit("query_removed");
        this.radius = 500;
        let center = {
          lat: Number.parseFloat( place.geometry.location.lat()),
          lng: Number.parseFloat( place.geometry.location.lng()),
        };
        this.center = center;
        this.fetchNearestLocations();
      }
    },
  },
};
</script>

<style scped>
  .place-search{
    padding: 0px 10px;
  }
</style>
