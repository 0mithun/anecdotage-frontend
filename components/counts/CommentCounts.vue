<template>
  <div class="counts-item" :style="commentStyle">
    <!-- <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comment" class="svg-inline--fa fa-comment" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path></svg> -->


      <img src="~assets/images/icons/comment.png" alt="comment counts" class="icon-image">
    <strong>{{ commentCounts | formatCount }}</strong>  {{ commentCounts | strPlural('comment') }}
  </div>
</template>

<script>
import StrPlural from '@/mixins/strPlural'
import formatCount from '@/mixins/formatCount'
export default {
  mixins: [StrPlural, formatCount],
  props: ["thread", "color"],
  data() {
    return {
      count: this.thread.replies_count,
    };
  },

  computed: {
    commentCounts() {
      return this.count;
    },
    commentStyle() {
      return {
        color: this.color ? this.color : "#636b6f",
      };
    },
  },
  created() {
    this.$nuxt.$on("commentAdded-" + this.thread.id, () => {
      console.log("New Reply added");
      this.count = this.count + 1;
    });

    this.$nuxt.$on("commentDeleted-" + this.thread.id, () => {
      console.log("Reply Deleted");
      this.count = this.count - 1;
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
  color: rgb(26, 115, 232);
}

.svg-inline--fa path {
      fill: rgb(26, 115, 232);
}
.icon-image{
  width: auto;
  height: 20px;
  margin-right:5px;
}

</style>
