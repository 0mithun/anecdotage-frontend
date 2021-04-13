<template>
  <header class="fixed-topx">
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light align-items-center"
    >
      <div class="container">
        <nuxt-link :to="{ name: 'index' }" class="navbar-brand">
          <img :src="settings.logo_path" height="32" alt="" />
        </nuxt-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav font-14 fw-300">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="menuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ routeName }}

                <span class="fas fa-caret-down"></span>
              </a>
              <div class="dropdown-menu" aria-labelledby="menuLink">
                <nuxt-link class="dropdown-item" :to="{ name: 'threads.rated' }"
                  >Top Rated</nuxt-link
                >
                <nuxt-link
                  class="dropdown-item"
                  :to="{ name: 'threads.trending' }"
                  >Trending</nuxt-link
                >
                <nuxt-link
                  class="dropdown-item"
                  :to="{ name: 'threads.viewed' }"
                  >Most Viewed</nuxt-link
                >
                <nuxt-link
                  class="dropdown-item"
                  :to="{ name: 'threads.recent' }"
                  >Most Recent</nuxt-link
                >
                <nuxt-link
                  class="dropdown-item"
                  :to="{ name: 'threads.closest' }"
                  >Closest</nuxt-link
                >
                <nuxt-link class="dropdown-item" :to="{ name: 'threads.video' }"
                  >Video</nuxt-link
                >
                <nuxt-link
                  class="dropdown-item"
                  :to="{ name: 'admin.sortbytitle.length' }"
                  v-if="isAdmin"
                  >Sort By Title Length</nuxt-link
                >
              </div>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="channelLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories <span class="fas fa-caret-down"></span>
              </a>
              <div class="dropdown-menu" aria-labelledby="channelLink">
                <nuxt-link
                  class="dropdown-item"
                  :to="{ name: 'tags', params: { slug: channel.slug } }"
                  v-for="channel in channels"
                  :key="channel.id"
                  >{{ channel.name }}</nuxt-link
                >
              </div>
            </li>

            <li class="nav-item dropdown">
              <a
                href="#"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="true"
                class="dropdown-toggle emoji-dropdown"
                style="
                  width: 24px;
                  height: 24px;
                  display: block;
                  background-size: contain;
                  background-repeat: no-repeat;
                "
                :style="{ 'background-image': `url(${defaultEmojiUrl})` }"
              >
                <span class="fas fa-caret-down emoji-caret"></span>
              </a>

              <div class="dropdown-menu">
                <nuxt-link
                  v-for="emoji in emojis"
                  :key="emoji.id"
                  :to="{ name: 'emojis', params: { emoji: emoji.name } }"
                  class="navigation-emoji navigation-emoji-icon dropdown-item"
                  :style="backgroundEmoji(emoji.name)"
                  >{{ emoji.name }}</nuxt-link
                >
              </div>
            </li>
          </ul>
          <SearchForm></SearchForm>
          <div
            class="upload-shot white-path font-14 fw-500 text-uppercase d-flex"
          >
            <nuxt-link :to="{ name: 'maps' }" href="#" class="navbar-menu-icon">
              <img
                src="~assets/images/map_marker.png"
                alt=""
                class="navbar-icon marker"
              />
            </nuxt-link>
            <nuxt-link
              :to="{ name: 'threads.create' }"
              class="navbar-menu-icon"
            >
              <img
                src="~assets/images/pen_with.png"
                alt=""
                class="navbar-icon pen"
              />
            </nuxt-link>
          </div>
          <div
            class="notification white-path font-14 fw-500 text-uppercase mr-auto d-flex"
            v-if="$auth.loggedIn"
          >
            <MessageNotification />
            <Notifications />
          </div>

          <!-- Before Login -->
          <template v-if="!$auth.loggedIn">
            <ul class="before-login font-14 fw-300 text-uppercase">
              <li>
                <nuxt-link
                  :to="{ name: 'login' }"
                  class="btn btn-dark my-2 my-sm-0"
                  >Sign In</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  :to="{ name: 'register' }"
                  class="btn btn-primary my-2 my-sm-0"
                  >Sign Up</nuxt-link
                >
              </li>
            </ul>
          </template>
          <!-- End Before Login -->

          <!-- After Login -->
          <template v-else>
            <ul class="author-page white-path">
              <!-- Profile Dropdown -->
              <li class="dropdown">
                <a
                  class="dropdown-toggle"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="color: #515365; font-size: 14px"
                >
                  <img class="user-thumb" :src="$auth.user.photo_url" />
                  <!-- {{$auth.user.name}} -->
                  Me
                  <span class="down-chevron" style="margin-left: 5px">
                    <i class="fas fa-caret-down fa-w-20"></i>
                  </span>
                </a>

                <div
                  class="dropdown-menu user-dropdown font-14 fw-500"
                  aria-labelledby="userDropdown"
                >
                  <nuxt-link
                    :to="{
                      name: 'profile.show',
                      params: { username: $auth.user.username },
                    }"
                    class="dropdown-item"
                    href="#"
                    title="Profile"
                  >
                    <i class="fa fa-user"></i>
                    Profile
                  </nuxt-link>
                  <nuxt-link
                    :to="{
                      name: 'profile.settings.info',
                      params: { username: $auth.user.username },
                    }"
                    class="dropdown-item"
                    href="#"
                    title="Setting"
                  >
                    <i class="fa fa-cogs"></i>
                    Setting
                  </nuxt-link>
                  <nuxt-link
                    :to="{ name: 'admin.show' }"
                    class="dropdown-item"
                    href="#"
                    title="Setting"
                    v-if="$auth.user.is_admin"
                  >
                    <i class="fa fa-cogs"></i>
                    Admin
                  </nuxt-link>

                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" @click.prevent="logout">
                    <i class="fa fa-lock"></i>
                    Sign Out
                  </a>
                </div>
              </li>
              <!-- End Profile Dropdown -->
            </ul>
          </template>
          <!-- End After Login -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import SearchForm from './SearchForm';

import MessageNotification from '@/components/chat/MessageNotification';
import Notifications from '@/components/Notifications';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  components: {
    SearchForm,
    MessageNotification,
    Notifications,
  },
  computed: {
    ...mapGetters({
      channels: 'channels',
      emojis: 'emojis',
      settings: 'settings',
    }),
    isAdmin() {
      if (this.$auth.loggedIn) {
        return this.$store.state.auth.user.is_admin;
      }
      return false;
    },

    defaultEmojiUrl() {
      return process.env.APP_URL + 'images/emojis/default.png';
    },
    routeName() {
      if (this.$nuxt.$route.name == 'threads.rated') {
        return 'Top Rated';
      } else if (this.$nuxt.$route.name == 'threads.trending') {
        return 'Trending';
      } else if (this.$nuxt.$route.name == 'threads.viewed') {
        return 'Most Viewed';
      } else if (this.$nuxt.$route.name == 'threads.recent') {
        return 'Most Recent';
      } else if (this.$nuxt.$route.name == 'threads.closest') {
        return 'Closest';
      } else if (this.$nuxt.$route.name == 'threads.video') {
        return 'Video';
      } else {
        // return 'Top Rated';
        return 'Most Recent';
      }
    },
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$nuxt.$emit('logout');
      // this.$router.push('/').catch(()=>{});
      this.$router.push({ name: 'index' });
      // this.$router.push(
      //   // this.$store.state.auth.user.home,
      //   '/redirect-to-home',
      //   () => {
      //     window.alert('success')
      //   },
      //   () => {
      //     window.alert('fail')
      //   }
      // )
    },
    backgroundEmoji(emoji) {
      return `background-image: url(${process.env.APP_URL}images/emojis/${emoji}.png)`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/imports/mixins';
.dropdown-item:hover,
.dropdown-item:focus {
  color: #16181b;
  text-decoration: none;
  background-color: #6c757d;
}
.navbar-icon {
  width: 24px;
  height: auto;
}

.emoji-caret {
  margin-left: 28px;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.5);
}
.navigation-emoji {
  order: none;
  background: 0 0;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 10px 5px;
  /* margin-left: 10px; */
  /* padding-left: 35px !important; */
  color: #212529;
}
li.navigation-emoji-icon {
  padding: 5px 0px;
}
li.navigation-emoji-icon:hover {
  background-color: #6c757d;
}

a.navigation-emoji.navigation-emoji-icon.dropdown-item {
  padding: 0.25rem 2.5rem;
}

a.dropdown-toggle.emoji-dropdown {
  margin-top: 5px;
}
.upload-shot.white-path.font-14.fw-500.text-uppercase.d-flex {
  display: flex;
  align-items: center;
  width: 65px;
  justify-content: space-between;
}

.notification.white-path.font-14.fw-500.text-uppercase.mr-auto.d-flex {
  margin-left: 10px;

  @include respond(tab-land) {
    margin-left: 0px;
  }

  @include respond(tab-port) {
  }
  @include respond(phone) {
  }
}
</style>
