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
                ref="mmm"

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
      zoom: 8,
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
          if(this.$auth.user.location !=null){
            const lat = this.$auth.user.location.coordinates[1];
            const lng = this.$auth.user.location.coordinates[0];
            this.center = { lat: lat, lng: lng };
            this.mapCenter = { lat: lat, lng: lng };
          }else{
            this.getLocationFromBrowser()
              .then(location=>{
                this.center = location;
                this.mapCenter = location;

                 this.$axios
                  .$put(`settings/location`, location)
                  .then((res) => {
                    this.$auth.fetchUser();
                  })

              })
              .catch(err=>{
                alert('You must provide your location first.')
              });
          }
        } else {
            this.getLocationFromBrowser()
              .then(location=>{
                this.center = location;
                this.mapCenter = location;
              })
              .catch(err=>{
                alert('You must provide your location first.')
              });
        }
      }
    },
    getLocationFromBrowser() {
      return new Promise(function (resolve, reject) {
          if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function (position) {
              resolve( {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            });
          }else{
            reject('You must provide your location first')
          }
      });

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
      this.loading = true;
      const location =
        this.fetchRunningCenter != null ? this.fetchRunningCenter : this.center;

      this.$axios
        .$get(`maps?q=${this.query}&lat=${location.lat}&lng=${location.lng}`)
        .then((res) => {
          if (res.status == 'failed') {
            alert('You must provide your location first');
          } else {
            this.$nuxt.$emit('markers_fetched', res);
            // this.$nuxt.$emit("zoom_decreased", 8);
            if (this.fetchRunningCenter != null) {
              // this.mapCenter = this.fetchRunningCenter;
              // this.center = this.fetchRunningCenter;
            }
          }
          this.loading = false;
        });
    },
    toggleInfoWindow(marker, idx) {
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
    fitBounds(){
      var b = new google.maps.LatLngBounds();

      this.markers.map(item=>{
        // console.log(item.position)
        b.extend(item.position)
        // b.extend(item.position.lng, item.position.lat)
      })
      // console.log(b.getCenter().lat(),b.getCenter().lng())

      // b.extend(this.mapCenter);
      // b.extend(this.mapCenter);
      // console.log(this.markers)
      this.center = { lat: b.getCenter().lat(), lng: b.getCenter().lng() };
      this.mapCenter = { lat: b.getCenter().lat(), lng: b.getCenter().lng() };

      this.$refs.mmm.fitBounds(b);
    }
  },
  mounted() {
    this.getUserLocation();
    this.fetchLocations();

     this.$refs.mmm.$mapPromise.then(() => {
      this.fitBounds()
    })
  },

  created() {

    if (this.$route.query.search) {
      this.query = this.$route.query.search;
      console.log(this.query)
    }


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

      console.log(targetMarkers)

      const center = {
        lat: parseFloat(targetMarkers.position.lat),
        lng:  parseFloat(targetMarkers.position.lng)
      }
      this.mapCenter = center;
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
