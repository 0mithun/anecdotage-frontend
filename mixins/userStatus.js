
export default {
  computed:{
    isBan() {
      if (this.signedIn) {
        return this.$store.state.auth.user.is_banned;
      }
      return false;
    },
    signedIn() {
      return this.$auth.loggedIn;
    },
    isAdmin() {
      if (this.signedIn) {
        return this.$store.state.auth.user.is_admin;
      }
      return false;
    },
  }
}



