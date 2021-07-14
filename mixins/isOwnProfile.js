
export default {
  computed:{
    is_owner() {
      if (this.signedIn) {
        return this.$store.state.auth.user.id == this.profile_user.id;
      }

      return false;
    },
  }
}

