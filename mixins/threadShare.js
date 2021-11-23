
import ShareModal from '@/components/social/ShareModal.vue'
export default {
  components:{
    ShareModal
  },
  data() {
    return {
      show_share_modal: false
    }
  },
  methods: {
    cancelShare(thread){
      this.show_share_modal= false;
      this.$router.push({name:'threads.show', params:{slug: thread.slug}});
    },
    completeShare(thread){
      this.show_share_modal= false;
      this.$router.push({name:'threads.show', params:{slug: thread.slug}});
    },

  },
  computed:{

  }
}
