<template>
  <div class="card card-m-5">
    <div class="card-body">
      <div class="about-header">
        <h4 class="about-name">About {{ profile_user.name }}</h4>
        <button
          class="btn btn-default btn-sm about-edit-btn"
          data-toggle="modal"
          data-target="#aboutEditModal"
          @click.prevent="showModal = true"
          v-if="is_owner"
        >
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
          </svg>
        </button>
      </div>
      <div v-html="profile_user.about"></div>
      <ProfileMap :profile_user="profile_user" />
      <!-- <profile-map :profile_user="profile_user"></profile-map> -->

      <div
        class="modal fade"
        id="aboutEditModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        v-if="showModal"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel">Edit about</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="about-edit-body"
                  rows="5"
                  v-model="aboutBody"
                  autofocus
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="saveAbout"
                :disabled="aboutBody == ''"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ProfileMap from '@/components/gmap/ProfileMap';
import isOwnProfile from '@/mixins/isOwnProfile'
import userStatus from '@/mixins/userStatus'
export default {
  data() {
    return {
      aboutBody: '',
      showModal: false,
    };
  },
    mixins: [isOwnProfile, userStatus],
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  components: {
    ProfileMap,
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      profile_user: 'user/profileUser',
      profile_user_privacy: 'user/profileUserPrivacy',
    }),

    isShowProfile() {
      return true;
    },
  },
  mounted() {
    this.aboutBody = this.profile_user.about;
  },
  methods: {
    saveAbout() {
      this.$axios
        .$put(`settings/about`, {
          about: this.aboutBody,
        })
        .then((res) => {
          this.$store.commit('user/SET_USER', res);
          this.$toast.open({
            type: 'success',
            position: 'top-right',
            message: 'About Update Successfully',
          });
          $('#aboutEditModal').modal('hide');
        });
    },
  },
  async fetch({ params, query, error, $axios, store, redirect }) {
    try {
      const userRresponse = await $axios.$get(`profile/${params.username}`);
      if (userRresponse.data.is_blocked) {
        redirect('/');
      }
      store.commit('user/SET_USER', userRresponse.data);
      store.commit('user/SET_USER_PRIVACY', userRresponse.data.privacy);
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'User Not Found' });
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
.about-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.about-name {
  color: black;
  font-weight: bold;
  padding: 0;
  font-size: 18px;
  font-weight: 700;
}
.about-edit-btn {
  font-size: 16px;
  color: black;
}
#about-edit-body {
  resize: vertical;
}
</style>
