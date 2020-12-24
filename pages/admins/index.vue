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
                    <nuxt-link :to="{name:'admin.show.settings'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'admin.show.settings'}" >Settings</nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link :to="{name:'admin.show.settings.logo'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'admin.show.settings.logo'}" >Logo</nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link :to="{name:'admin.show.batch.tools'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'admin.show.batch.tools'}" >Batch Tools</nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link :to="{name:'admin.show.manage.users'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'admin.show.manage.users'}" >Manage Users</nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link :to="{name:'admin.show.faq'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'admin.show.faq'}" >Faq</nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link :to="{name:'admin.show.terms'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'admin.show.terms'}" >Terms</nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link :to="{name:'admin.show.privacy'}" class="nav-link"  :class="{active:$nuxt.$route.name == 'admin.show.privacy'}" >Privacy</nuxt-link>
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
  middleware: ['admin'],
};
</script>

<style lang="scss" scoped>
.sidebard-card{
  .card-body{
    padding:5px;
  }
}
</style>
