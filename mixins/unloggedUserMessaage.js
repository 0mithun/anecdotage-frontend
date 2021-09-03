export default {
  methods: {
    showSaveDataMessage(){
      if(!this.$store.state.unlogged.messageShowing){
        this.$toast.open({
          type:'info',
          position: 'top-right',
          duration: 5000,
          message: `Would you like an account? If you register, we'll save your ratings and <br> offer personalized recommendations (in the top menu).`
        });
        this.$store.commit('unlogged/MESSAGE_SHOWING')
      }
    }
  }
}
