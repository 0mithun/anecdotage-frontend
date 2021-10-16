
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
    cancelShare(){
      this.show_share_modal= false;
      this.$router.push({name:'threads.show', params:{slug: this.thread.slug}});
    },
    completeShare(){
      this.show_share_modal= false;
      this.$router.push({name:'threads.show', params:{slug: this.thread.slug}});
    },

  },
  computed:{

  }
}
