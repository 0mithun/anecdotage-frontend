import { mapGetters } from 'vuex';
import SingleThread from '@/components/threads/SingeThread';
import Sidebar from '@/layouts/partials/Sidebar';
import Pagination from '@/components/Pagination';
import TotalCounts from '@/components/threads/TotalCounts'

export default{
  components: {
    SingleThread,
    Sidebar,
    Pagination,
    TotalCounts
  },

  head() {
    return {
      title: this.settings.site_title,
      meta: [
        //Meta Information
        {
          content: this.settings.seo_meta_title,
          name: 'title',
        },
        //Meta Information
        {
          content: this.settings.seo_meta_description,
          name: 'description',
        },
        {
          content: this.settings.seo_meta_keyword,
          name: 'keywords',
        },
      ],
      script: [
          {
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
            ssr: false ,
            // 'data-ad-client':"ca-pub-4366805194029390",
            'data-ad-client': process.env.DATA_AD_CLIENT_ID,
            preconnect: true,
           }
      ],
      link: this.generateLink
    };
  },
  computed: {
    ...mapGetters({
      // settings: 'settings',
      pageinateData: 'threads/pageinateData',
      threads: 'threads/threads',
    }),

    // pageinateData() {
    //   // return this.$store.state.threads.pageinateData;

    // },
    generateLink(){
      const links = [];
      if(this.pageinateData.last_page > this.pageinateData.current_page){
        links.push({
          rel:'next',
          href: `?page=${this.pageinateData.current_page + 1}`
        })
      }
      if(this.pageinateData.current_page > 1){
        links.push({
          rel:'prev',
          href: `?page=${this.pageinateData.current_page - 1}`
        })
      }

      return links;
    }
  },
}
