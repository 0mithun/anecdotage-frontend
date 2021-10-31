import Vue from 'vue';
Vue.mixin({
  mounted(){
    if(this.$echo){
      this.$echo.join(`liveUser`)
      .here((users) => {
        this.$store.commit('chat/SET_ONLINE_USERS', users);
      })
      .joining((user) => {
        this.$store.commit('chat/ADD_USER_TO_ONLINE', user);
      })
      .leaving((user) => {
        this.$store.commit('chat/REMOVE_USER_FROM_ONLINE', user);
      });
    }
  }
})
