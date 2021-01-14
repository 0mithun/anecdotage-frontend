<template>
  <div class="card">
    <div class="card-body">
      <new-reply></new-reply>
      <div v-for="(reply, index) in replies" :key="reply.id">
        <reply :reply="reply"></reply>
      </div>
    </div>
  </div>
</template>

<script>
import Reply from './Reply.vue';
import NewReply from './NewReply.vue';

export default {
  components: {
    Reply,
    NewReply,
  },
  computed: {
    thread() {
      return this.$store.state.threads.thread;
    },
    replies() {
      return this.$store.state.replies.replies;
    },
  },
  data() {
    return {};
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch(page) {
      this.$axios
        .$get(`threads/${this.thread.slug}/replies`)
        .then((res) => {
          this.$store.commit('replies/setReplies', res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
