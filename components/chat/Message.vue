<template>
  <ul style="margin: 0px; padding: 0px">
    <!-- <li  v-if="friendMessages.messages">
                                        <div class="alert alert-danger" role="alert" >No Message...</div>
                                    </li> -->

    <li
      class="clearfix message-list"
      v-for="(friendMessage, index) in friendMessages"
      :key="index"
    >
      <div
        v-if="
          selectedUser.id == (friendMessage.to || friendMessages.from)
        "
      >
        <div class="message-data align-right">
          <span class="message-data-time">{{ friendMessage.created_at  | fromNow}}</span>
          &nbsp; &nbsp;
          <span class="message-data-name">{{ $auth.user.name }}</span>

          <!-- <i class="fa fa-circle me"></i> -->

          <img
            :src="$auth.user.photo_url"
            alt=""
            style="width: 40px; border-radius: 50%; height: 40px;margin-left: 5px"
          />
        </div>

        <div class="btn-group reply-to-me">
          <button
            class="btn btn-default btn-sm dropdown-toggle reply-btn"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a
                href="#"
                @click.prevent="
                  replyToMessage(friendMessage.id, friendMessage.message)
                "
                >Reply</a
              >
            </li>
          </ul>
        </div>


        <div class="message other-message float-right">
          <blockquote
            class="reply-to-message"
            v-if="friendMessage.parent != null"
          >
            <span class="reply-message-user">
              <i class="fa fa-share"></i>
              You replied to
              <strong>{{ selectedUser.name }}</strong> <br />
            </span>

            <span class="text-muted">
              {{ friendMessage.parent.message }}
            </span>
          </blockquote>
          {{ friendMessage.message }}
        </div>

      </div>



      <div v-else>
        <li>
          <div class="message-data">
            <img
              :src="selectedUser.photo_url"
              alt=""
              style="width: 40px; border-radius: 50%; height: 40px; margin-right:5px"
            />
            <span class="message-data-name">
              <!-- <i class="fa fa-circle online"></i> -->
              <!-- <user-online
                :user="selectedUser"
                type="message"
              ></user-online> -->

              {{ selectedUser.name }}</span
            >
            <span class="message-data-time">{{
              friendMessage.created_at | fromNow
            }}</span>
          </div>



          <div class="message my-message" @click.prevent="messageSeeen(friendMessage)">
            <!--  v-if="friendMessage.reply_message != null" -->
            <blockquote
              class="reply-to-message"
              v-if="friendMessage.parent !=null"
            >
              <span class="reply-message-user">
                <i class="fa fa-share"></i>
                <strong>{{ selectedUser.name }}</strong>
                replied to you <br />
              </span>

              <span class="text-muted">
                {{ friendMessage.parent.message }}
              </span>
            </blockquote>
            {{ friendMessage.message }}
          </div>



          <div class="btn-group">
            <button
              class="btn btn-default btn-sm dropdown-toggle reply-btn"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  href="#"
                  @click.prevent="
                    replyToMessage(friendMessage.id)
                  "
                  >Reply</a
                >
              </li>
            </ul>
          </div>
        </li>
      </div>
    </li>
  </ul>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  computed:{
    ...mapGetters({
      friendMessages: 'chat/friendMessages',
      selectedUser: 'chat/selectedUser',
    }),
  },
  methods:{
    ...mapActions({
      messageSeeen: 'chat/messageSeeen'
    }),
    replyToMessage(messageId) {
     this.$nuxt.$emit('REPLY_TO_MESSAGE',messageId);
    },
  }
};
</script>

<style lang="scss" scoped>
$my-message-bg: #86bb71;
$other-message-bg: #34a4ef;


.chat .chat-history .other-message {
  background: $other-message-bg;
}
  .chat .chat-history .my-message {
            background: #86bb71;
        }

.chat .chat-history .other-message:after {
  border-bottom-color: $other-message-bg;
  left: 93%;
}

.chat .chat-message button:hover {
  color: $other-message-bg;
}

.me {
  color: $other-message-bg;
}



.chat .chat-history .message {
  color: white;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  margin-bottom: 20px;
  width: 75%;
  position: relative;
  display: inline-block;
  padding: 15px 10px;
}
.reply-btn {
  background: none;
  border: none;
}
.dropdown-toggle.reply-btn:active {
  background: none;
}
.reply-to {
  border: 1px solid #ccd0d2;
  min-height: 50px;
  padding: 8px;
  border: 1px solid #ccd0d2;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  border-color: #98cbe8;
  outline: 0;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(152, 203, 232, 0.6);
  border-radius: 4px 4px 0px 0px;
  border-bottom: none;
}
.reply-message {
  padding: 0px;
  margin: 0px;
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
.chat-message-reply.clearfix {
  position: absolute;
  width: 98%;
  bottom: 0;
  left: 0;
  background: white;
  padding: 0px !important;
}
/* .chat .chat-message-reply {
            padding: 0px!important;
        } */
.message-list:last-child {
  margin-bottom: 50px;
}

.reply-to-message {
  border-left: 2px solid grey;
  /* margin-right: 5px; */
  padding: 0px;
  margin: 0px;
  padding-right: 0;
  padding-left: 10px;
  margin-bottom: 5px;
  font-size: 13px;
}
.reply-message-user {
  color: #777777;
}
.reply-to-me {
  margin-left: 20%;
  margin-top: 20px;
}

.chat-history li{
    list-style: none;
}
.chat .chat-history .message-data {
    margin-bottom: 15px;
}
.align-right {
    text-align: right;
}

 .chat-list{
            list-style: none;
            margin:0;
            padding:0;
        }
        .chat-list li{
            list-style-type: none;
        }
        li.receiver {
            width: 100%;
            overflow: hidden;
        }

        li.receiver span.message{
            float: left;
            background: #e4e4e4;
        }

        .sender{
            width: 100%;
            overflow: hidden;
        }

        li.sender span.message{
            float: right;
            background: $other-message-bg;
            color: white
        }
        span.message{
            padding: 5px 10px;
            border-radius: 15px;
        }
        .messageBox{
            margin-top: 20px;
        }
        .chat .chat-history .message-data {
          margin-bottom: 15px;
        }
        .align-right{
            text-align: right;
        }
        .chat .chat-history .other-message {
            background: #34a4ef;
        }

        .chat .chat-history .message {
            padding: 15px 10px;
        }
        .chat .chat-history .message {
          color: white;
          padding: 18px 20px;
          line-height: 26px;
          font-size: 16px;
          border-radius: 7px;
          margin-bottom: 30px;
          width: 75%;
          position: relative;
          display: inline-block;
      }
      .status {
          display: inline-block;
      }
      .chat .chat-history .message-data-time {
          color: #a8aab1;
          padding-left: 6px;
      }
      .chat .chat-history .my-message:after {
          bottom: 100%;
          left: 7%;
          border: solid transparent;
          content: " ";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-bottom-color: #86bb71;
          border-width: 10px;
          margin-left: -10px;
      }
      .chat .chat-history .other-message:after {
          bottom: 100%;
          left: 7%;
          border: solid transparent;
          content: " ";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-bottom-color: #34a4ef;;
          border-width: 10px;
          margin-left: -10px;
      }
      .dropdown-toggle.reply-btn:active {
          background: none;
      }
    .caret {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 2px;
      vertical-align: middle;
      border-top: 4px dashed;
      border-top: 4px solid \9;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
  }
  .align-right {
    text-align: right;
}
.chat .chat-history .message-data-time {
    color: #a8aab1;
    padding-left: 6px;
}
.message-data.align-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.reply-to-message{
    border-left: 2px solid grey;
    /* margin-right: 5px; */
    padding: 0px;
    margin: 0px;
    padding-right: 0;
    padding-left: 10px;
    margin-bottom: 5px;
    font-size: 13px;
}
.message-data {
    display: flex;
    align-items: center;
}
</style>
