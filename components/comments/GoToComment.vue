<template>
  <div class="tools-single-item">
    <a
      class="btn thread-items-show-tools-btn focus-comment-btn"
      @click.prevent="goToComment"
      :style="style"
    >
      <i class="fa fa-comment"></i>
    </a>
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
</style>


