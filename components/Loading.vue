<template lang="html">
  <div class="loading">
    <div class="loading-body">
      <div class="loading-content">
          <img src="~assets/images/loading.gif" alt="">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
    fail(error) {
      console.log(error);
    },
    increase(num) {
      // console.log(num);
    },
  },
};
</script>

<style scoped>
.loading {
  position: relative;
}
.loading-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  /* padding-top: 200px; */
  font-size: 30px;
  font-family: sans-serif;
  z-index: 9999999;
}

.loading-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 45vh;
}
</style>
