<template>
  <section class="authentication">
    <div></div>
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Reset Password
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-success :form="form">{{ status }}</alert-success>
        <div class="form-group">
          <BaseInput
            :form="form"
            field="email"
            v-model="form.email"
            placeholder="Email"
          ></BaseInput>
        </div>

        <div class="text-right">
          <BaseButton :loading="form.busy"> Send Reset Link </BaseButton>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          <nuxt-link :to="{ name: 'login' }" class="color-blue">
            Back to login
          </nuxt-link>
        </p>
      </form>
    </div>
    <div></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'
export default {
  components: {BaseButton, BaseInput},
  middleware: ['guest'],
  data() {
    return {
      status: '',
      form: this.$vform({
        email: '',
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
  },

  methods: {
    submit() {
      this.form
        .post('/password/email')
        .then((res) => {
          this.status = res.data.status;
          this.form.reset();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
