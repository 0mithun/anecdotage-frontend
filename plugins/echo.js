import Echo from 'laravel-echo';

export default (app) => {
    window.Pusher = require('pusher-js');

    window.Echo = new Echo({
        broadcaster: process.env.BROADCAST_DRIVER,
        key: process.env.PUSHER_APP_KEY,
        cluster: process.env.PUSHER_APP_CLUSTER,

        forceTLS: true,
        encrypted: false,
        wsHost: window.location.hostname,
        wsPort: 6001,
        wssPort: 6001,
        disableStats: true,
        enabledTransports: ['ws', 'wss']
    });
}


// import Vue from 'vue';
// Vue.mixin({
//   mounted(){
//     this.$echo.join(`liveUser`)
//     .here((users) => {
//       this.$store.commit('chat/SET_ONLINE_USERS', users);
//     })
//     .joining((user) => {
//       this.$store.commit('chat/ADD_USER_TO_ONLINE', user);
//     })
//     .leaving((user) => {
//       this.$store.commit('chat/REMOVE_USER_FROM_ONLINE', user);
//     });
//   }
// })




