<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label"
            >Who can see my profile?</label
          >
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_profile_only_me"
                value="1"
                v-model="form.see_my_profiles"
              />
              <label class="form-check-label" for="see_profile_only_me"
                >Only Me
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_profile_only_me_and_friends"
                value="2"
                v-model="form.see_my_profiles"
              />
              <label
                class="form-check-label"
                for="see_profile_only_me_and_friends"
                >Me & My Friends</label
              >
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_profile_everyone"
                value="3"
                v-model="form.see_my_profiles"
              />
              <label class="form-check-label" for="see_profile_everyone"
                >Everyone</label
              >
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label"
            >Who can see my Threads?</label
          >
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_threads_only_me"
                value="1"
                v-model="form.see_my_threads"
              />
              <label class="form-check-label" for="see_threads_only_me"
                >Only Me
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_threads_me_and_friends"
                value="2"
                v-model="form.see_my_threads"
              />
              <label class="form-check-label" for="see_threads_only_me"
                >Me & My Friends</label
              >
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_threads_everyone"
                value="3"
                v-model="form.see_my_threads"
              />
              <label class="form-check-label" for="see_profile_everyone"
                >Everyone</label
              >
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label"
            >Who can see my Favorites?</label
          >
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_favorites_only_me"
                value="1"
                v-model="form.see_my_favorites"
              />
              <label class="form-check-label" for="see_favorites_only_me"
                >Only Me
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_favorites_me_and_friends"
                value="2"
                v-model="form.see_my_favorites"
              />
              <label class="form-check-label" for="see_favorites_me_and_friends"
                >Me & My Friends</label
              >
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_favorites_everyone"
                value="3"
                v-model="form.see_my_favorites"
              />
              <label class="form-check-label" for="see_favorites_everyone"
                >Everyone</label
              >
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label"
            >Who can see my Friends?</label
          >
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_friends_only_me"
                value="1"
                v-model="form.see_my_friends"
              />
              <label class="form-check-label" for="see_friends_only_me"
                >Only Me
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_friends_me_and_friends"
                value="2"
                v-model="form.see_my_friends"
              />
              <label class="form-check-label" for="see_friends_me_and_friends"
                >Me & My Friends</label
              >
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="see_friends_everyone"
                value="3"
                v-model="form.see_my_friends"
              />
              <label class="form-check-label" for="see_friends_everyone"
                >Everyone</label
              >
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label"
            >Who can send messages?</label
          >
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="send_message_only_frieds"
                value="1"
                v-model="form.send_me_message"
              />
              <label class="form-check-label" for="send_message_only_frieds"
                >Only Friends</label
              >
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="send_message_everyone"
                value="2"
                v-model="form.send_me_message"
              />
              <label class="form-check-label" for="send_message_everyone"
                >Everyone</label
              >
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label"
            >Create new thread:</label
          >
          <div class="col-sm-3">
            <input
              type="checkbox"
              id="thread_create_share_facebook"
              value="1"
              v-model="form.thread_create_share_facebook"
            />
            <label for="thread_create_share_facebook">Share on Facebook</label>
          </div>
          <div class="col-sm-3">
            <input
              type="checkbox"
              id="thread_create_share_twitter"
              value="1"
              v-model="form.thread_create_share_twitter"
            />
            <label for="thread_create_share_twitter">Share on Twitter</label>
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label"
            >On show allow anyone:</label
          >
          <div class="col-sm-3">
            <input
              type="checkbox"
              id="allow_share_facebook"
              value="1"
              v-model="form.anyone_share_my_thread_facebook"
            />
            <label for="allow_share_facebook">Share on Facebook</label>
          </div>
          <div class="col-sm-3">
            <input
              type="checkbox"
              id="allow_share_twitter"
              value="1"
              v-model="form.anyone_share_my_thread_twitter"
            />
            <label for="allow_share_twitter">Share on Twitter</label>
          </div>
        </div>
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
        see_my_profiles: 3,
        see_my_threads: 3,
        see_my_favorites: 3,
        see_my_friends: 3,
        send_me_message: 2,
        thread_create_share_facebook: 0,
        thread_create_share_twitter: 0,
        anyone_share_my_thread_facebook: 1,
        anyone_share_my_thread_twitter: 1,
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
          message: 'Privacy Update Successfully',
        });
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
