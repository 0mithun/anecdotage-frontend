<template>
  <div class="tools-single-item">
    <button
      class="btn thread-items-show-tools-btn"
      @click.prevent="toggle"
      :class="classes"
      :style="style"
    >
      <i class="fa fa-star"></i>
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
      isFavoriteThread: this.thread.is_favorited,
    };
  },
  computed: {
    style() {
      return {
        borderWidth: this.size == "small" ? "1px" : "2px",
        height: this.size == "small" ? "24px" : "40px",
        width: this.size == "small" ? "24px" : "40px",
        fontSize: this.size == "small" ? "20px" : "25px",
      };
    },
    classes() {
      return [this.isFavoriteThread ? "active-favorite" : "inactive-favorite"];
    },

    endpoint() {
      return "/thread/" + this.thread.id + "/favorites";
    },
    signedIn() {
      // return window.App.user ? true : false;
    },
  },
  created() {
    this.$nuxt.$on("favoriteAdded-" + this.thread.id, (favorite)=>{
      this.isFavoriteThread = true;
    });

    this.$nuxt.$on("favoriteDeleted-" + this.thread.id, (favorite)=>{
      this.isFavoriteThread = false;
    });
  },
  methods: {
    toggle() {
      // if (!this.signedIn) {
      //   this.redirectToLogin();
      // }
      this.isFavoriteThread ? this.destroy() : this.create();
    },

    create() {
        this.$axios.$post(`threads/${this.thread.slug}/favorites`).then(res=>{
          this.isFavoriteThread = true;
        })
      this.$nuxt.$emit("favoriteAdded-" + this.thread.id, this.thread.id);
    },

    destroy() {
      this.$axios.$delete(`threads/${this.thread.slug}/favorites`).then(res=>{
         this.isFavoriteThread = false;
      })
      this.$nuxt.$emit("favoriteDeleted-" + this.thread.id, this.thread.id);
    },
    redirectToLogin() {
      // window.location = "/redirect-to?page=" + location.pathname;
    },
  },
};
</script>

<style lang="scss" scoped>
.active-favorite {
  color: #f6d743;
  border: 2px solid #f6d743;
}
// .active-favorite:hover {
//   color: #92959e;
//   border: 2px solid #92959e;
// }

.inactive-favorite {
  color: #92959e;
  border: 2px solid #92959e;
}
// .inactive-favorite:hover {
//   color: #f6d743;
//   border: 2px solid #f6d743;
// }
.thread-items-show-tools-btn {
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
