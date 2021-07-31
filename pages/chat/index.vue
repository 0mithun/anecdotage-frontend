<template>
  <div class="container card-m-5">
    <div class="row chat-page">
      <div class="col-md-4">
        <div class="people-list" id="people-list">
          <ul class="list" v-if="friendLists.length < 1">
            <li class="clearfix">
              <span style="color: white"> No Friends</span>
            </li>
          </ul>
          <ul class="list" v-else>
            <li
              class="clearfix"
              v-for="(friend, index) in friendLists"
              :key="index"
              @click.prevent="selectUser(friend)"
              :class="
                selectedUser && friend.id == selectedUser.id
                  ? 'active-friend'
                  : ''
              "
            >
              <img
                :src="friend.photo_url"
                alt="avatar"
                style="width: 50px; border-radius: 50%; height: 50px"
              />
              <div class="about">
                <div class="name" style="color: black">{{ friend.name }}</div>

                <UserOnline :user="friend" />
              </div>
              <div>
                <span
                  class="glyphicon glyphicon-comment messageStatus"
                  style="color: red; display: none"
                  :id="'messageStatus' + friend.id"
                ></span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-8">
        <div class="chat">
          <div class="chat-header clearfix">
            <img
              :src="selectedUser.photo_url"
              alt="avatar"
              v-if="selectedUser"
              style="width: 50px; border-radius: 50%; height: 50px"
            />

            <div class="chat-about" v-if="selectedUser">
              <div class="chat-with">
                <nuxt-link
                  :to="{
                    name: 'profile.show.about',
                    params: { username: selectedUser.username },
                  }"
                >
                  {{ selectedUser.name }}
                </nuxt-link>
              </div>
              <div class="chat-num-messages" v-if="friendMessages.length == 0">
                No Message
              </div>

              <div class="chat-num-messages" v-if="lastSeen">
                Last seen <span>{{ lastSeen | fromNow }}</span>
              </div>
            </div>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
          </div>
          <!-- end chat-header -->

          <div id="chat-history" class="chat-history" v-chat-scroll>
            <Message />
          </div>
          <!-- end chat-history -->

          <div class="chat-message clearfix chat-message-reply">
            <div v-if="typing" class="typing-status">
              {{ typing.from_user.name }}
              <img src="~assets/images/pen.png" alt="" /> .........
            </div>
            <div class="reply-to" v-if="selectedUser && showReplyBox">
              Reply to
              <strong v-if="selectedUser">{{ selectedUser.name }}</strong>
              <span class="close-reply" @click="cancelReplyMessage">X</span>
              <br />

              <p class="text-muted reply-message">
                <small>{{ chatForm.replyMessage }}</small>
              </p>
            </div>

            <textarea
              :class="showReplyBox ? 'remove-top-border' : ''"
              @keydown.enter.prevent="sendMessage()"
              @keyup="typingMessage"
              name="message-to-send"
              id="message-to-send"
              placeholder="Type your message"
              rows="2"
              class="form-control"
              v-model="chatForm.message"
              :disabled="!selectedUser"
            ></textarea>
          </div>
        </div>
        <!-- end chat -->
      </div>
    </div>
    <!-- end container -->
  </div>
</template>

<script>
// import moment from 'moment-timezone';
// moment.tz.setDefault('America/New_York');

import { mapGetters, mapActions } from 'vuex';
import UserOnline from '@/components/chat/UserOnline';
import Message from '@/components/chat/Message';
import scrollToTop from '@/mixins/scrollToTop'
import fromNow from '@/mixins/fromNow'

import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'

export default {
  mixins: [scrollToTop, fromNow],
  components: {
    UserOnline,
    Message,
  },
  middleware: ['auth'],
  data() {
    return {
      chatForm: {
        message: '',
        replyId: null,
        replyMessage: '',
      },
      typing: '',
      typingClock: null,
      showReplyBox: false,
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
      friendLists: 'chat/friendLists',
      friendMessages: 'chat/friendMessages',
      selectedUser: 'chat/selectedUser',
      lastSeen: 'chat/lastSeen',
    }),

    // lastSeen() {
    //   if (this.$store.getters.friendMessage.last_seen != null) {
    //     if (this.$store.getters.friendMessage.last_seen.seen_at != null) {
    //       let last_seen = this.$store.getters.friendMessage.last_seen.seen_at;
    //       return moment(last_seen, 'YYYY-MM-DD HH:mm:ss').fromNow();
    //     }
    //   }
    // },
  },
  mounted() {
    this.$echo
      .private(`chat.${this.$auth.user.id}`)
      .listen('MessegeSentEvent', (e) => {
        if (e.message.friend_message == 0) {
          // this.$store.dispatch('friendList', this.authuser.id);
          //this.$store.dispatch('otherMessageUserList', this.authuser.id);
        }
        if (this.selectedUser && this.selectedUser.id == e.message.from) {
          this.$store.commit('chat/ADD_NEW_MESSAGE', e.message);
          // this.selectUser(e.message.from, true);
        } else {
          // this.selectUser(e.message.from, false);
        }
        //this.messageSound();
      });

    this.$echo.private(`typingevent`).listenForWhisper('typing', (e) => {
      if (this.selectedUser) {
        if (
          e.from_user.id == this.selectedUser.id &&
          e.to_user.id == this.$auth.user.id
        ) {
          this.typing = e;

          if (this.typingClock) {
            clearTimeout(this.typingClock);
          }
          this.typingClock = setTimeout(() => {
            this.typing = '';
          }, 2000);
        }
      }
    });
  },
  created() {
    Vue.use(VueChatScroll);

    this.getChatUserLists();
    this.$nuxt.$on('REPLY_TO_MESSAGE', (messageId) => {
      this.replyToMessage(messageId);
    });
  },
  methods: {
    ...mapActions({
      getChatUserLists: 'chat/getChatUserLists',
      getUserMessages: 'chat/getUserMessages',
    }),
    typingMessage() {
      this.$echo.private(`typingevent`).whisper('typing', {
        from_user: this.$auth.user,
        to_user: this.selectedUser,
        typing: this.message,
      });
    },
    async sendMessage() {
      try {
        const message = await this.$axios.$post(
          `chat/user/${this.selectedUser.username}/messages`,
          {
            message: this.chatForm.message,
            reply_id: this.chatForm.replyId,
          }
        );
        this.$store.commit('chat/ADD_NEW_MESSAGE', message);
        this.chatForm = {
          message: '',
          replyId: null,
        };
        this.showReplyBox = false;
      } catch (e) {}
    },
    cancelReplyMessage() {
      this.replyId = '';
      this.showReplyBox = false;
    },
    replyToMessage(messageId) {
      this.chatForm.replyId = messageId;
      this.showReplyBox = true;
      let messageBox = document.getElementById('message-to-send');
      messageBox.focus();
    },
    messageSound() {
      let sound = new Audio(
        'https://notificationsounds.com/soundfiles/acc3e0404646c57502b480dc052c4fe1/file-sounds-1140-just-saying.mp3'
      );
      sound.play();
    },
    selectUser(friend, change = true) {
      if (change) {
        this.$store.commit('chat/SET_SELECTED_USER', friend);
        this.getUserMessages(friend);
        this.messageStatus(friend.id, false);
      } else {
        this.messageStatus(friend.id, true);
      }
      this.message = '';
    },
    messageStatus(friend, show = false) {
      let element = 'messageStatus' + friend;
      let container = this.$el.querySelector('#' + element);

      if (show) {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    },
    scrollToBottom() {
      let container = this.$el.querySelector('#chat-history');
      let height = container.scrollHeight;
      container.scrollTop = height;
    },
    selected(index) {
      // if (this.selectFriend == index) {
      //   return 'active-friend';
      // }
    },
  },
};
</script>

<style  scoped>
/* .people-list {
            width: 260px;
            float: left;
        } */
.people-list .search {
  padding: 20px;
}
.people-list input {
  border-radius: 3px;
  border: none;
  padding: 14px;
  color: white;
  background: #6a6c75;
  width: 90%;
  font-size: 14px;
}
.people-list .fa-search {
  position: relative;
  left: -25px;
}
.people-list ul {
  height: 770px;
  background: #6a6c75;
}
.people-list ul li {
  padding-bottom: 20px;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid grey;
}
.people-list img {
  float: left;
}
.people-list .about {
  float: left;
  margin-top: 8px;
}
.people-list .about {
  padding-left: 8px;
}
.people-list .status {
  color: #92959e;
}
.chat {
  background: #f2f5f8;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #434651;
}
.chat .chat-header {
  padding: 20px;
  border-bottom: 2px solid white;
}
.chat .chat-header img {
  float: left;
}
.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
  margin-top: 6px;
}
.chat .chat-header .chat-with {
  font-weight: bold;
  font-size: 16px;
}
.chat .chat-header .chat-num-messages {
  color: #92959e;
}
.chat .chat-header .fa-star {
  float: right;
  color: #d8dadf;
  font-size: 20px;
  margin-top: 12px;
}
.chat .chat-history {
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow-y: scroll;
  height: 575px;
}
.chat .chat-history .message-data {
  margin-bottom: 15px;
}
.chat .chat-history .message-data-time {
  color: #a8aab1;
  padding-left: 6px;
}
.chat .chat-history .message {
  color: white;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  margin-bottom: 30px;
  width: 80%;
  position: relative;
}
.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #86bb71;
  border-width: 10px;
  margin-left: -10px;
}
.chat .chat-history .my-message {
  background: #86bb71;
}
.chat .chat-history .other-message {
  background: #94c2ed;
}
.chat .chat-history .other-message:after {
  border-bottom-color: #94c2ed;
  left: 93%;
}
.chat .chat-message {
  padding: 30px;
}
.chat .chat-message textarea {
  /* width: 100%; */
  /* border: none;
            padding: 10px 20px;
            font: 14px/22px "Lato", Arial, sans-serif;
            margin-bottom: 10px;
            border-radius: 5px; */
  resize: none;
}
.chat .chat-message .fa-file-o,
.chat .chat-message .fa-file-image-o {
  font-size: 16px;
  color: gray;
  cursor: pointer;
}
.chat .chat-message button {
  float: right;
  color: #94c2ed;
  font-size: 16px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: #f2f5f8;
}
.chat .chat-message button:hover {
  color: #75b1e8;
}
.online,
.offline,
.me {
  margin-right: 3px;
  font-size: 10px;
}
.online {
  color: #86bb71;
}
.offline {
  color: #e38968;
}
.me {
  color: #94c2ed;
}
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
.float-right {
  float: right;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ' ';
  clear: both;
  height: 0;
}

.chat-message-reply.clearfix {
  position: absolute;
  width: 98%;
  bottom: 0;
  left: 0;
  background: white;
  padding: 0px !important;
}

.reply-to {
  border: 1px solid #38a9ff;
  min-height: 50px;
  padding: 8px;
  border: 1px solid #38a9ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  border-color: #38a9ff;
  outline: 0;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(152, 203, 232, 0.6);
  border-radius: 4px 4px 0px 0px;
  border-bottom: none;
}
.remove-top-border {
  border-top: none;
  box-shadow: none;
  border-radius: 0px 0px 4px 4px;
}
span.close-reply {
  float: right;
  padding: 0px 5px;
  cursor: pointer;
}

.typing-status {
  display: flex;
  align-items: center;
  padding: 5px;
}

li.clearfix.active-friend {
  background: gray;
}
</style>
