<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label"
            >Restrictions:</label
          >
          <div class="col-sm-8">
            <div class="form-check">
              <input
                type="checkbox"
                id="restricted_13"
                value="1"
                v-model="form.restricted_13"
              />
              &nbsp;
              <label for="restricted_13"
                >I confirm that I am 13+ and wish to view PG-13 content</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="restricted_18"
                value="1"
                v-model="form.restricted_18"
              />
              &nbsp;
              <label for="restricted_18"
                >I confirm that I am 18+ and wish to view adult content</label
              >
            </div>
          </div>
          <div class="col-sm-3"></div>
          <div class="col-sm-3"></div>
        </div>

        <div class="form-group row">
          <div class="col-sm-8 offset-sm-4">
            <BaseButton :loading="form.busy"> Update </BaseButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '@/components/form/buttons/BaseButton'
export default {
  components:{
    BaseButton
  },
  data() {
    return {
      form: this.$vform({
        restricted_13: 1,
        restricted_18: 1,
      }),
    };
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      profileUserPrivacy: 'user/profileUserPrivacy',
    }),
    user() {
      return this.$auth.user;
    },
  },
  methods: {
    async updateInfo() {
      try {
        const user = await this.form.put(
          `user/${this.user.username}/privacy`,
          this.form
        );
        await this.$auth.fetchUser();
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Search Settings Update Successfully',
        });

         const route = localStorage.getItem('thread-show-url');

        //  const tagRoute = localStorage.getItem('tag-show-url');
         const afterLogin = localStorage.getItem('after-login-url');

          if(route){
            localStorage.removeItem('thread-show-url');
            this.$router.push(route)
          }

          if(afterLogin){
            localStorage.removeItem('after-login-url');
            this.$router.push(afterLogin)
          }


      } catch (e) {}
    },
  },
  mounted() {
    Object.keys(this.form).forEach((k) => {
      if (this.profileUserPrivacy.hasOwnProperty(k)) {
        this.form[k] = this.profileUserPrivacy[k];
      }
    });
  },
  async fetch({ $axios, store, params }) {
    try {
      const userRresponse = await $axios.$get(
        `user/${params.username}/privacy`
      );
      store.commit('user/SET_USER', userRresponse.data);
      store.commit('user/SET_USER_PRIVACY', userRresponse.data.privacy);
    } catch (error) {}
  },
};
</script>

<style lang="scss" scoped>
.form-check {
  padding-left: 0;
}
</style>
