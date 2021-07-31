<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="card card-m-5">
          <div class="card-body">
            <div class="profile-header">
              <div class="profile-avatar">
                <img :src="profile_user.photo_url" alt class="profile-img" />
              </div>
              <div class="profile-details">
                <h2 class="profile-name">{{ profile_user.name }}</h2>
                <div class="profile-count">
                  <post-counts :post_count="profilePostCount"></post-counts>
                  <like-counts :like_counts="profileLikeCount"></like-counts>
                  <!-- <replies-counts :replies_count="replies_count"></replies-counts> -->
                  <!-- <favorite-counts :thread="profileFavoritePosts"></favorite-counts> -->
                  <profile-favorite-counts
                    :favoriteCounts="profileFavoriteCount"
                  ></profile-favorite-counts>
                </div>
                <div class="profile-buttons">
                  <template v-if="!is_owner">
                    <button
                      class="btn btn-sm unfollow-btn"
                      @click.prevent="unfollow(profile_user)"
                      v-if="isFollow"
                    >
                      Unfllow
                    </button>
                    <button
                      class="btn btn-sm follow-btn"
                      @click.prevent="follow(profile_user)"
                      v-else
                    >
                      Follow
                    </button>
                  </template>
                  <AddFriend
                    :recipient="profile_user"
                    :isFriend="is_friend"
                    v-if="!is_owner"
                  ></AddFriend>

                  <button
                    class="btn btn-default btn-sm"
                    data-toggle="modal"
                    data-target="#messageModal"
                    v-if="isSendMessage"
                    @click.prevent="showMessageModal"
                  >
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                    </svg>
                  </button>

                  <div class="btn-group" v-if="is_owner">
                    <button
                      class="btn btn-default btn-sm dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-h" class="svg-inline--fa fa-ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                      </svg>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <nuxt-link
                          :to="{
                            name: 'profile.settings.info',
                            params: { username: $auth.user.username },
                          }"
                          class="dropdown-item"
                          href="#"
                          title="Setting"
                        >
                          Edit my information
                        </nuxt-link>

                        <nuxt-link
                          :to="{
                            name: 'profile.settings.privacy',
                            params: { username: $auth.user.username },
                          }"
                          class="dropdown-item"
                          href="#"
                          title="Setting"
                        >
                          Settings
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <ul class="nav profile-nav">
              <li class="nav-item">
                <nuxt-link
                  :to="{
                    name: 'profile.show.about',
                    params: { username: profile_user.username },
                  }"
                  class="nav-link"
                  href="#"
                  >About</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="isShowFriends">
                <nuxt-link
                  :to="{
                    name: 'profile.show.friends',
                    params: { username: profile_user.username },
                  }"
                  class="nav-link"
                  href="#"
                  >Friends
                  <span style="color: black; font-weight: bold">{{
                    friendsCount | formatCount
                  }}</span>
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="isShowPosts">
                <nuxt-link
                  :to="{
                    name: 'profile.show.posts',
                    params: { username: profile_user.username },
                  }"
                  class="nav-link"
                  href="#"
                  >Posts</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="isShowFavorites">
                <nuxt-link
                  :to="{
                    name: 'profile.show.favorites',
                    params: { username: profile_user.username },
                  }"
                  class="nav-link"
                  href="#"
                  >Favorites</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="is_owner">
                <nuxt-link
                  :to="{
                    name: 'profile.show.likes',
                    params: { username: profile_user.username },
                  }"
                  class="nav-link"
                  href="#"
                  >Likes</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="is_owner">
                <nuxt-link
                  :to="{
                    name: 'profile.show.subscriptions',
                    params: { username: profile_user.username },
                  }"
                  class="nav-link"
                  href="#"
                  >Subscriptions</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>

        <NuxtChild />
      </div>
      <div class="col-md-4 sidebar">
        <Sidebar />
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="messageModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Send message</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <textarea
                name="newMessage"
                id="newMessage"
                cols="30"
                rows="3"
                v-model="newMessage"
                class="form-control"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary btn-sm"
              type="button"
              @click.prevent="sendMessage"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostCounts from '@/components/counts/PostCounts';
import LikeCounts from '@/components/counts/LikeCounts';
import ProfileFavoriteCounts from '@/components/counts/ProfileFavoriteCounts';
import AddFriend from '@/components/AddFriend';
import Sidebar from '@/layouts/partials/Sidebar';
import isOwnProfile from '@/mixins/isOwnProfile'
import userStatus from '@/mixins/userStatus'
import formatCount from '@/mixins/formatCount'
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    PostCounts,
    LikeCounts,
    ProfileFavoriteCounts,
    AddFriend,
    Sidebar,
  },
  mixins: [isOwnProfile, userStatus, formatCount],
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  data() {
    return {
      showModal: false,
      newMessage: '',

      favorites: [],
      likes: [],
      replies_count: 0,
      // isFollow: false,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      friendsCount: 'friends/friendsCount',
      profilePostCount: 'user/threadsCount',
      profileLikeCount: 'user/likesCount',
      profileFavoriteCount: 'user/favoritesCount',
      is_friend: 'user/is_friend',
      isFollow: 'user/is_follow',

      profile_user: 'user/profileUser',
      profile_user_privacy: 'user/profileUserPrivacy',
    }),

    isSendMessage() {
      if (this.is_owner == true) {
        return false;
      } else if (this.isAdmin) {
        return true;
      } else if (this.profile_user_privacy.send_me_message == 2) {
        return true;
      } else if (
        this.profile_user_privacy.send_me_message == 1 &&
        this.is_friend == true
      ) {
        return true;
      }
      return false;
    },

    isShowProfile() {
      if (this.is_owner == true) {
        return true;
      } else if (this.isAdmin) {
        return true;
      } else if (this.profile_user_privacy.see_my_profiles == 3) {
        return true;
      } else if (
        this.profile_user_privacy.see_my_profiles == 2 &&
        this.is_friend == true
      ) {
        return true;
      }
      return false;
    },
    isShowFriends() {
      if (this.is_owner == true) {
        return true;
      } else if (this.is_admin) {
        return true;
      } else if (this.profile_user_privacy.see_my_friends == 3) {
        return true;
      } else if (
        this.profile_user_privacy.see_my_friends == 2 &&
        this.is_friend == true
      ) {
        return true;
      }
      return false;
    },
    isShowPosts() {
      if (this.is_owner == true) {
        return true;
      } else if (this.is_admin) {
        return true;
      } else if (this.profile_user_privacy.see_my_threads == 3) {
        return true;
      } else if (
        this.profile_user_privacy.see_my_threads == 2 &&
        this.is_friend == true
      ) {
        return true;
      }
      return false;
    },
    isShowFavorites() {
      if (this.is_owner == true) {
        return true;
      } else if (this.is_admin) {
        return true;
      } else if (this.profile_user_privacy.see_my_favorites == 3) {
        return true;
      } else if (
        this.profile_user_privacy.see_my_favorites == 2 &&
        this.is_friend == true
      ) {
        return true;
      }
      return false;
    },
  },

  methods: {
    ...mapActions({
      follow: 'user/follow',
      unfollow: 'user/unfollow',
    }),
    getProfileComments() {
      axios
        .get(`/profiles/${this.profile_user.username}/comments`)
        .then((res) => {
          this.replies_count = res.data.replies_count;
          // this.$store.dispatch("profilePosts", res.data.threads);
        });
    },
    getAllPost() {
      axios
        .get(`/profiles/${this.profile_user.username}/threads`)
        .then((res) => {
          // this.posts = res.data.threads;
          this.$store.dispatch('profilePosts', res.data.threads);
          this.$store.dispatch('profileTotalRecords', res.data.total_records);
        });
    },
    getAllLikePost() {
      axios.get(`/profiles/${this.profile_user.username}/likes`).then((res) => {
        // this.posts = res.data.threads;
        this.$store.dispatch('profileLikePosts', res.data.threads);
        this.$store.dispatch('profileLikeTotalRecords', res.data.total_records);
      });
    },
    getAllFavoritePost() {
      axios
        .get(`/profiles/${this.profile_user.username}/favorites`)
        .then((res) => {
          // this.posts = res.data.threads;
          this.$store.dispatch('profileFavoritePosts', res.data.threads);

          this.$store.dispatch(
            'profileFavoriteTotalRecords',
            res.data.total_records
          );
        });
    },
    profilePath(item) {
      if (item.followType == 'user') {
        return `/profiles/${item.username}`;
      } else if (item.followType === 'tag') {
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

    async sendMessage() {
      try {
        const message = await this.$axios.$post(
          `chat/user/${this.profile_user.username}/messages`,
          {
            message: this.newMessage,
          }
        );
        this.$store.commit('chat/ADD_NEW_MESSAGE', message);
        this.newMessage = '';

        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Message sent successfully',
        });
        $('#messageModal').modal('hide');
      } catch (e) {}
    },
    showMessageModal() {
      $('#messageModal').modal('show');
    },
  },
  async fetch({ params, query, error, $axios, store, redirect }) {
    try {
      const userRresponse = await $axios.$get(`profile/${params.username}`);
      if (userRresponse.data.is_blocked) {
        redirect('/');
      }

      const threadRresponse = await $axios.$get(
        `profile/${params.username}/threads`
      );
      const favoriteRresponse = await $axios.$get(
        `profile/${params.username}/favorites`
      );
      if (userRresponse.data.is_owner) {
        const likeRresponse = await $axios.$get(
          `profile/${params.username}/likes`
        );
        store.commit('user/SET_LIKES', likeRresponse.data);
        store.commit('user/SET_LIKES_COUNT', likeRresponse.meta.total);
      }

      store.commit('user/SET_USER', userRresponse.data);
      store.commit('user/SET_USER_PRIVACY', userRresponse.data.privacy);

      store.commit('user/SET_THREADS', threadRresponse.data);
      store.commit('user/SET_THREADS_COUNT', threadRresponse.meta.total);

      store.commit('user/SET_FAVORITES', favoriteRresponse.data);
      store.commit('user/SET_FAVORITES_COUNT', favoriteRresponse.meta.total);

      store.commit('user/SET_IS_FRIEND', userRresponse.data.is_friend);
      store.commit('user/SET_IS_FOLLOW', userRresponse.data.is_follow);
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'user Not Found' });
      } else if (err.response.status === 403) {
        redirect('/');
      } else if (err.response.status === 429) {
        error({ statusCode: 429, message: 'Too Many Attempt' });
      } else if (err.response.status === 401) {
        redirect('/login');
      } else {
        error({ statusCode: 500, message: 'Server Error' });
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
  // justify-content: space-between;
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

.profile-name {
  padding: 0;
  margin: 0;
  color: black;
  font-size: 30px;
  font-weight: 500;
}
ul.profile-nav {
  a.nav-link {
    color: #000;
    font-size: 14px;
  }

  a.nav-link.active,
  a.nav-link:hover,
  a.nav-link:focus {
    color: #555555;
    background-color: #f5f8fa;

    cursor: pointer;
  }
  a.nav-link.router-link-exact-active {
    border-bottom: 3px solid rgb(255, 67, 1);
  }
}
hr.profile-bottom {
  margin: 0;
}
.nav-item {
  margin-right: 20px;
}
.modal-title {
  font-size: 16px;
  font-weight: bold;
}
</style>
