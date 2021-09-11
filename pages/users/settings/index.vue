<template>
  <div class="container">
    <div class="card card-m-5">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="card sidebard-card">
              <div class="card-body">
                <ul class="nav nav-pills flex-column">
                  <li class="nav-item">

                    <nuxt-link
                      :to="{ name: 'profile.settings.info' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'profile.settings.info',
                      }"
                      >Profile</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'profile.settings.avatar' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'profile.settings.avatar',
                      }"
                      >Avatar</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'profile.settings.password' }"
                      class="nav-link"
                      :class="{
                        active:
                          $nuxt.$route.name == 'profile.settings.password',
                      }"
                      >Password</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'profile.settings.privacy' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'profile.settings.privacy',
                      }"
                      >Privacy</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'profile.settings.search' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'profile.settings.search',
                      }"
                      >Search Settings</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'profile.settings.notifications' }"
                      class="nav-link"
                      :class="{
                        active:
                          $nuxt.$route.name == 'profile.settings.notifications',
                      }"
                      >Notifications</nuxt-link
                    >
                  </li>
                  <!-- <li class="nav-item" v-if="!isAdmin">
                    <nuxt-link
                      :to="{ name: 'profile.settings.delete.account' }"
                      class="nav-link"
                      :class="{
                        active:
                          $nuxt.$route.name == 'profile.settings.delete.account',
                      }"
                      >Delete Account</nuxt-link
                    >
                  </li> -->
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <NuxtChild />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import scrollToTop from '@/mixins/scrollToTop'
import userStatus from '@/mixins/userStatus'
export default {
  middleware: ['auth'],
  mixins:[scrollToTop, userStatus],
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
  fetch({params, $auth, redirect}) {
    if(params.username !== $auth.user.username){
      redirect({name:'index'})
    }
  },
};
</script>

<style lang="scss" scoped>
.sidebard-card {
  .card-body {
    padding: 5px;
  }
}
</style>
