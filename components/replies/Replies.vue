<template>
    <div class="card">
      <div class="card-body">
        <new-reply></new-reply>
        <div v-for="(reply, index) in replies" :key="reply.id">
          <reply :reply="reply" @deleted="remove(index)"></reply>
        </div>
      </div>

        <!-- <paginator :dataSet="dataSet" @changed="fetch"></paginator> -->

    </div>
</template>

<script>
import Reply from "./Reply.vue";
import NewReply from "./NewReply.vue";
// import collection from "../mixins/collection";

// import Paginator from "./Paginator";
export default {
  components: {
    Reply,
    NewReply,
    // Paginator
  },
  computed:{
   thread(){
      return this.$store.state.threads.thread;
    },
    replies(){
      return this.$store.state.replies.replies
    }
  },

  // mixins: [collection],

  data() {
    // return { dataSet: false };
    return {

    }
  },

  created() {
    this.fetch();
    // eventBus.$on("addNewReply", (thread) => {
    //   eventBus.$emit("commentAdded-" + this.thread.id);
    // });

    // eventBus.$on("deleteReply", () => {
    //   eventBus.$emit("commentDeleted-" + this.thread.id);
    // });

    // eventBus.$on("addNestedReplies-" + this.thread.id, () => {
    //   eventBus.$emit("commentAdded-" + this.thread.id);
    // });
    // eventBus.$on("deleteNestedReplies-" + this.thread.id, () => {
    //   eventBus.$emit("commentDeleted-" + this.thread.id);
    // });
  },
  methods: {
    fetch(page) {
        this.$axios.$get(`threads/${this.thread.slug}/replies`).then(res=>{
           this.$store.commit('replies/setReplies',res)
        }).catch(err=>{
          console.log(err)
        })
    },

    url(page) {
      if (!page) {
        let query = location.search.match(/page=(\d+)/);

        page = query ? query[1] : 1;
      }

      return `${location.pathname}/replies?page=${page}`;
    },

    refresh({ data }) {
      this.dataSet = data;
      this.items = data.data;

      window.scrollTo(0, 0);
    },
  },
};
</script>
