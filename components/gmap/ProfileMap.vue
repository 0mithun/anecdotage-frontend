<template>
  <div class="profile-map">
    <div style="padding: 15px 0">
      <map-location :location="profile_user.location" :address="profile_user.formatted_address"></map-location>
    </div>
    <div v-if="profile_user.location !=null">
      <GmapMap
        :center="center"
        :zoom="zoom"
        map-type-id="terrain"
        style="width: 100%; height: 40vh"
      >
        <GmapMarker
          :position="center"
          :clickable="true"
          :draggable="false"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
export default {
  props: ['profile_user'],
  data() {
    return {
      zoom: 4,
    };
  },
  computed: {
    location() {
      if (this.profile_user.lat != null || this.profile_user.lng != null) {
        return `${this.profile_user.city}, ${this.profile_user.country}`;
      }
      return null;
    },
    center(){
      return {
        lat: parseFloat(this.profile_user.location.coordinates[0]),
        lng: parseFloat(this.profile_user.location.coordinates[1]),
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .profile-map{
    margin-top:10px;
  }
</style>
