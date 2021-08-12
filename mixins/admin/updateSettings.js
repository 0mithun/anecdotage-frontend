
import VueCkeditor from 'vue-ckeditor2';
export default {
  components: { VueCkeditor },
  data() {
    return {
      config: {
        height: 300,
      },
    };
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },
  mounted() {
    Object.keys(this.form).forEach((k) => {
      if (this.settings.hasOwnProperty(k)) {
        this.form[k] = this.settings[k];
      }
    });
  },

  methods: {
    async updateInfo() {
      try {
        const settings = await this.form.put(`admin/settings`, this.form);
        this.$store.commit('SET_SETTINGS', settings.data)
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: this.message
        });
      } catch (e) {}
    },
  },
};
