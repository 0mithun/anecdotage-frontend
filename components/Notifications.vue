<template>
  <div class="btn-group dropleft">
    <button
      type="button"
      class="btn btn-secondary dropdown-toggle notification-status"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <!-- <img class="" src="~assets/images/bell.png" alt="" /> -->
      <svg style="height:24px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" class="svg-inline--fa fa-bell navbar-icon pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path>
      </svg>
      <span style="color: red; font-weight: bold; font-size: 14px">{{
        unreadNotifications.length
      }}</span>
    </button>
    <div class="dropdown-menu">
      <!-- Dropdown menu links -->
      <div
        class="dropdown-item"
        href="#"
        v-for="notification in notifications"
        :key="notification.id"
        @click.prevent="markAsRead(notification.id)"
      >
        <div class="top">
          <template
            v-if="
              notification.type ==
              'App\\Notifications\\ThreadReportAdminNotifications'
            "
          >
            <nuxt-link
              :to="{
                name: 'threads.show',
                params: { slug: notification.data.thread.slug },
              }"
              >This</nuxt-link
            >
            item has been flagged as
            <strong>{{ notification.data.type }}</strong> & is under revivew.
          </template>
          <template
            v-else-if="
              notification.type ==
              'App\\Notifications\\ThreadRestrictionReported'
            "
          >
            <!-- "Your item <a href=".$thread->path().">here</a> has been flagged as ".$report_type.". It is under review & may be hidden from other people."; -->
            Your item
            <nuxt-link
              :to="{
                name: 'threads.show',
                params: { slug: notification.data.thread.slug },
              }"
              >here</nuxt-link
            >
            has been flagged as <strong>{{ notification.data.type }}</strong> It
            is under review & may be hidden from other people.
          </template>
          <template
            v-else-if="
              notification.type == 'App\\Notifications\\ThreadReportUpdated'
            "
          >
            After review, your
            <nuxt-link
              :to="{
                name: 'threads.show',
                params: { slug: notification.data.thread.slug },
              }"
              >post</nuxt-link
            >
            changed to <strong>{{ notification.data.type }}</strong>
          </template>
          <template
            v-else-if="
              notification.type == 'App\\Notifications\\ThreadWasUpdated'
            "
          >
            {{ notification.data.reply_owner.name }} replied to
            <nuxt-link
              :to="{
                name: 'threads.show',
                params: { slug: notification.data.thread.slug },
              }"
              >{{ notification.data.thread.title }}</nuxt-link
            >
          </template>
          <template
            v-else-if="
              notification.type == 'App\\Notifications\\YouWereMentioned'
            "
          >
            {{ notification.data.reply_owner.name }} mentioned you in
            <nuxt-link
              :to="{
                name: 'threads.show',
                params: { slug: notification.data.thread.slug },
              }"
              >{{ notification.data.thread.title }}</nuxt-link
            >
          </template>
          <template
            v-else-if="
              notification.type == 'App\\Notifications\\DownloadYourImage'
            "
          >
            Your image is downloading and may take a while to update
          </template>
          <template
            v-else-if="
              notification.type == 'App\\Notifications\\ImageDownloadComplete'
            "
          >
            Your
            <nuxt-link
              :to="{
                name: 'threads.show',
                params: { slug: notification.data.thread.slug },
              }"
              >Thread</nuxt-link
            >
            image download complete you can check now.
          </template>
          <template
            v-else-if="
              notification.type ==
              'App\\Notifications\\InvalidImageUrlNotification'
            "
          >
            The Image url isn't a valid image url. Please
            <nuxt-link
              :to="{
                name: 'threads.show',
                params: { slug: notification.data.thread.slug },
              }"
            >
              check</nuxt-link
            >
            & add new image.
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data() {
    return {
      notifications: [],
    };
  },

  created() {
    this.fetchNotifications();
  },
  mounted() {
    this.$echo
      .private(`App.Models.User.${this.$auth.user.id}`)
      .notification((notification) => {
        if (
          notification.type !== 'App\\Notifications\\NewMessageNotification'
        ) {
          this.fetchNotifications();
          this.playNotification();
        }
      });
  },
  computed: {
    unreadNotifications() {
      return this.notifications.filter((notification) => {
        return notification.read_at == null;
      });
    },
  },

  methods: {
    async markAsRead(notification) {
      try {
        const res = await this.$axios.$put(
          `user/${this.$auth.user.username}/markAsRead/${notification}`
        );
        this.fetchNotifications();
      } catch (error) {}
    },
    async fetchNotifications() {
      try {
        if (!this.$auth.loggedIn) {
          return;
        }
        const res = await this.$axios.$get(
          `user/${this.$auth.user.username}/notifications`
        );
        let notifications = _.uniqBy(res.notifications, 'data.friend.id');

        this.notifications = notifications;
      } catch (error) {}
    },
    playNotification() {
      let sound = new Audio(
        'http://soundbible.com/mp3/glass_ping-Go445-1207030150.mp3'
      );
      //let sound = new Audio('https://notificationsounds.com/soundfiles/08b255a5d42b89b0585260b6f2360bdd/file-sounds-1137-eventually.mp3');
      sound.play();
    },
  },
};
</script>

<style lang="scss" scoped>
.notification-status {
  display: flex;
  background: none;
  align-items: center;
  border: none;
  img {
    width: 30px;
    margin-right: 5px;
  }
  &:focus,
  &:hover,
  &:active {
    background: none;
    border: none;
  }
}

img.profile-image {
  width: 35px;
  border-radius: 50%;
}

.top {
  font-size: 12px;
  text-transform: capitalize;
  margin-bottom: 5px;
  white-space: initial;
}
.dropdown-menu.show {
  width: 400px;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  margin-top: 50px;
}
.dropdown-item {
  display: block;
  width: 100%;
  /* padding: 0.25rem 1.5rem; */
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  padding: 5px;
}

.dropleft .dropdown-menu {
  right: 0%;
}

button.btn.btn-secondary.dropdown-toggle.notification-status {
  padding: 0px;
}
strong {
  font-weight: 700;
}

button.btn.btn-secondary.dropdown-toggle.notification-status {
  background: none;

  &:active {
    background: none;
    border: none;
  }
}

.svg-inline--fa path{
  fill: #000000;
}
</style>
