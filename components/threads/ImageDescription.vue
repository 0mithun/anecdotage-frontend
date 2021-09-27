<template>
  <div>
    <template
      v-if="
        threadImageDescriptionLength > imageDescriptionLengthLimit
      "
    >
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
  font-size: 12px;
  text-align: center;
  width: 100%;
  padding:5px;

  img.buy-btn {
    height: 22px;
    display: unset;
  }
  p{
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}

.btn-link{
  cursor:pointer;
  font-size: 13px;
}
</style>
