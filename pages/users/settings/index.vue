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
                    <nuxt-link :to="{name:'profile.settings.info'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'profile.settings.info'}" >Profile</nuxt-link>
                    <nuxt-link :to="{name:'profile.settings.avatar'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'profile.settings.avatar'}" >Avatar</nuxt-link>
                    <nuxt-link :to="{name:'profile.settings.password'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'profile.settings.password'}" >Password</nuxt-link>
                    <nuxt-link :to="{name:'profile.settings.privacy'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'profile.settings.privacy'}" >Privacy</nuxt-link>
                    <nuxt-link :to="{name:'profile.settings.notifications'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'profile.settings.notifications'}" >Notifications</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <NuxtChild  />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
};
</script>

<style lang="scss" scoped>
.sidebard-card{
  .card-body{
    padding:5px;
  }
}
</style>
