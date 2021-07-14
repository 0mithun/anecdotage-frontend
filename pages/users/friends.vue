<template>
  <div class="card card-m-5">
    <div class="card-body friends-card-body">
      <div class="friends-header">
        <div class="friends-menu">
          <ul class="nav nav-tabs friend-nav-tabs justify-content-between">
            <li @click="searchItem = ''">
              <a data-toggle="tab" href="#friend-friends" class="active"
                >Friends</a
              >
            </li>
            <li class v-if="is_owner" @click="searchItem = ''">
              <a data-toggle="tab" href="#friend-request">Friend Requests</a>
            </li>
            <li v-if="is_owner" @click="searchItem = ''">
              <a data-toggle="tab" href="#friend-blocking">Blockng</a>
            </li>
            <li @click="searchItem = ''">
              <a data-toggle="tab" href="#friend-following">Following</a>
            </li>
            <li @click="searchItem = ''">
              <a data-toggle="tab" href="#friend-followers">Followers</a>
            </li>
          </ul>
        </div>
        <div class="friends-search">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="searchItem"
          />
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane active" id="friend-friends">
          <div class="row">
            <div class="col-md-12" v-if="filterFriendLists.length < 1">
              <alert class="alert-danger">No Records found</alert>
            </div>
            <div
              class="col-md-6"
              v-for="(friend, index) in filterFriendLists"
              :key="index"
            >
              <div class="profile-single-item">
                <nuxt-link
                  :to="{
                    name: 'profile.show',
                    params: { username: friend.username },
                  }"
                >
                  <img
                    :src="friend.photo_url"
                    :alt="friend.name"
                    class="friends-avatar"
                  />
                </nuxt-link>
                <nuxt-link
                  :to="{
                    name: 'profile.show',
                    params: { username: friend.username },
                  }"
                  class="friends-name"
                  >{{ friend.name }}</nuxt-link
                >

                <button
                  class="btn btn-dark btn-sm unfriend-btn"
                  @click.prevent="unfriend(friend)"
                  v-if="friend.username !== $auth.user.username"
                >
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-minus" class="svg-inline--fa fa-user-minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="friend-request" v-if="is_owner">
          <div class="row">
            <div class="col-md-12" v-if="filterFriendRequests.length < 1">
              <alert class="alert-danger">No Records found</alert>
            </div>
            <div
              class="col-md-6"
              v-for="(friend, index) in filterFriendRequests"
              :key="index"
            >
              <div class="profile-single-item">
                <nuxt-link
                  :to="{
                    name: 'profile.show',
                    params: { username: friend.username },
                  }"
                >
                  <img
                    :src="friend.photo_url"
                    :alt="friend.name"
                    class="friends-avatar"
                  />
                </nuxt-link>
                <nuxt-link
                  :to="{
                    name: 'profile.show',
                    params: { username: friend.username },
                  }"
                  class="friends-name"
                  >{{ friend.name }}</nuxt-link
                >

                <button
                  class="btn btn-primary btn-sm"
                  @click.prevent="accept(friend)"
                >
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="friend-blocking" v-if="is_owner">
          <div class="row">
            <div class="col-md-12" v-if="filterBlockLists.length < 1">
              <alert class="alert-danger">No Records found</alert>
            </div>
            <div
              class="col-md-6"
              v-for="(friend, index) in filterBlockLists"
              :key="index"
            >
              <div class="profile-single-item">
                <nuxt-link
                  :to="{
                    name: 'profile.show',
                    params: { username: friend.username },
                  }"
                >
                  <img
                    :src="friend.photo_url"
                    :alt="friend.name"
                    class="friends-avatar"
                  />
                </nuxt-link>
                <nuxt-link
                  :to="{
                    name: 'profile.show',
                    params: { username: friend.username },
                  }"
                  class="friends-name"
                  >{{ friend.name }}</nuxt-link
                >

                <button
                  class="btn btn-primary btn-sm unfriend-btn"
                  @click.prevent="unblock(friend)"
                >
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="friend-following">
          <div class="row">
            <div class="col-md-12" v-if="filterFollowings.length < 1">
              <alert class="alert-danger">No Records found</alert>
            </div>
            <div
              class="col-md-6"
              v-for="(friend, index) in filterFollowings"
              :key="index"
            >
              <div class="profile-single-item">
                <template v-if="friend.follow_type == 'user'">
                  <nuxt-link
                    :to="{
                      name: 'profile.show',
                      params: { username: friend.username },
                    }"
                  >
                    <img
                      :src="friend.photo_url"
                      :alt="friend.name"
                      class="friends-avatar"
                    />
                  </nuxt-link>
                  <nuxt-link
                    :to="{
                      name: 'profile.show',
                      params: { username: friend.username },
                    }"
                    class="friends-name"
                    >{{ friend.name }}</nuxt-link
                  >
                </template>
                <template v-else-if="friend.follow_type == 'tag'">
                  <nuxt-link
                    :to="{ name: 'tags', params: { slug: friend.slug } }"
                  >
                    <img
                      :src="friend.photo_url"
                      :alt="friend.name"
                      class="friends-avatar"
                    />
                  </nuxt-link>
                  <nuxt-link
                    :to="{ name: 'tags', params: { slug: friend.slug } }"
                    class="friends-name"
                    >{{ friend.name }}</nuxt-link
                  >
                </template>
                <button
                  class="btn btn-danger btn-sm unfriend-btn"
                  @click.prevent="unfollow(friend)"
                  v-if="is_owner"
                >
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-times" class="svg-inline--fa fa-user-times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M589.6 240l45.6-45.6c6.3-6.3 6.3-16.5 0-22.8l-22.8-22.8c-6.3-6.3-16.5-6.3-22.8 0L544 194.4l-45.6-45.6c-6.3-6.3-16.5-6.3-22.8 0l-22.8 22.8c-6.3 6.3-6.3 16.5 0 22.8l45.6 45.6-45.6 45.6c-6.3 6.3-6.3 16.5 0 22.8l22.8 22.8c6.3 6.3 16.5 6.3 22.8 0l45.6-45.6 45.6 45.6c6.3 6.3 16.5 6.3 22.8 0l22.8-22.8c6.3-6.3 6.3-16.5 0-22.8L589.6 240zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="friend-followers">
          <div class="row">
            <div class="col-md-12" v-if="filterFollowers.length < 1">
              <alert class="alert-danger">No Records found</alert>
            </div>
            <div
              class="col-md-6"
              v-for="(friend, index) in filterFollowers"
              :key="index"
            >
              <div class="profile-single-item">
                <nuxt-link
                  :to="{
                    name: 'profile.show',
                    params: { username: friend.username },
                  }"
                >
                  <img
                    :src="friend.photo_url"
                    :alt="friend.name"
                    class="friends-avatar"
                  />
                </nuxt-link>
                <nuxt-link
                  :to="{
                    name: 'profile.show',
                    params: { username: friend.username },
                  }"
                  class="friends-name"
                  >{{ friend.name }}</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import isOwnProfile from '@/mixins/isOwnProfile'
import userStatus from '@/mixins/userStatus'

export default {
  data() {
    return {
      searchItem: '',
    };
  },
    mixins: [isOwnProfile, userStatus],
  head() {
    return {
      title: this.settings.site_title,
    };
  },

  computed: {
    ...mapGetters({
      settings: 'settings',
      profile_user: 'user/profileUser',
      profile_user_privacy: 'user/profileUserPrivacy',
      is_friend: 'user/is_friend',
      isFollow: 'user/is_follow',
      friends: 'friends/friends',
      friendRequests: 'friends/friendRequests',
      blockLists: 'friends/blockLists',
      followers: 'friends/followers',
      followings: 'friends/followings',
    }),

    isShowProfile() {
      return true;
    },
    filterFriendLists() {
      return this.friends.filter((item) => {
        return item.name.toLowerCase().includes(this.searchItem.toLowerCase());
      });
    },
    filterFriendRequests() {
      return this.friendRequests.filter((item) => {
        return item.name.toLowerCase().includes(this.searchItem.toLowerCase());
      });
    },
    filterBlockLists() {
      return this.blockLists.filter((item) => {
        return item.name.toLowerCase().includes(this.searchItem.toLowerCase());
      });
    },
    filterFollowings() {
      return this.followings.filter((item) => {
        return item.name.toLowerCase().includes(this.searchItem.toLowerCase());
      });
    },
    filterFollowers() {
      return this.followers.filter((item) => {
        return item.name.toLowerCase().includes(this.searchItem.toLowerCase());
      });
    },
  },
  methods: {
    ...mapActions({
      unfriend: 'friends/unfriend',
      accept: 'friends/accept',
      unblock: 'friends/unblock',
      unfollow: 'friends/unfollow',
    }),
  },
  async fetch({ params, query, error, $axios, store, redirect }) {
    try {
      const userRresponse = await $axios.$get(`profile/${params.username}`);
      if (userRresponse.data.is_blocked) {
        redirect('/');
      }
      const friendRresponse = await $axios.$get(
        `user/${params.username}/friends/friend-list`
      );
      if (userRresponse.data.is_owner) {
        const blockRresponse = await $axios.$get(
          `user/${params.username}/friends/block-list`
        );
        const friendRequestRresponse = await $axios.$get(
          `user/${params.username}/friends/friend-request-list`
        );
        store.commit('friends/SET_BLOCK_LISTS', blockRresponse.data);
        store.commit(
          'friends/SET_FRIEND_REQUESTS',
          friendRequestRresponse.data
        );
      }
      const followingsRresponse = await $axios.$get(
        `user/${params.username}/friends/followings`
      );
      const followersRresponse = await $axios.$get(
        `user/${params.username}/friends/followers`
      );

      store.commit('user/SET_USER', userRresponse.data);
      store.commit('user/SET_USER_PRIVACY', userRresponse.data.privacy);
      store.commit('user/SET_IS_FRIEND', userRresponse.data.is_friend);
      store.commit('user/SET_IS_FOLLOW', userRresponse.data.is_follow);

      store.commit('friends/SET_FRIENDS', friendRresponse.data);

      store.commit('friends/SET_FOLLOWINGS', followingsRresponse.followings);
      store.commit('friends/SET_FOLLOWERS', followersRresponse.followers);
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Thread Not Found' });
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
.friends-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.nav-tabs.friend-nav-tabs {
  width: 100%;
}

.nav-tabs.friend-nav-tabs > li > a {
  color: black;
  border: none;
  margin-right: 0;
}

.nav-tabs.friend-nav-tabs > li:first-child > a {
  padding-left: 5px;
}
.nav-tabs.friend-nav-tabs > li:last-child > a {
  padding-right: 5px;
  margin-right: 5px;
}
.nav-tabs.friend-nav-tabs > li > a,
.nav-tabs > li > a:hover,
.nav-tabs > li > a:focus {
  border: none;
}
.nav-tabs > li > a.active,
.nav-tabs > li > a:hover,
.nav-tabs > li > a:focus {
  color: #555555;
  background-color: #f5f8fa;
  border-bottom: 3px solid rgb(255, 67, 1);
  cursor: default;
}

.friend-nav-tabs::before,
.friend-nav-tabs::after {
  content: none;
}
.friend-nav-tabs {
  border: none;
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
  margin-right: 10px;
}
.unfriend-btn {
  margin-left: auto;
}

.friends-search {
  width: 35%;
}

.friends-menu {
  width: 65%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.friends-card-body {
  padding: 5px;
}
.profile-single-item {
  display: flex;
  align-items: center;
}
</style>
