<template>
  <div class="counts-item">
    <i class="fa fa-arrow-up"></i>
    <strong>{{ pointCounts | formatCount }}</strong>  {{ pointCounts | strPlural('point') }}
  </div>
</template>

<script>
export default {
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
</style>
