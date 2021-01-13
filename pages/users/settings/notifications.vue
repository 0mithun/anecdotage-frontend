<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <label for="name" class="col-sm-6 col-form-label"
            >When I am mentioned in a comment:</label
          >
          <div class="col-sm-6">
            <h3 for="">Notify me on:</h3>
            <div class="form-check">
              <input
                type="checkbox"
                id="mention_notify_anecdotage"
                value="1"
                v-model="form.mention_notify_anecdotage"
              />
              &nbsp;
              <label for="mention_notify_anecdotage">Anecdotage</label>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="mention_notify_email"
                value="1"
                v-model="form.mention_notify_email"
              />
              &nbsp;
              <label for="mention_notify_email">Email</label>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="mention_notify_facebook"
                value="1"
                v-model="form.mention_notify_facebook"
              />
              &nbsp;
              <label for="mention_notify_facebook">Facebook</label>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="name" class="col-sm-6 col-form-label"
            >When new threads are posted about:</label
          >
          <div class="col-sm-6">
            <h3 for="">Notify me on:</h3>
            <div class="form-check">
              <input
                type="checkbox"
                id="new_thread_posted_notify_anecdotage"
                value="1"
                v-model="form.new_thread_posted_notify_anecdotage"
              />
              &nbsp;
              <label for="new_thread_posted_notify_anecdotage"
                >Anecdotage</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="new_thread_posted_notify_email"
                value="1"
                v-model="form.new_thread_posted_notify_email"
              />
              &nbsp;
              <label for="new_thread_posted_notify_email">Email</label>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="new_thread_posted_notify_facebook"
                value="1"
                v-model="form.new_thread_posted_notify_facebook"
              />
              &nbsp;
              <label for="new_thread_posted_notify_facebook">Facebook</label>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="name" class="col-sm-6 col-form-label"
            >Receive Daily Random threads?</label
          >
          <div class="col-sm-6">
            <h3 for="">Notify me on:</h3>
            <div class="form-check">
              <input
                type="checkbox"
                id="receive_daily_random_thread_notify_anecdotage"
                value="1"
                v-model="form.receive_daily_random_thread_notify_anecdotage"
              />
              &nbsp;
              <label for="receive_daily_random_thread_notify_anecdotage"
                >Anecdotage</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="receive_daily_random_thread_notify_email"
                value="1"
                v-model="form.receive_daily_random_thread_notify_email"
              />
              &nbsp;
              <label for="receive_daily_random_thread_notify_email"
                >Email</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="receive_daily_random_thread_notify_facebook"
                value="1"
                v-model="form.receive_daily_random_thread_notify_facebook"
              />
              &nbsp;
              <label for="receive_daily_random_thread_notify_facebook"
                >Facebook</label
              >
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-6 offset-sm-6">
            <base-button :loading="form.busy"> Update </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      form: this.$vform({
        mention_notify_anecdotage: false,
        mention_notify_email: false,
        mention_notify_facebook: false,

        new_thread_posted_notify_anecdotage: false,
        new_thread_posted_notify_email: false,
        new_thread_posted_notify_facebook: false,

        receive_daily_random_thread_notify_anecdotage: false,
        receive_daily_random_thread_notify_email: false,
        receive_daily_random_thread_notify_facebook: false,
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
      profileUserNotifications: 'user/profileUserNotifications',
    }),
    user() {
      return this.$auth.user;
    },
  },
  methods: {
    async updateInfo() {
      try {
        const user = await this.form.put(
          `user/${this.user.username}/notification`,
          this.form
        );
        await this.$auth.fetchUser();
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Notification Update Successfully',
        });
      } catch (e) {}
    },
  },
  mounted() {
    Object.keys(this.form).forEach((k) => {
      if (this.profileUserNotifications.hasOwnProperty(k)) {
        this.form[k] = this.profileUserNotifications[k];
      }
    });
  },
  async fetch({ $axios, store, params }) {
    try {
      const userRresponse = await $axios.$get(
        `user/${params.username}/notification`
      );
      store.commit('user/SET_USER', userRresponse.data);
      store.commit('user/SET_NOTIFICATIONS', userRresponse.data.notification);
    } catch (error) {}
  },
};
</script>

<style lang="scss" scoped>
.form-check {
  padding-left: 0;
}
h3 {
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
