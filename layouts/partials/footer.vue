<template>
  <footer class="">
    <!-- class "fixed-bottom" remove  -->
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-4">
          <p class="font-14 fw-300" v-html="settings.footer_copyright_text"></p>
        </div>
        <div class="col-md-8 text-right">
          <div class="footer-links font-12 fw-300;">
            <nuxt-link :to="{ name: 'privacy' }" >Privacy</nuxt-link>
            <span>/</span>
            <nuxt-link :to="{ name: 'faq' }" >Faq</nuxt-link>
            <span>/</span>
            <nuxt-link :to="{ name: 'tos' }" >Terms</nuxt-link>
            <span>/</span>
            <nuxt-link :to="{ name: 'contact' }" >Contact</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
};
</script>

<style>
</style>
