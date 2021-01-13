<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <label for="current_password" class="col-sm-4 col-form-label"
            >Current Password</label
          >
          <div class="col-sm-8">
            <base-input
              :form="form"
              field="current_password"
              inputType="password"
              v-model="form.current_password"
              id="current_password"
              placeholder="Enter Current Password"
            ></base-input>
          </div>
        </div>
        <div class="form-group row">
          <label for="password" class="col-sm-4 col-form-label"
            >New Password</label
          >
          <div class="col-sm-8">
            <base-input
              :form="form"
              field="password"
              inputType="password"
              v-model="form.password"
              id="password"
              placeholder="Enter New Password"
            ></base-input>
          </div>
        </div>
        <div class="form-group row">
          <label for="password_confirmation" class="col-sm-4 col-form-label"
            >Confirm Password</label
          >
          <div class="col-sm-8">
            <base-input
              :form="form"
              field="password_confirmation"
              inputType="password"
              v-model="form.password_confirmation"
              id="password_confirmation"
              placeholder="Confirm Password"
            ></base-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-8 offset-sm-4">
            <base-button :loading="form.busy"> Update </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      form: this.$vform({
        current_password: '',
        password: '',
        password_confirmation: '',
      }),
    };
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
    user() {
      return this.$auth.user;
    },
  },
  methods: {
    async updateInfo() {
      try {
        await this.form.put(`settings/password`, this.form);
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Password Update Successfully',
        });
      } catch (e) {}
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

