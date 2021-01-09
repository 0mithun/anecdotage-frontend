import Vue from 'vue';

import moment from 'moment'

Vue.filter("fromNow", function(value) {

    // return moment(value).calendar();
    return moment(value).startOf('hour').fromNow();
});
