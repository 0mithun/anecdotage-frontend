<template>
  <div class="tools-single-item">
    <button
      class="btn  thread-items-show-tools-btn"
      @click="toggleLike"
      :class="activeClass"
      :style="style"
    >
      <i class="fa fa-arrow-up"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    thread: {
      type: Object,
    },
    size: {
      type: String,
      default: "big",
    },
  },

  data() {
    return {
      isLiked: this.thread.is_liked,
      isDesliked: this.thread.is_disliked,
    };
  },
  created() {
   this.$nuxt.$on("threadLikeAdd-"+this.thread.id, (id) => {
      this.isLiked = true;
    });
     this.$nuxt.$on("threadLikeDelete-"+this.thread.id, (id) => {
      this.isLiked = false;
    });

    this.$nuxt.$on("threadDislikeAdd-"+this.thread.id, (id) => {
      this.isDesliked = true;
    });
     this.$nuxt.$on("threadDislikeDelete-"+this.thread.id, (id) => {
      this.isDesliked = false;
    });

  },

  computed: {
    activeClass() {
      return [this.isLiked ? "active-icon" : "inactive-icon"];
    },
    signedIn() {
      // return window.App.user ? true : false;
    },
    style() {
      return {
        borderWidth: this.size == "small" ? "1px" : "2px",
        height: this.size == "small" ? "24px" : "40px",
        width: this.size == "small" ? "24px" : "40px",
        fontSize: this.size == "small" ? "20px" : "25px",
      };
    },
  },

  methods: {
    toggleLike() {
      if (!this.signedIn) {
        this.redirectToLogin();
      }
      this.$axios.$post(`threads/${this.thread.slug}/likes`).then((res) => {
        if(this.isLiked){
          this.isLiked = false;
          this.$nuxt.$emit("threadLikeDelete-" + this.thread.id, this.thread.id);
        }else if(this.isDesliked){
          this.isDesliked = false;
          this.$nuxt.$emit("threadDislikeDelete-" + this.thread.id, this.thread.id);


          this.isLiked = true;
          this.$nuxt.$emit("threadLikeAdd-" + this.thread.id, this.thread.id);
        }else{
          this.isLiked = true;
          this.$nuxt.$emit("threadLikeAdd-" + this.thread.id, this.thread.id);
        }
      });
    },
    redirectToLogin() {
      // window.location = "/redirect-to?page=" + location.pathname;
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
}


.tools-single-item {
    margin: 0 5px;
}

.thread-items-show-tools-btn {
    background-color: transparent;
    border-radius: 50%;
    font-weight: 900;
    text-align: center;
    width: 50px;
    height: 50px;
    font-size: 25px;
    line-height: 0;
}

.active-icon {
  color: #f6d743;
  border: 2px solid #f6d743;
}

.inactive-icon {
  color: #92959e;
  border: 2px solid #92959e;
}
</style>
