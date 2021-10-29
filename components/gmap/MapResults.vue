<template>
<div>
  <div class="map_thraed_list">
    <div
      class="card"
      v-for="(thread, index) in results"
      :key="index"
      @click="focusMarker(index)"
      @mouseenter="focusMarker(index)"
      :class="isActive(index)"

    >

      <div  class="card-body">
        <div  class="">
          <div  class="trending_thread_title" v-html="thread.title"></div>
          <div class="card-header thread_thumb" :style="threadThumbStyle(thread)">
              <img
                :src="thread.thread_image_path"
                alt="Jason Ritter: Tan Wizard"
                class="thread_thumb_image"
                style="max-width: 100%;height:70px"
            />
          </div>
          <div class="trending_footer">
             <view-counts :thread="thread"></view-counts>
              <emoji-counts :thread="thread" :emoji_counts="thread.emoji_counts"></emoji-counts>
              <point-counts :thread="thread"></point-counts>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="results.length == 0">
     <div class="card-body">
        <!-- <div class="alert alert-danger text-center">
          <strong>  No Results </strong>
        </div> -->
       </div>
    </div>
  </div>
</div>
</template>

<script>
  import ViewCounts from '@/components/counts/ViewCounts'
  import PointCounts from '@/components/counts/PointCounts'
  import EmojiCounts from '@/components/counts/EmojiCounts'

export default {
  data() {
    return {
      drawer: null,
      results: [],
      activeIndex: null,
    };
  },
  components:{
    ViewCounts,
    PointCounts,
    EmojiCounts,
  },
  methods: {
    threadThumbStyle(thread) {
      return `background: rgba(${thread.imageColor});cursor:pointer;`;
    },
    isActive(index) {
      return this.activeIndex == index ? " border-primary" : "";
    },
    focusMarker(index) {
      this.activeIndex = index;
      this.$nuxt.$emit("markers_result_clicked", index);
      this.$nuxt.$emit("zoom_decreased", 7);
    },
  },
  created() {
    this.$nuxt.$on("markers_fetched", (data) => {
      this.results = data.results;
    });
  },
};
</script>

<style scoped>
.map_thraed_list {
  height: 85vh;
  overflow-y: scroll;
}
.thread-info {
  display: flex;
}
.thread-thumb-side {
  width: 50%;
  margin-right: 5%;
}
.thread-thumb {
  max-width: 100%;
  height: 60px;
  display: inline-block;
  margin-bottom: 0px;
}
.thread-counts {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: auto;
}
.thread-title {
  color: black;
}
.panel {
  margin-bottom: 5px;
  cursor: pointer;
  padding: 0px;
}
.panel-body {
  padding: 0px;
}
.thread_thumb{
  margin-bottom: 0px;
}
.trending_thread_title{
  font-size: 13px;
  font-weight: bold;
  color:black
}
.trending_footer{
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
.alert{
  margin-bottom: 0px;
}
.card-body {
  padding:5px;
}
</style>
