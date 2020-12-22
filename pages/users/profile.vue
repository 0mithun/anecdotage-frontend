<template>
  <div class="container">
    <div class=" row">
      <div class="col-md-8">
        <div class="card card-m-5">
          <div class="card-body">

            <div class=" profile-header">
              <div class="profile-avatar">
                <img :src="profile_user.photo_url" alt class="profile-img" />
              </div>
              <div class="profile-details">
                <h2 class="profile-name">{{ profile_user.name}}</h2>
                <div class="profile-count">
                  <post-counts :post_count="profilePostCount"></post-counts>
                  <like-counts :like_counts="profileLikeCount"></like-counts>
                  <!-- <replies-counts :replies_count="replies_count"></replies-counts> -->
                  <!-- <favorite-counts :thread="profileFavoritePosts"></favorite-counts> -->
                  <profile-favorite-counts :favoriteCounts="profileFavoriteCount"></profile-favorite-counts>
                </div>
                <div class="profile-buttons">
                  <template v-if="!is_owner">
                    <button
                      class="btn btn-sm unfollow-btn"
                      @click.prevent="toggleFollow"
                      v-if="isFollow"
                    >Unfllow</button>
                    <button class="btn btn-sm follow-btn" @click.prevent="toggleFollow" v-else>Follow</button>
                  </template>
                  <!-- <add-friend :recipient="profile_user" :isFriend="is_friend" v-if="!is_owner"></add-friend> -->

                  <button
                    class="btn btn-default btn-sm"
                    data-toggle="modal"
                    data-target="#messageModal"
                    v-if="showMessageButton"
                    @click="showModal=true"
                  >
                    <i class="fa fa-envelope"></i>
                  </button>

                  <div class="btn-group" v-if="is_owner">
                    <button
                      class="btn btn-default btn-sm dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <!-- <a :href="editUrl">Edit my information</a> -->
                        <!-- <a :href="settingsUrl">Settings</a> -->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- <div class="profile-tags" v-if="followings.length> 0">
                  <strong>Following:</strong>
                  <a
                    :href="profilePath(following)"
                    class="single-tags-name"
                    v-for="(following,index) in followings"
                    :key="index"
                  >
                    #
                    <span>{{ following.name.toLowerCase() }}</span>
                  </a>
                </div> -->
              </div>
            </div>
            <ul class="nav profile-nav  justify-content-between">
              <li class="nav-item">
                <nuxt-link :to="{name:'profile.show.about', params:{username:profile_user.username}}" class="nav-link" href="#">About</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{name:'profile.show.friends', params:{username:profile_user.username}}"  class="nav-link" href="#">Friends
                   <!-- <span
                        style="color:black; font-weight:bold"
                      >{{ friendsCount | formatCount }}</span> -->
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{name:'profile.show.followings', params:{username:profile_user.username}}" class="nav-link" href="#">Following</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{name:'profile.show.posts', params:{username:profile_user.username}}" class="nav-link " href="#">Posts</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{name:'profile.show.favorites', params:{username:profile_user.username}}" class="nav-link " href="#">Favorites</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{name:'profile.show.likes', params:{username:profile_user.username}}" class="nav-link " href="#">Likes</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{name:'profile.show.subscriptions', params:{username:profile_user.username}}" class="nav-link " href="#">Subscriptions</nuxt-link>
              </li>
            </ul>
          </div>
        </div>

        <NuxtChild  />

      </div>
      <div class="col-md-4 sidebar">
         <Sidebar />
      </div>
    </div>




  </div>
</template>

<script>
// import About from "./ProfileAbout";
// import Friends from "./ProfileFriends";
// import PostTab from "./PostsTab";
// import LikeTab from "./LikeTab";
// import FavoriteTab from "./FavoriteTab";
// import SubscribeTab from "./SubscribeTab";


import PostCounts from '@/components/counts/PostCounts';
import LikeCounts from '@/components/counts/LikeCounts';
import ProfileFavoriteCounts from '@/components/counts/ProfileFavoriteCounts';
import Sidebar from '@/layouts/partials/Sidebar'


  import {mapGetters} from 'vuex';

export default {
  components: {
    // About,
    // Friends,
    // PostTab,
    // LikeTab,
    // FavoriteTab,
    // SubscribeTab,
    PostCounts,
    LikeCounts,
    ProfileFavoriteCounts,
    Sidebar
  },
  data() {
    return {
      showModal: false,
      showMessageButton: true,
      newMessage: "",

      favorites: [],
      likes: [],
      replies_count:0,
      // isFollow: false,
    };
  },
  computed: {
    ...mapGetters({
      profilePostCount: 'user/threadsCount',
      profileLikeCount: 'user/likesCount',
      profileFavoriteCount: 'user/favoritesCount',
      is_friend: 'user/is_friend',
      isFollow: 'user/is_follow',

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

    // profileFavoritePosts(){
    //   return this.$store.getters.profileFavoritePosts;
    //   // return [];
    // },
    // followings() {
    //   return this.$store.getters.followings;
    // },
    // friendsCount() {
    //   return this.$store.getters.friends.length;
    // },
    // isShowProfile() {
    //   if (this.is_owner == true) {
    //     return true;
    //   } else if (this.profile_user.id == 1) {
    //     return true;
    //   } else if (this.profile_user_privacy.see_my_profiles == 3) {
    //     return true;
    //   } else if (
    //     this.profile_user_privacy.see_my_profiles == 2 &&
    //     this.is_friend == true
    //   ) {
    //     return true;
    //   }
    // },
    // isShowFriends() {
    //   if (this.is_owner == true) {
    //     return true;
    //   } else if (this.profile_user.id == 1) {
    //     return true;
    //   } else if (this.profile_user_privacy.see_my_friends == 3) {
    //     return true;
    //   } else if (
    //     this.profile_user_privacy.see_my_friends == 2 &&
    //     this.is_friend == true
    //   ) {
    //     return true;
    //   }
    // },
    // isShowPosts() {
    //   if (this.is_owner == true) {
    //     return true;
    //   } else if (this.profile_user.id == 1) {
    //     return true;
    //   } else if (this.profile_user_privacy.see_my_threads == 3) {
    //     return true;
    //   } else if (
    //     this.profile_user_privacy.see_my_threads == 2 &&
    //     this.is_friend == true
    //   ) {
    //     return true;
    //   }
    // },
    // isShowFavorites() {
    //   if (this.is_owner == true) {
    //     return true;
    //   } else if (this.profile_user.id == 1) {
    //     return true;
    //   } else if (this.profile_user_privacy.see_my_favorites == 3) {
    //     return true;
    //   } else if (
    //     this.profile_user_privacy.see_my_favorites == 2 &&
    //     this.is_friend == true
    //   ) {
    //     return true;
    //   }
    // },

    // settingsUrl() {
    //   return `/profiles/${this.profile_user.username}/settings`;
    // },
    // editUrl() {
    //   return `/profiles/${this.profile_user.username}/edit`;
    // },
  },
  created() {
    // this.checkPrivacy();
    // if (this.isShowPosts) {
    //   this.getAllPost();
    // }
    // if (this.isShowFavorites) {
    //   this.getAllFavoritePost();
    // }
    // if (this.is_owner) {
    //   this.getAllLikePost();
    //   // this.getAllSubscriptionPost();
    // }

    // if (!this.is_owner) {
    //   this.checkIsFollow();
    // }

    // this.getProfileComments()
  },
  methods: {
    getProfileComments(){
      axios.get(`/profiles/${this.profile_user.username}/comments`)
        .then((res) => {
          this.replies_count = res.data.replies_count
          // this.$store.dispatch("profilePosts", res.data.threads);
        });
    },
    getAllPost() {
      axios
        .get(`/profiles/${this.profile_user.username}/threads`)
        .then((res) => {
          // this.posts = res.data.threads;
          this.$store.dispatch("profilePosts", res.data.threads);
          this.$store.dispatch("profileTotalRecords", res.data.total_records);
        });
    },
    getAllLikePost() {
      axios.get(`/profiles/${this.profile_user.username}/likes`).then((res) => {
        // this.posts = res.data.threads;
        this.$store.dispatch("profileLikePosts", res.data.threads);
        this.$store.dispatch("profileLikeTotalRecords", res.data.total_records);

      });
    },
    getAllFavoritePost() {
      axios
        .get(`/profiles/${this.profile_user.username}/favorites`)
        .then((res) => {
          // this.posts = res.data.threads;
          this.$store.dispatch("profileFavoritePosts", res.data.threads);

          this.$store.dispatch("profileFavoriteTotalRecords", res.data.total_records);

        });
    },
    toggleFollow() {
      let url = `/user/${this.profile_user.username}/follow`;

      axios.post(url).then((res) => {
        if (this.isFollow) {
          this.$store.dispatch("removeFollowers", window.App.user.id);
        } else {
          this.$store.dispatch("addFollowers", window.App.user);
        }
        this.isFollow = !this.isFollow;

        flash(res.data.message);
      });
    },
    unfollow(friend) {
      let url = "";
      if (friend.followType == "tag") {
        url = `/tag/${friend.id}/follow`;
      } else if (friend.followType == "user") {
        url = `/user/${friend.username}/follow`;
      }
      axios.post(url).then((res) => {
        this.$store.dispatch("removeFollowings", friend);

        flash(res.data.message);
      });
    },
    profilePath(item) {
      if (item.followType == "user") {
        return `/profiles/${item.username}`;
      } else if (item.followType === "tag") {
        return `/threads/${item.name.toLowerCase()}`;
      }
    },
    checkIsFollow() {
      axios.get(`/user/${this.profile_user.username}/is-follow`).then((res) => {
        this.isFollow = res.data;
      });
    },
    checkPrivacy() {
      if (this.is_friend) {
        this.showMessageButton = true;
      } else if (this.profile_user.userprivacy.send_me_message === 2) {
        this.showMessageButton = true;
      } else if (this.profile_user.userprivacy.send_me_message === 1) {
        this.showMessageButton = false;
      }
    },

    sendMessage() {
      axios
        .post("/chat-send-message", {
          message: this.newMessage,
          friend: this.profile_user.id,
          friend_message: this.is_friend,
        })
        .then((res) => {
          this.newMessage = "";
          this.showModal = false;
          $("#messageModal").modal("hide");
        });
    },
  },
   async fetch({ params, query, error, $axios, store,redirect }) {
      try {
        const userRresponse = await $axios.$get(`profile/${params.username}`);
        if(userRresponse.data.is_blocked){
          redirect('/');
        }

        const threadRresponse = await $axios.$get(`profile/${params.username}/threads`);
        const favoriteRresponse = await $axios.$get(`profile/${params.username}/favorites`);
        const likeRresponse = await $axios.$get(`profile/${params.username}/likes`);
        store.commit('user/SET_USER', userRresponse.data);
        store.commit('user/SET_USER_PRIVACY', userRresponse.data.privacy);

        store.commit('user/SET_THREADS', threadRresponse.data);
        store.commit('user/SET_FAVORITES', favoriteRresponse.data);
        store.commit('user/SET_LIKES', likeRresponse.data);

        store.commit('user/SET_IS_FRIEND', userRresponse.data.is_friend);
        store.commit('user/SET_IS_FOLLOW', userRresponse.data.is_follow);

      } catch (err) {
        if(err.response.status === 404){
          error({statusCode : 404, message:'user Not Found'})
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
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.profile-name {
  padding: 0;
  margin: 0;
  color: black;
}
.profile-buttons {
  padding: 10px 0px;
}
.profile-img {
  width: 120px;
  height: 120px;
  padding: 3px;
  border: 2px solid rgb(255, 67, 1);
  border-radius: 50%;
}

.profile-avatar {
  margin-right: 30px;
}
.profile-count {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.follow-btn {
  width: 100px;
  background-color: rgb(255, 67, 1);
  color: white;
}

.unfollow-btn {
  width: 100px;
  background-color: red;
  color: white;
}

.nav-item > li > a {
  color: black;
  border: none;
  margin-right: 0;
}
.nav-item > li > a.nav-link,
.nav-item > li > a.nav-link:hover,
.nav-item > li > a.nav-link:focus {
  border: none;
}
.nav-item > li.active > a.nav-link,
.nav-item > li.active > a.nav-link:hover,
.nav-item > li.active > a.nav-link:focus {
  color: #555555;
  background-color: #f5f8fa;
  border-bottom: 3px solid rgb(255, 67, 1);
  cursor: default;
}
.profile-nav-tabs {
  display: flex;
  justify-content: space-between;
}
.profile-nav-tabs::before,
.profile-nav-tabs::after {
  content: none;
}

.single-tags-name {
  color: black;
}
.single-tags-name span {
  color: rgb(255, 67, 1);
}

.friends-avatar {
  width: 80px;
  height: 80px;
  padding: 10px;
  border-radius: 15px;
}
.friends-name {
  font-size: 14px;
  color: black;
  font-weight: bold;
  padding: 0;
}
.unfriend-btn {
  margin-left: auto;
}
.sidebar {
}
.counts-item {
  margin: 0 5px;
}

.profile-name{
    padding: 0;
    margin: 0;
    color: black;
    font-size: 30px;
    font-weight: 500;
}
 ul.profile-nav{

   a.nav-link{
     color: #000;
     font-size: 14px;
   }

  a.nav-link.active, a.nav-link:hover, a.nav-link:focus {
      color: #555555;
      background-color: #f5f8fa;

      cursor: pointer;
  }
  a.nav-link.router-link-exact-active{
    border-bottom: 3px solid rgb(255, 67, 1);
  }
 }
hr.profile-bottom {
    margin: 0;
}

</style>
