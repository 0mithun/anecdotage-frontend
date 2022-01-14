<template>
  <div class="info-content" @click="openThread">
    <h5 class="thread-title">{{ thread.title }}</h5>
    <div class="info-content-body">
      <div class="info-content-thread-thumb">
        <img :src="thread.thread_image_path" class="thread-thumb" alt />
      </div>
      <div class="thread-counts">
        <view-counts :thread="thread"></view-counts>
        <point-counts :thread="thread"></point-counts>
        <emoji-counts :thread="thread" :emoji_counts="thread.emoji_counts"></emoji-counts>
      </div>
    </div>
  </div>
</template>

<script>
  import ViewCounts from '@/components/counts/ViewCounts'
  import PointCounts from '@/components/counts/PointCounts'
  import EmojiCounts from '@/components/counts/EmojiCounts'
export default {
  props: ["thread"],
  data() {
    return {
      drawer: null,
      results: []
    };
  },
  components:{
    ViewCounts,
    PointCounts,
    EmojiCounts,
  },
  methods: {
    focusMarker(index) {
      this.$nuxt.$emit("markers_result_clicked", index);
    },
    openThread() {
      let routeData = this.$router.resolve({name: 'threads.show', params: {slug: this.thread.slug}});
      window.open(routeData.href, '_blank');
    }
  },
  created() {
    this.$nuxt.$on("markers_fetched", data => {
      this.results = data.results;
    });
  }
};
</script>


<style scoped>
.info-content {
  cursor: pointer;
  max-width: 15vw;
}
.info-content-body {
  display: flex;
  justify-content: space-between;
}
.info-content-thread-thumb {
  margin-right: 5%;
  width: 50%;
}

.thread-thumb {
  max-width: 100%;
  height: auto;
  display: inline-block;
  height: 60px;
}
.thread-counts {
  width: 45%;
  width: 45%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
}

.thread-title {
  color: black;
}
.thread-title {
    font-size: 14px;
    line-height: 22px;
    font-weight: 700;
}
</style>
