<template>
  <div class="tools-single-item">
    <button
      class="btn  thread-items-show-tools-btn emojis-default-btn"
      :style="emojiStyle"
      :class="activeClass"
      @mouseenter="showEmojiList"
      aria-label="Vote emoji"
    ></button>
  </div>
</template>

<script>
export default {
  props: ["thread", "size", "position"],
  data() {
    return {
      userEmoji: this.thread.user_emoji_vote,
    };
  },
  computed: {
    signedIn() {
      // return window.App.user ? true : false;
    },
    emojiStyle() {
      return {
        backgroundImage:
          this.userEmoji != null
            ? `url(${this.userEmoji.photo_url})`
            : `url(${require('assets/images/funny-grayscale.png')})`,
        backgroundSize: this.size == "small" ? "20px" : "32px",
        height: this.size == "small" ? "24px" : "40px",
        width: this.size == "small" ? "24px" : "40px",
        borderWidth: this.size == "small" ? "1px" : "2px",
      };
    },
    activeClass() {
      return [this.userEmoji != "" ? "active-emoji" : "inactive-emoji"];
    },
  },

  created() {
    this.$nuxt.$on("VoteUserEmojis-" + this.thread.id, (emoji) => {
      this.userEmoji = emoji;
    });
  },
  methods: {
    showEmojiList() {
      let data = {
        thread: this.thread.id,
        position: this.position,
      };
      this.$nuxt.$emit("showEmojiList", data);
    },
  },
};
</script>

<style scoped>
.emojis-default-btn {
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
.active-emoji {
  color: #ffa931;
  border: 1px solid #ffa931;
  background-size: 22px;
}
.inactive-emoji {
  color: #92959e;
  border: 1px solid #92959e;
}

.tools-single-item {
    margin: 0 5px;
}
.thread-items-show-tools-btn {
    background-color: transparent;
    border-radius: 50%;
    border: 2px solid #92959e;
    color: #92959e;
    font-weight: 900;
    text-align: center;
    width: 50px;
    height: 50px;
    font-size: 25px;
}

</style>
