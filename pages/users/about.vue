<template>
  <div class="card card-m-5">
    <div class="card-body">
       <div class="about-header">
        <h4 class="about-name">About {{profile_user.name }}</h4>
        <button
          class="btn btn-default btn-sm about-edit-btn"
          data-toggle="modal"
          data-target="#aboutEditModal"
          @click.prevent="showModal = true"
          v-if="is_owner"
        >
        <i class="fas fa-edit"></i>
        </button>
      </div>
      <div v-html="profile_user.about"></div>
      <!-- <profile-map :profile_user="profile_user"></profile-map> -->

      <div
        class="modal fade"
        id="aboutEditModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        v-if="showModal"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
               <h4 class="modal-title" id="exampleModalLabel">Edit about</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>

            </div>
            <div class="modal-body">
              <div class="form-group">
                <textarea class="form-control" id="about-edit-body" rows="5" v-model="aboutBody" autofocus></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="saveAbout"
                :disabled="aboutBody == ''"
              >Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      aboutBody: '',
      showModal: false,
    };
  },
  computed:{
      ...mapGetters({
      profile_user: 'user/profileUser',
      profile_user_privacy: 'user/profileUserPrivacy',
    }),

    is_owner () {
      if(this.signedIn){
          return this.$store.state.auth.user.id == this.profile_user.id;
      }

      return false;
    },
    isBan(){
        if(this.signedIn){
          return this.$store.state.auth.user.is_banned;
        }
        return false;
    },
    signedIn(){
      return this.$auth.loggedIn;
    },
    isAdmin () {
      if(this.signedIn){
        return this.$store.state.auth.user.is_admin;
      }
      return false;
    },
    isShowProfile(){
      return true;
    }
  },
  mounted(){
    this.aboutBody = this.profile_user.about;
  },
  methods: {
    saveAbout() {
      this.$axios.$put(`settings/about`, {
          about: this.aboutBody
        })
        .then(res => {
          this.$store.commit('user/SET_USER',res);
          this.$toast.open({
            type:'success',
            position: 'top-right',
            message: 'About Update Successfully'
          });
          $("#aboutEditModal").modal("hide");
        });
    }
  },
    async fetch({ params, query, error, $axios, store,redirect }) {
      try {
        const userRresponse = await $axios.$get(`profile/${params.username}`);
        if(userRresponse.data.is_blocked){
          redirect('/');
        }
        store.commit('user/SET_USER', userRresponse.data);
        store.commit('user/SET_USER_PRIVACY', userRresponse.data.privacy);
      } catch (err) {
        if(err.response.status === 404){
          error({statusCode : 404, message:'Thread Not Found'})
        }
        else if(err.response.status === 403){
         redirect('/');
        }else if(err.response.status === 429){
          error({statusCode : 429, message:'Too Many Attempt'})
        }else if(err.response.status === 401){
          redirect('/login');
        }else{
          error({statusCode : 500, message:'Server Error'})
        }
      }
    },
};
</script>

<style lang="scss" scoped>
.about-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.about-name {
  color: black;
  font-weight: bold;
  padding: 0;
  font-size: 18px;
  font-weight: 700;
}
.about-edit-btn {
  font-size: 16px;
  color: black;
}
#about-edit-body {
  resize: vertical;
}
</style>
