<template>
  <section class="authentication">
    <div></div>
    <div class="auth-body">
      <div></div>
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Resend Verification Email
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-error v-if="form.errors.has('message')" :form="form">
          {{ form.errors.get('message') }}
        </alert-error>
        <alert-success :form="form">
          We have resent the verification email
        </alert-success>
        <div class="form-group">
          <BaseInput
            :form="form"
            field="email"
            v-model="form.email"
            placeholder="Email"
          ></BaseInput>
        </div>

        <div class="text-right">
          <BaseButton :loading="form.busy"> Resend </BaseButton>
        </div>
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
        .post(`/verification/resend`)
        .then((res) => this.form.reset())
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style></style>
