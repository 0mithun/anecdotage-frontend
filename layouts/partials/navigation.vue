<template>
  <header class="fixed-topx">
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light align-items-center"
    >
      <div class="container">
        <nuxt-link :to="{ name: 'index' }" class="navbar-brand">
          <img :src="logoUrl" height="32" alt="" />
        </nuxt-link>
        <button
          class="navbar-toggler mr-auto"
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
            <!-- <li class="nav-item">
                <a href="/designs" class="nav-link">Designs</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" title="Designers">Designers</a>
              </li> -->

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="menuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Top Rated <span class="fas fa-caret-down"></span>
              </a>
              <div class="dropdown-menu" aria-labelledby="menuLink">
                <nuxt-link  class="dropdown-item" :to="{name:'filter.threads', params:{filter:'rated'}}">Top Rated</nuxt-link>
                <nuxt-link  class="dropdown-item" :to="{name:'filter.threads', params:{filter:'trending'}}">Trending</nuxt-link>
                <nuxt-link  class="dropdown-item" :to="{name:'filter.threads', params:{filter:'viewed'}}">Most Viewed</nuxt-link>
                <nuxt-link  class="dropdown-item" :to="{name:'filter.threads', params:{filter:'recent'}}">Most Recent</nuxt-link>
                <nuxt-link  class="dropdown-item" :to="{name:'filter.threads', params:{filter:'closest'}}">Closest</nuxt-link>
                <nuxt-link  class="dropdown-item" :to="{name:'filter.threads', params:{filter:'video'}}">Video</nuxt-link>
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
                <a class="dropdown-item" href="#">Action</a>
                <nuxt-link
                  class="dropdown-item"
                  :to="{ name: 'tags', params: { slug: channel.slug } }"
                  v-for="channel in channels"
                  :key="channel.id"
                  >{{ channel.name }}</nuxt-link
                >
              </div>
            </li>

            <li class="nav-item dropdown emoji-dropdown">
              <a
                href="#"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="true"
                class="dropdown-toggle "
                style="width: 24px;height: 24px;display: block;background-size: contain;background-repeat: no-repeat;"
                :style="{'background-image':  `url(${defaultEmojiUrl})`}"
                >
                <span class="fas fa-caret-down emoji-caret"></span>
              </a>

              <div class="dropdown-menu">
                <li class="navigation-emoji-icon" v-for="emoji in emojis" :key="emoji.id">
                  <nuxt-link
                  :to="{name:'emojis', params:{emoji:emoji.name}}"
                  class="navigation-emoji"
                    :style="backgroundEmoji(emoji.name)"
                  >{{emoji.name}}</nuxt-link>


                </li>
              </div>

            </li>
          </ul>

          <div class="header-search">
            <form action method>
              <div class="form-group">
                <input
                  type="text"
                  autocomplete="OFF"
                  name="search"
                  class="form-control text-white font-14 fw-300"
                  placeholder="Search and hit enter..."
                />
                <div class="search-icon text-white">
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </form>
          </div>

          <div
            class="upload-shot white-path font-14 fw-500 text-uppercase mr-auto"
          >
            <a href="/upload" class="primary-bg-color text-white">
              <i class="fas fa-cloud-upload-alt"></i> Upload
            </a>
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
                  :to="{ name: 'login' }"
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
                  <a class="dropdown-item" href="#" title="Profile">
                    <i class="fa fa-user"></i>
                    Profile
                  </a>
                  <a class="dropdown-item" href="#" title="Setting">
                    <i class="fa fa-cogs"></i>
                    Setting
                  </a>
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
export default {
  data() {
    return {};
  },
  computed: {
    channels() {
      return this.$store.state.channels;
    },
    emojis() {
      return this.$store.state.emojis;
    },
    defaultEmojiUrl(){
      return process.env.APP_URL + 'images/emojis/default.png';
    },
    logoUrl(){
       return process.env.APP_URL + 'images/logo.jpg';
    }

  },
  methods: {
    logout() {
      this.$auth.logout();
    },
    backgroundEmoji(emoji){
      return `background-image: url(${process.env.APP_URL}images/emojis/${emoji}.png)`
    }
  },
};
</script>

<style lang="scss" scoped>
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

  .emoji-dropdown{

  }
  .emoji-caret{
        margin-left: 28px;
    margin-top: 5px;
     color: rgba(0, 0, 0, 0.5);

  }
  .navigation-emoji {
    border: none;
    background: 0 0;
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 0 0;
    margin-left: 10px;
    padding-left: 35px!important;
    color: #212529
}
li.navigation-emoji-icon {
    padding: 5px 0px;
}
li.navigation-emoji-icon:hover {
    background-color: #6c757d;
}

</style>
