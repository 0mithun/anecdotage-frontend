<template>
  <div class="btn-group">
    <template v-if="is_friend">
      <button
        class="btn btn-default btn-sm dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fa fa-user" aria-hidden="true"></i>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a @click.prevent="unfriend(recipient)">Unfriend</a>
        </li>
        <li>
          <a @click.prevent="block(recipient)">Block</a>
        </li>
      </ul>
    </template>
    <template v-else>
      <template v-if="sentRequst">
        <button
          class="btn btn-success btn-sm dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fa fa-ellipsis-h" aria-hidden="true"></i> Request sent
        </button>
        <ul class="dropdown-menu">
          <li>
            <a href="#" @click.prevent="cancelRequest(recipient)" class="cancel-request">Cancel Request</a>
          </li>
        </ul>
      </template>
       <template v-else-if="sentUserRequst">
        <div class="dropdown">
          <button class="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <i class="fa fa-ellipsis-h" aria-hidden="true"></i> Confirm
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a  @click.prevent="accept"  class="dropdown-item" href="#">Accept</a>
            <a @click.prevent="cancelRequest(recipient)"  class="dropdown-item" href="#">Delete</a>
          </div>
        </div>
      </template>
      <template v-else>
        <button
          class="btn btn-primary btn-sm"
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
      unfriend: 'friends/unfriend',
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
