<template>
  <section class="authentication">
    <div></div>
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Reset Password
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-success :form="form">
          {{ status }}
          <p>
            <nuxt-link to="/login">Proceed to login</nuxt-link>
          </p>
        </alert-success>
        <!-- <div class="form-group">
          <BaseInput
            :form="form"
            :readonly="true"
            field="email"
            v-model="form.email"
            placeholder="Email"
          ></BaseInput>
        </div> -->

        <div class="form-group">
          <BaseInput
            :form="form"
            inputType="password"
            field="password"
            v-model="form.password"
            placeholder="New Password"
          ></BaseInput>
        </div>

        <div class="form-group">
          <BaseInput
            :form="form"
            inputType="password"
            field="password_confirmation"
            v-model="form.password_confirmation"
            placeholder="Confirm New Password"
          ></BaseInput>
        </div>

        <div class="text-right">
          <BaseButton :loading="form.busy"> Reset Password </BaseButton>
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
  middleware: ['guest'],
  components:{BaseInput, BaseButton},
  data() {
    return {
      status: '',
      form: this.$vform({
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
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
        .post('/password/reset')
        .then((res) => {
          this.status = res.data.status;
          this.form.reset();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  created() {
    this.form.email = this.$route.query.email;
    this.form.token = this.$route.params.token;
  },
};
</script>

<style></style>
