<template>
  <div class="counts-item">
    <!-- <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" class="svg-inline--fa fa-arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path>
    </svg> -->
    <img src="~assets/images/icons/down.png" alt="point counts" class="icon-image" v-if="pointCounts < 0">
    <img src="~assets/images/icons/up.png" alt="point counts" class="icon-image" v-else>
    <strong>{{ pointCounts | formatCount }}</strong>  {{ pointCounts | strPlural('point') }}
  </div>
</template>

<script>
import StrPlural from '@/mixins/strPlural'
import formatCount from '@/mixins/formatCount'
export default {
  mixins: [StrPlural, formatCount],
  props: ["thread"],
  data() {
    return {
      likeCount: this.thread.likes_count,
      dislikeCount: this.thread.dislikes_count,
    };
  },

  computed: {
    pointCounts() {
      return this.likeCount - this.dislikeCount;
    },
  },
  created() {
    this.$nuxt.$on("threadDislikeDelete-" + this.thread.id, (thread) => {
      this.dislikeCount = this.dislikeCount -1;
    });

    this.$nuxt.$on("threadDislikeAdd-" + this.thread.id, (thread) => {
      this.dislikeCount = this.dislikeCount  + 1;
    });
    this.$nuxt.$on("threadLikeAdd-" + this.thread.id, (thread) => {
      this.likeCount = this.likeCount + 1;
    });
    this.$nuxt.$on("threadLikeDelete-" + this.thread.id, (thread) => {
      this.likeCount = this.likeCount - 1;
    });
  },
};
</script>

<style scoped>
.counts-item {
}

.svg-inline--fa{
  /* margin-right: 3px; */
}

.fa-star {
  color: #f6d743;
}

.svg-inline--fa path {
      fill: #f6d743;
}

.icon-image{
  width: auto;
  height: 15px;
  margin-right:5px;
}
</style>
