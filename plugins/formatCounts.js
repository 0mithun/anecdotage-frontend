import Vue from 'vue';

import abbreviate from 'number-abbreviate';

Vue.filter("formatCount", function(value) {
  return abbreviate(value, 1)
    .toString()
    .toUpperCase();
});
