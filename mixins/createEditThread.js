import { mapGetters } from 'vuex';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import {Typeahead} from 'uiv'

import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'


export default {
  components: {vSelect, Typeahead, BaseButton, BaseInput },

  watch: {
    title_case(oldValue, newValue){
      this.form.title_case = oldValue
    }
  },
  data() {
    return {
      config: {
        height: 300,
        extraAllowedContent: 'iframe[*]',
        contentsCss: [
          'body {font-size: 22px;}',
          'blockquote { display: block !important;}',
          'blockquote { margin-block-start: 1em !important;}',
          'blockquote { margin-block-end: 1em !important;}',
          'blockquote { margin-inline-start: 40px !important;}',
          'blockquote { margin-inline-end: 40px !important;}',
          'blockquote { quotes: "“" "”" "‘" "’" !important;}',
          'blockquote::before { content:  "“";}',
          'blockquote::after { content:  "”";}',
        ],
        scayt_autoStartup: true
      },
      alltags: [],
      errors: [],
      show_more_fields: true,
      form: this.$vform({
        channel: '',
        tags: '',
        title: '',
        title_case: true,
        body: '',
        source: '',
        location: '',
        cno: {
          famous: false,
          celebrity: false,
        },
        main_subject: '',
        scrape_image: false,
        age_restriction: 0,
        anonymous: 0,

        slide_body: '',
        // slide_image_path: null,
        slide_image_pos: '',
        slide_color_bg: '',
        slide_color_0: '',
        slide_color_1: '',
        slide_color_2: '',

        copy_cno: false
      }),
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
    allchannels() {
      return this.$store.state.channels;
    },
    showImportWikipediaTooltip(){
      return !this.form.scrape_image
    },
    tooltipText(){
        return 'If you check this box and enter a subject above, we will try to download the corresponding Wikipedia image and display it above your story. Alternatively, you will have the option to use a different primary image on the next page.'
    }

  },
  mounted() {
    this.form.title_case = this.title_case;
  },
  methods: {
    selecetdTag() {
      let tags = this.form.tags.map((val) => {
        return val.toLowerCase();
      });
      this.form.tags = tags;
    },
    searchTag(search, loading) {
      loading(true);
      this.$axios.$get(`tag/search?q=${search}`).then((res) => {
        this.alltags = res;
        loading(false);
      });
    },
    searchChannel(query, done) {
      this.$axios
        .$get(`channel/search?name=${query}`)
        .then((res) => {
          done(res);
        })
        .catch((err) => {
          // any error handler
        });
    },
  },
}
