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
          <span>{{ getEmojiCount(emoji) }}</span>
        </span>
        <!-- {{ formateEmojiCounts(emoji.count) }} -->
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    thread:{
      type: Object,
      required: true,
    },
    emoji_counts: {
      type: Array | Object,
      required: true,
    }
  },
  data() {
    return {
      userEmoji: null,
      // emoji_counts: {}
      counts: this.emoji_counts
    };
  },
  computed:{
      ...mapGetters({
        emojis: 'emojis',
      }),
      totalEmojiCounts(){
        return this.counts;
      }
  },
  created() {
    this.$nuxt.$on("VoteUserEmojis-" + this.thread.id, (emoji) => {
      // console.log(emoji)
      // this.getEmojiCounts();
      this.loadEmojiCounts();
    });
  },
  methods: {
    formateEmojiCounts(value) {
      return abbreviate(value, 1);
    },
    getEmojiCount(emoji){
      if( typeof this.totalEmojiCounts === 'object'){

        if(this.totalEmojiCounts.hasOwnProperty(emoji.name)){
          return this.totalEmojiCounts[emoji.name];
        }
      }
      return false;
    },
    backgroundEmoji(emoji) {
      return `background-image: url(${process.env.APP_URL}images/emojis/${emoji}.png)`;
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
    async loadEmojiCounts(){
      //threads/{thread}/emoji-counts
      try {
        const res = await this.$axios.$get(`threads/${this.thread.id}/emoji-counts`)
        // console.log(res);
        this.counts = res;
      } catch (error) {

      }
    }
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
