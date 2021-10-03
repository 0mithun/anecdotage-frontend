<template>
  <div class="tools-single-item">
    <button
      class="btn thread-items-show-tools-btn focus-comment-btn"
      @click.prevent="goToComment"
      :style="style"
      aria-label="Go to comments"
    >
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comment" class="svg-inline--fa fa-comment" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path>
      </svg>
       <!-- <img src="~assets/images/icons/comment.png" alt="comment counts" class="icon-image"> -->
    </button>
  </div>
</template>

<script>
export default {
  props: {
    thread: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: 'big',
    },
  },
  computed: {
    style() {
      return {
        borderWidth: this.size == 'small' ? '1px' : '2px',
        height: this.size == 'small' ? '24px' : '40px',
        width: this.size == 'small' ? '24px' : '40px',
        fontSize: this.size == 'small' ? '20px' : '25px',
      };
    },
  },
  methods: {
    goToComment() {
      this.$router.push({
        name: 'threads.show',
        params: { slug: this.thread.slug },
        hash: '#comments',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.thread-items-show-tools-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  padding-top: 0px;
}

.tools-single-item {
  margin: 0 5px;
}

.thread-items-show-tools-btn {
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid #92959e;
  color: #92959e;
  font-weight: 900;
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 25px;
  line-height: 0;
}

.icon-image{
  width: auto;
  height: 20px;
  // margin-right:2px;
  margin-top:5px;
}
.svg-inline--fa.fa-comment{
    height: 20px;
    transform: scale(1.3);
    margin-top:5px;
}

</style>


