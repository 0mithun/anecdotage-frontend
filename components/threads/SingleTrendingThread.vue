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

      <div class="row" v-if="thread.thread_image_path != ''">
        <div class="thread-thumbnail card-m-5 " :style="threadThumbStyle"  @click="openThreadUrl">
            <!-- <img  :src="thread.thread_image_path" :alt="thread.title" class="thread-image thread_thumb_image"> -->
              <img
              title=""
              v-lazy-load
              :data-src="thread.thread_image_path"
              :alt="stripTagTitle"
              class="thread-image thread_thumb_image"
              heigh="120"
              width="auto"
              style="width:auto;height:120px"
            >
        </div>
      </div>

      <div class="row">
          <div class="col-md-12">
            <div class="thread-footer-menu d-flex justify-content-between align-items-center">
              <point-counts :thread="thread"></point-counts>
              <comment-counts :thread="thread"></comment-counts>
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
      },
      sticky: {
        type: Boolean,
        default:false
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
      stripTagTitle() {
        return this.thread.title.replace(/(<([^>]+)>)/gi, '');
      },

    },
    methods:{
      openThreadUrl(){
        if(this.sticky){
          window.open('https://anecdotage.com/stories', '_blank');
        }else{
          this.$router.push({name:'threads.show',params:{slug:this.thread.slug}})
        }

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
      font-weight: 700;
      // font-family: Raleway, sans-serif;

        font-family: 'Merriweather', serif;


      & > *{
        font-family: 'Merriweather', serif;
      }
      i,b,strong {
        font-family: 'Merriweather', serif !important;
          i, b {
            font-family: 'Merriweather', serif !important;
          }
      }
  strong i {
    font-family: 'Merriweather', serif !important;
  }
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

.thread-body {
  color:black;
}


</style>
