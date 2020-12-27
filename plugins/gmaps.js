import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCi8raV_JKtL4xUfmHIvHkxA07DBEr9WbA',
    libraries: 'places'
  }
});
