<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <div class="col-sm-12">
            <vue-ckeditor v-model="form.faq" :config="config" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-12">
            <base-button :loading="form.busy"> Update Faq </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueCkeditor from 'vue-ckeditor2';
export default {
  data() {
    return {
      config: {
        height: 300,
      },
      form: this.$vform({
        faq: '',
      }),
    };
  },
  components: { VueCkeditor },
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
  methods: {
    async updateInfo() {
      try {
        const settings = await this.form.put(`admin/settings`, this.form);
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Faq Update Successfully',
        });
      } catch (e) {}
    },
  },
  mounted() {
    this.form.faq = this.settings.faq;
  },
};
</script>

<style lang="scss" scoped>
</style>
