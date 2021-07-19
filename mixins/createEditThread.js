import { mapGetters } from 'vuex';
export default {
  head() {
    return {
      title: this.settings.site_title,
      // script:[
      //   {
      //     src:'https://cdn.ckeditor.com/4.10.0/standard/ckeditor.js',
      //     async: true
      //   }
      // ]
    };
  },
  watch: {
    title_case(oldValue, newValue){
      this.form.title_case = newValue
    }
  },
  data() {
    return {
      config: {
        height: 300,
        extraAllowedContent: 'iframe[*]',
        contentsCss: ['body {font-size: 22px;}'],
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
        // scrape_image: false,
        age_restriction: 0,
        anonymous: 0,

        slide_body: '',
        // slide_image_path: null,
        slide_image_pos: '',
        slide_color_bg: '',
        slide_color_0: '',
        slide_color_1: '',
        slide_color_2: '',
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
