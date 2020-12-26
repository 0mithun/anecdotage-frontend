<template>
  <div class="slim"  :style="style">
    <client-only >
      <slot></slot>
    </client-only>
  </div>
</template>

<script>
import Slim from './slim.module.js';

var instance = null;

export default {
  props: ['options', 'src'],
  name: 'slim-cropper',
  mounted: function() {
    if (this.options.initialImage) {
      var img = document.createElement('img');
      img.setAttribute('alt', '');
      img.src = this.options.initialImage;
      this.$el.appendChild(img);
    }
    instance = new Slim(this.$el, this.options);
  },
  beforeDestroy: function() {
    instance.destroy();
  },
  computed:{
    backgroundImage(){
      return this.src ? `url(${this.src});background-size: contain; background-repeat: no-repeat;` : ''
    },
    style(){
      return `background:${this.backgroundImage}`;
    }
  }
};
</script>
<style lang="css">
@import './slim.min.css';
.slim[data-ratio='1:1'] > img, .slim[data-ratio='1:1'] > input[type='file'] {
    margin-bottom: 0 !important;
}
</style>
