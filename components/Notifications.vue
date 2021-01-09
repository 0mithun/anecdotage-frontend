<template>
  <div class="btn-group dropleft">
    <button type="button" class="btn btn-secondary dropdown-toggle notification-status" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img class="navbar-icon pen" src="~assets/images/bell.png" alt="" />
        <span style="color: red; font-weight: bold; font-size: 14px">{{
          unreadNotifications.length
        }}</span>
    </button>
    <div class="dropdown-menu">
      <!-- Dropdown menu links -->
      <div class="dropdown-item" href="#" v-for="notification in notifications" :key="notification.id" @click.prevent="markAsRead(notification.id)">
        <div class="top">
          <template v-if="notification.type == 'App\\Notifications\\ThreadReportAdminNotifications'">
            <nuxt-link :to="{name: 'threads.show', params:{slug:notification.data.thread.slug}}">This</nuxt-link> item has been flagged as <strong>{{notification.data.type}}</strong>  & is under revivew.
          </template>
          <template v-else-if="notification.type == 'App\\Notifications\\ThreadRestrictionReported'">
            <!-- "Your item <a href=".$thread->path().">here</a> has been flagged as ".$report_type.". It is under review & may be hidden from other people."; -->
           Your item <nuxt-link :to="{name: 'threads.show', params:{slug:notification.data.thread.slug}}">here</nuxt-link> has been flagged as <strong>{{notification.data.type}}</strong> It is under review & may be hidden from other people.
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
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
      if(notification.type !== "App\\Notifications\\NewMessageNotification"){
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
        const res = await this.$axios.$put(`user/${this.$auth.user.username}/markAsRead/${notification}`)
       this.fetchNotifications();
      } catch (error) {

      }
    },
    async fetchNotifications() {
      try {
        if(!this.$auth.loggedIn){
          return ;
        }
        const res = await this.$axios.$get(`user/${this.$auth.user.username}/notifications`)
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
    align-items: center;
    border: none;
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

    &:active{
      background: none;
      border:none;
    }
}
</style>
