<template>
  <div>
    <div class="loading" v-if="loading">
      <div class="image">
        <img src="~assets/images/loading.gif" alt="" />
        <h4 style="color: white; font-weignt: bold">Loading....</h4>
      </div>
    </div>
    <div>
      <GmapMap
        @center_changed="centerChanged"
        @click="clicked"
        :center="mapCenter"
        :zoom="zoom"
        map-type-id="terrain"
        style="width: 100%; height: 85vh"
        :options="{ zoomControl: true }"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          @click="toggleInfoWindow(m, index)"
        />

        <!-- <gmap-cluster :zoomOnClick="true" :maxZoom="5">

            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="toggleInfoWindow(m,index)"
            />


    </gmap-cluster>-->

        <!-- <GmapMarker :position="center" :clickable="true" :draggable="false" @click="toggleInfoWindow(m,index)" /> -->

        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
        >
          <info-content
            :thread="infoContent"
            v-if="this.infoContent != null"
          ></info-content>
        </gmap-info-window>
      </GmapMap>
    </div>
  </div>
</template>

<script>
// import InfoContent from "./InfoContent.vue";

import InfoContent from '@/components/gmap/InfoContent';

export default {
  // props: ["userlat", "userlng", "nearest"],
  components: {
    InfoContent,
  },
  data() {
    return {
      loading: false,
      query: '',
      // center: { lat: parseFloat(this.userlat), lng: parseFloat(this.userlng) },
      center: { lat: 0, lng: 0 },
      mapCenter: {
        // lat: parseFloat(this.userlat),
        // lng: parseFloat(this.userlng),
        lat: 0,
        lng: 0,
      },

      fetchRunningCenter: null,
      markers: [],
      results: [],
      zoom: 3,
      infoContent: null,
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  methods: {
    getUserLocation() {
      if (this.query == '') {
        if (this.$auth.loggedIn) {
          const lat = this.$auth.user.location.coordinates[1];
          const lng = this.$auth.user.location.coordinates[0];

          if (lat == null || lng == null) {
            const location = this.getLocationFromBrowser();
            this.center = location;
            this.mapCenter = {
              lat: location.lat,
              lng: location.lng,
            };

            this.$axios
              .$put(`settings/location`, location)
              .then((res) => {
                this.$auth.fetchUser();
              })
              .catch((err) => {});
          } else {
            this.center = { lat: lat, lng: lng };
            this.mapCenter = { lat: lat, lng: lng };
          }
        } else {
          const location = this.getLocationFromBrowser();
          this.center = location;
          this.mapCenter = location;
        }
      }
    },
    getLocationFromBrowser() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          return {
            lat: lat,
            lng: lng,
          };
        });
      } else {
        alert('You must provide your location first');
        return;
      }
    },
    centerChanged(event) {
      const center = {
        lat: event.lat(),
        lng: event.lng(),
      };

      this.fetchRunningCenter = center;
      this.fetchLocations();
    },
    clicked(e) {
      this.mapCenter.lat = e.latLng.lat();
      this.mapCenter.lng = e.latLng.lng();

      // this.center.lat = e.latLng.lat();
      // this.center.lng = e.latLng.lng();
      this.loading = true;
      this.fetchLocations();
    },
    fetchLocations() {
      const location =
        this.fetchRunningCenter != null ? this.fetchRunningCenter : this.center;

      this.$axios
        .$get(`maps?q=${this.query}&lat=${location.lat}&lng=${location.lng}`)
        .then((res) => {
          if (res.status == 'failed') {
            alert('You must provide your location first');
          } else {
            this.$nuxt.$emit('markers_fetched', res);
            if (this.fetchRunningCenter != null) {
              // this.mapCenter = this.fetchRunningCenter;
              // this.center = this.fetchRunningCenter;
            }
          }
        });
    },
    toggleInfoWindow(marker, idx) {
      const center = {
        lat: Number.parseFloat(this.results[idx].lat),
        lng: Number.parseFloat(this.results[idx].lng),
      };
      // this.center = center;
      this.mapCenter = center;
      if (this.zoom < 10) {
        this.zoom = this.zoom + 1;
      }

      this.infoWindowPos = marker.position;

      this.infoContent = this.results[idx];

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }

      this.fetchLocations();
    },
  },

  created() {
    this.getUserLocation();
    if (this.$route.query.q) {
      this.query = this.$route.query.q;
    }

    this.fetchLocations();

    this.$nuxt.$on('markers_fetched', (data) => {
      this.markers = data.markers;
      this.results = data.results;

      if (this.markers.length > 0) {
        // let center = Math.floor(
        //   Math.random() * Math.floor(this.markers.length)
        // );
        // this.mapCenter = data.markers[center].position;
      }
      this.loading = false;
    });
    this.$nuxt.$on('markers_result_clicked', (index) => {
      let targetMarkers = this.markers[index];
      this.mapCenter.lat = Number.parseFloat(targetMarkers.position.lat);
      this.mapCenter.lng = Number.parseFloat(targetMarkers.position.lng);
      this.toggleInfoWindow(targetMarkers, index);
    });

    this.$nuxt.$on('zoom_decreased', (zoom) => {
      this.zoom = zoom;
    });
    this.$nuxt.$on('change_center', (center) => {
      this.mapCenter = center;
    });

    this.$nuxt.$on('query_removed', () => {
      this.query = '';
    });
  },
};
</script>

<style>
.loading {
  position: absolute;
  left: 0;
  /* right: 0; */
  z-index: 99999;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
}
.loading .image {
  position: absolute;
  left: 48%;
  /* right: 0; */
  top: 48%;
}
</style>
