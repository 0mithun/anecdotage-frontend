<template>
  <div class="emoji-lists">
      <!-- :class="[{ 'big-emoji-btn': emoji.id == userEmoji }, emoji.name]" -->
    <div
      v-for="(emoji, index) in emojis"
      :key="index"
      >
        <span
          data-toggle="tooltip"
          :title="emoji.name"
          class="emoji-count-btn"
          :style="backgroundEmoji(emoji.name)"
          v-if="getEmojiCount(emoji)"
          >
          <p>{{ getEmojiCount(emoji) }}</p>
        </span>
        <!-- {{ formateEmojiCounts(emoji.count) }} -->
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: ["thread"],
  data() {
    return {
      userEmoji: null,
      emoji_counts: {}
    };
  },
  computed:{
      ...mapGetters({
        emojis: 'emojis',
      }),
  },
  created() {
    // this.getUserEmojiType();
    this.getEmojiCounts();
    this.$nuxt.$on("VoteUserEmojis-" + this.thread.id, (emoji) => {
      this.getEmojiCounts();
    });
  },
  methods: {
    formateEmojiCounts(value) {
      return abbreviate(value, 1);
    },
    getEmojiCount(emoji){
      if(this.emoji_counts.hasOwnProperty(emoji.id)){
        console.log(this.emoji_counts[emoji.id]['total'])
        return this.emoji_counts[emoji.id]['total'];
      }
      return false;
    },
    backgroundEmoji(emoji) {
      return `background-image: url(${process.env.APP_URL}images/emojis/${emoji}.png)`;
    },
    getEmojiCounts() {
      this.$axios.get(`/threads/${this.thread.id}/emoji-counts`).then((res) => {
        // this.emojis = res.data;
        this.emoji_counts = res.data;
        // console.log(res.data)
      });
    },
    getUserEmojiType() {
      if (!this.signedIn) {
        return false;
      }
      // axios
      //   .get(`/thread/${this.thread.id}/user-emoji-type`)
      //   .then((res) => {
      //     this.userEmoji = res.data;
      //   })
      //   .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.emoji-lists {
  display: flex;
  justify-content: space-between;
}
.emoji-buttons {
  margin-top: 5px;
}
.emoji-count-btn {
  height: 16px;
  /* background-color: transparent; */
  background-size: 16px;
  background-repeat: no-repeat;
  vertical-align: bottom;
  text-align: center;
  /* padding-top: 20px; */
  margin-right: 5px;
  margin-left: 5px;
  background-position: 0px 0px;
  padding-left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin:0;
    padding: 0;
    font-size: 16px;
    line-height:16px;
  }
}
.big-emoji-btn {
  height: 40px;
  background-color: transparent;
  background-size: 32px;
  background-repeat: no-repeat;
  vertical-align: bottom;
  text-align: center;
  padding-top: 28px;
  margin-right: 5px;
  width: 32px;
}

.svg-inline--fa{
  /* margin-right: 3px; */
}
</style>
