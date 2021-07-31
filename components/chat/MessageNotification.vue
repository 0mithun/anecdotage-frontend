<template>
  <div class="btn-group dropleft">
    <button type="button" class="btn btn-secondary dropdown-toggle notification-status" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <!-- <img class="navbar-icon pen" src="~assets/images/mail.png" alt="" /> -->
        <svg style="height:24px;margin-right: 1px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" class="svg-inline--fa fa-envelope navbar-icon pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
        </svg>

        <span style="color: red; font-weight: bold; font-size: 14px">{{
          unreadNotifications.length
        }}</span>
    </button>
    <div class="dropdown-menu">
      <!-- Dropdown menu links -->
      <div class="dropdown-item" href="#" v-for="notification in notifications" :key="notification.data.message.id" @click.prevent="markAsRead(notification.id)">
        <div class="top">
           <img :src="notification.data.friend.photo_url" alt="" class="profile-image">
            <b class="pull-left" v-text="notification.data.friend.name"></b>
        </div>
        <div class="bottom">
          <div class="message-body">
            {{ notification.data.message.message }}
          </div>
          <div class="time">
            {{ notification.data.message.created_at | fromNow }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import fromNow from '@/mixins/fromNow'
export default {
  mixins: [fromNow],
  data() {
    return {
      notifications: [],
    };
  },

  created() {
    this.fetchNotifications();
  },
  mounted(){
    this.$echo.private(`App.Models.User.${this.$auth.user.id}`)
    .notification((notification) => {
      if(notification.type == "App\\Notifications\\NewMessageNotification"){
          this.fetchNotifications();
          this.playNotification()
        }
    });
  },
  computed: {
    unreadNotifications() {
      return this.notifications.filter((notification) => {
        return (
          notification.read_at == null
        );
      });
    },
  },

  methods: {
     async markAsRead(notification) {
      try {
        const res = await this.$axios.$put(`chat/user/notifications/${notification}`)
       this.fetchNotifications();
      } catch (error) {

      }
    },
    async fetchNotifications() {
      try {
        const res = await this.$axios.$get('chat/user/notifications')
        let notifications = _.uniqBy(res.notifications, 'data.friend.id');

        this.notifications = notifications;
      } catch (error) {

      }
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
  .notification-status{
    display: flex;
    background: none;
    border: none;
    align-items: center;
    img{
      width: 30px;
      margin-right: 5px;
    }
    &:focus, &:hover, &:active{
       background: none;
       border: none;
    }
  }

  img.profile-image {
    width: 35px;
    border-radius: 50%;
}

.top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    text-transform: capitalize;
    margin-bottom: 5px;
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

.bottom {
    font-size: 12px;
    text-transform: none;
    display: flex;
    justify-content: space-between;
}
.message-body {
  white-space: initial;
      overflow: hidden;
    max-height: 40px;
}
.time {
    width: fit-content;
    margin-left: 5px;
}

.dropleft .dropdown-menu {
    right: 0%;
}

button.btn.btn-secondary.dropdown-toggle.notification-status {
    padding: 0px;
}

button.btn.btn-secondary.dropdown-toggle.notification-status {
    background: none;

    &:active{
      background: none;
      border:none;
    }
}

.svg-inline--fa path {
  fill: #000000;
}
</style>
