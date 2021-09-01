<template>
  <div class="tools-single-item">
    <button
      class="btn thread-items-show-tools-btn"
      @click.prevent="toggle"
      :class="classes"
      :style="style"
      aria-label="Make Favorite"
    >
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
      </svg>
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
        padding:0,
        borderWidth: this.size == "small" ? "1px" : "2px",
        height: this.size == "small" ? "24px" : "40px",
        width: this.size == "small" ? "24px" : "40px",
        // fontSize: this.size == "small" ? "20px" : "25px",
      };
    },
    classes() {
      return [this.isFavoriteThread ? "active-favorite" : "inactive-favorite"];
    },

    endpoint() {
      return "/thread/" + this.thread.id + "/favorites";
    },
    signedIn() {
      return this.$auth.loggedIn;
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
      if (!this.signedIn) {
        this.$store.commit('unlogged/SET_FAVORITES', this.thread.id);
        this.isFavoriteThread ?  this.isFavoriteThread = false :  this.isFavoriteThread = true;
        return;
      }
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

.inactive-favorite {
  .svg-inline--fa.fa-star path{
    fill: #92959e;
  }
}
.active-favorite {
  .svg-inline--fa.fa-star path{
    fill:  #f6d743;
  }
}
.svg-inline--fa.fa-star {
  height: 20px;
}
</style>
