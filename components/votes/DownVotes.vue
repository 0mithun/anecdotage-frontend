<template>
  <div class="tools-single-item">
    <button
      class="btn  thread-items-show-tools-btn"
      @click="toggleDislike"
      :class="activeClass"
      :style="style"
      aria-label="Make down vote"
    >
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down" class="svg-inline--fa fa-arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path>
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
     this.$nuxt.$on("threadDislikeAdd-"+this.thread.id, (id) => {
      this.isDesliked = true;
    });
     this.$nuxt.$on("threadDislikeDelete-"+this.thread.id, (id) => {
      this.isDesliked = false;
    });

     this.$nuxt.$on("threadLikeAdd-"+this.thread.id, (id) => {
      this.isLiked = true;
    });
     this.$nuxt.$on("threadLikeDelete-"+this.thread.id, (id) => {
      this.isLiked = false;
    });

  },

  computed: {
    activeClass() {
      return [this.isDesliked ? "active-icon" : "inactive-icon"];
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
    toggleDislike() {
      if (!this.signedIn) {
        // return;
        this.$axios.$delete(`threads/${this.thread.slug}/likes`).then((res) => {

        });

        this.$store.commit('unlogged/SET_DISLIKES',this.thread.id)
        this.showSaveDataMessage();
        // return
      }else{
        this.$axios.$delete(`threads/${this.thread.slug}/likes`).then((res) => {

        });
      }

      if(this.isDesliked){
        this.isDesliked = false;
        this.$nuxt.$emit("threadDislikeDelete-" + this.thread.id, this.thread.id);
      }else if(this.isLiked){
        this.isLiked = false;
        this.$nuxt.$emit("threadLikeDelete-" + this.thread.id, this.thread.id);


        this.isDesliked = true;
        this.$nuxt.$emit("threadDislikeAdd-" + this.thread.id, this.thread.id);
      }else{
        this.isDesliked = true;
        this.$nuxt.$emit("threadDislikeAdd-" + this.thread.id, this.thread.id);
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
