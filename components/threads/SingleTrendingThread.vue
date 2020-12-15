<template>
  <div class="card card-m-5">
    <div class="card-body">

      <div class="row">
        <div class="col-md-12">
          <nuxt-link :to="{name:'threads.show', params:{slug:thread.slug}}" class="thread-title">
          <strong v-html="thread.title"></strong>
        </nuxt-link>
        </div>
      </div>

      <div class="row">
        <div class="thread-thumbnail card-m-5 " :style="threadThumbStyle"  @click="openThreadUrl">
            <img  :src="thread.thread_image_path" :alt="thread.title" class="thread-image thread_thumb_image">
        </div>
      </div>

      <div class="row">
          <div class="col-md-12">
            <div class="thread-footer-menu d-flex justify-content-between align-items-center">
              <comment-counts :thread="thread"></comment-counts>
              <point-counts :thread="thread"></point-counts>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CommentCounts from '@/components/counts/CommentCounts'
  import PointCounts from '@/components/counts/PointCounts'

  export default {
    props:{
      thread:{
        type: Object,
        required: true
      }
    },
    components:{
      CommentCounts,
      PointCounts,
    },
    computed: {
      threadThumbStyle() {
        return `background: rgba(${this.thread.image_path_pixel_color});cursor:pointer;`;
      },
    },
    methods:{
      openThreadUrl(){
        this.$router.push({name:'threads.show',params:{slug:this.thread.slug}})
      }
    }

  }
</script>

<style lang="scss" scoped>


  .tag-name{
    color: #ff4301;
  }
  .tag-name:link, .tag-name:visited {
      color: #ff4301;
      text-transform: lowercase;
      text-decoration: none;
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
  }
  .thread-title {
      color: #000;
      font-weight: normal;
      overflow-wrap: anywhere;
      font-size: 16px;
      line-height: 22px;
      font-family: Raleway, sans-serif;
  }
  .count-items-row, .thread-body-row{
    margin: 10px 0;
  }

  .count-items{
    width:100%;
  }

  .card-body {
    padding: 5px 20px;
      .row {
        margin-right: -20px;
        margin-left: -20px;
      }
  }


.thread-thumbnail {
    display: flex;
    width: 100%;
    text-align: center;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.thread-image {
    display: inline-block;
    max-width: 100%;
    height: 120px;
}


</style>
