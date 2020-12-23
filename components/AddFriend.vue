<template>
  <div class="btn-group">
    <template v-if="is_friend">
        <div class="dropdown">
          <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-user-check"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a @click.prevent="unfriend(recipient)"  class="dropdown-item" href="#"> <i class="fas fa-user-minus"></i> Unfriend</a>
            <a  @click.prevent="block(recipient)"  class="dropdown-item btn btn-danger" href="#"> <i class="fas fa-user-times"></i>  Block</a>
          </div>
        </div>

    </template>
    <template v-else>
      <template v-if="sentRequst">
        <div class="dropdown">
          <button class="btn btn-dark btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <i class="fa fa-ellipsis-h" aria-hidden="true"></i> Request sent
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a @click.prevent="cancelRequest(recipient)"  class="dropdown-item" href="#"> <i class="fas fa-user-slash"></i>   Cancel Request</a>
          </div>
        </div>



      </template>
       <template v-else-if="sentUserRequst">
        <div class="dropdown">
          <button class="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <i class="fa fa-ellipsis-h" aria-hidden="true"></i> Respond
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a  @click.prevent="accept"  class="dropdown-item" href="#"> <i class="fas fa-user-friends"></i>  Accept</a>
            <a @click.prevent="cancelRequest(recipient)"  class="dropdown-item" href="#"> <i class="fas fa-user-slash"></i>  Delete</a>
          </div>
        </div>
      </template>
      <template v-else>
        <button
          class="btn btn-info btn-sm"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          @click.prevent="addFriend(recipient)"
        >
          <i class="fa fa-user-plus" aria-hidden="true"></i>
        </button>
      </template>
    </template>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  props: ["recipient",],

  computed:{
    ...mapGetters({
      is_friend: 'user/is_friend',
      sentRequst:'friends/sentRequst',
      sentUserRequst: 'friends/sentUserRequst',
    }),
  },
  created() {
    if (!this.is_friend) {
        this.checkSentRequest(this.recipient);
        this.checkUserSentRequest(this.recipient);
      }
  },

  methods: {
    ...mapActions({
      block: 'friends/block',
      addFriend: 'friends/addFriend',
      checkSentRequest: 'friends/checkSentRequest',
      checkUserSentRequest: 'friends/checkUserSentRequest',
      cancelRequest: 'friends/cancelRequest',
    }),
    accept(){
      this.$store.dispatch('friends/accept', this.recipient);
      this.$store.commit('user/SET_IS_FRIEND', true);
      this.$store.commit('friends/ACCEPT', this.$auth.user);
      this.$store.commit('friends/SET_FRIEND_REQUEST', false);
      this.$store.commit('friends/SET_USER_FRIEND_REQUEST', false);
    },
    unfriend(){
      this.$store.dispatch('friends/unfriend', this.recipient);
      this.$store.commit('user/SET_IS_FRIEND', false);
    }

  }
};
</script>

<style  scoped>

  .cancel-request{
    padding-right: 0px;
    padding-left: 10px;
  }
</style>
