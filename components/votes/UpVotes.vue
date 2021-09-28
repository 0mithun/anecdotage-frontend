<template>
  <div class="tools-single-item">
    <button
      class="btn  thread-items-show-tools-btn"
      @click="toggleLike"
      :class="activeClass"
      :style="style"
      aria-label="Make up vote"
    >
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" class="svg-inline--fa fa-arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path>
      </svg>
    </button>
  </div>
</template>

<script>
import unloggedUserMessage from '@/mixins/unloggedUserMessaage'
export default {
  mixins: [unloggedUserMessage],
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
      return this.$auth.loggedIn;
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
        // return;
        this.$axios.$post(`threads/${this.thread.slug}/likes`).then((res) => {
           this.isLiked = true;
           this.$nuxt.$emit("threadLikeAdd-" + this.thread.id, this.thread.id);
        });

        this.$store.commit('unlogged/SET_LIKES',this.thread.id)
        this.showSaveDataMessage();

        return;
      }else if(this.isAdmin){
          this.isLiked = true;
          this.$nuxt.$emit("threadLikeAdd-" + this.thread.id, this.thread.id);

          return;
      }

      else{
        this.$axios.$post(`threads/${this.thread.slug}/likes`).then((res) => {

        });
      }

      if(this.isLiked){
          this.isLiked = false;
          this.$nuxt.$emit("threadLikeDelete-" + this.thread.id, this.thread.id);
        }else if(this.isAdmin){
          this.isDesliked = false;
          this.$nuxt.$emit("threadDislikeDelete-" + this.thread.id, this.thread.id);


          this.isLiked = true;
          this.$nuxt.$emit("threadLikeAdd-" + this.thread.id, this.thread.id);
        }else{
          this.isLiked = true;
          this.$nuxt.$emit("threadLikeAdd-" + this.thread.id, this.thread.id);
        }
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
