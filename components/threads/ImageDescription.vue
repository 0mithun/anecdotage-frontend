<template>
  <div style="width:100%;margin-bottom:10px;display:flex;align-items:center;justify-content:center;text-align:center;">
    <template v-if="threadImageDescriptionLength > imageDescriptionLengthLimit">
      <template v-if="showFullImageDescription">
        <div class="image_description">
          <p style="margin-bottom:0">
            <span v-html="thread.image_description"></span>
            <span class="btn-link" @click.prevent="showFullImageDescription = false" v-if="showFullImageDescription == true">...(close)</span>
          </p>
        </div>
      </template>
      <template v-else>
        <div class="image_description">
          <p style="margin-bottom:0 !important">
            <span v-html="showThreadImageDescriptionLimit"></span>
            <span class="btn-link" @click.prevent="showFullImageDescription = true" v-if="!showFullImageDescription">...(more)</span>
          </p>
        </div>
      </template>
    </template>
    <template v-else>
      <div
        class="image_description"
        v-html="thread.full_image_description"
      ></div>
    </template>
  </div>
</template>

<script>

  export default {
    props: {
      thread: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        imageDescriptionLengthLimit: 20,
        showFullImageDescription: false,
      };
    },
    computed:{
      threadImageDescriptionLength() {
        if (
          this.thread.image_description == null ||
          this.thread.image_description == ''
        ) {
          return 0;
        }

        const description = this.thread.image_description;
        const splitDescription = description.split(/\s/);

        return splitDescription.length;
      },
      showThreadImageDescriptionLimit() {
        return this.thread.image_description
          .split(/\s/)
          .splice(0, this.imageDescriptionLengthLimit)
          .join(' ');
      },
    }
  }
</script>

<style lang="scss" scoped>

.image_description {
  // margin: 5px 10px;
  font-size: 14px;
  text-align: center;
  width: 100%;
  padding:5px;
  flex-wrap: wrap;

  @media (max-width: 574px){
    font-size: 10px;
    line-height: 12px;
  }

  // display: flex;
  // justify-content: center;
  // align-items: center;

  p{
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  * {
    margin-right: 1px;
    margin-left: 1px;
  }
  i {
    margin-left:2px;
    margin-right:2px;
  }
}

.btn-link{
  cursor:pointer;
  font-size: 13px;
}
.image_description i {
  margin-left:2px;
  margin-right:2px;
}

.image_description{
    // font-size: 14px;
    text-align: center;
    width: 100%;
    padding: 5px;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
    flex-wrap: wrap;


}


 @media only screen and (min-width:600px) {
    .thread-image_description {
      font-size: 10px;
      line-height: 12px;
    }
  } //600px

  @media only screen and (min-width: 900px) {
      .thread-image_description {
      font-size: 12px;
      line-height: 15px;
    }
  } //900px

  @media only screen and (min-width: 1200px) {
       .thread-image_description {
      font-size: 14px;
      line-height: 18px;
    }
  } //1200px
  @media only screen and (min-width: 1400px) {
      .thread-image_description {
      font-size: 16px;
      line-height: 20px;
    }
  } //1200px


  @media only screen and (min-width: 1800px) {
      .thread-image_description {
      font-size: 18px;
      line-height: 22px;
    }
  } //1200px
</style>
