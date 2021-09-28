<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">Register</h1>
      <form class="auth-form" @submit.prevent="submit">
        <div class="alert alert-danger" v-if="errorMessage != ''">
          {{ errorMessage }}
        </div>
        <alert-success :form="form"
          >We have sent you an email to activate your account.</alert-success
        >
        <div class="form-group">
          <BaseInput
            :form="form"
            field="name"
            v-model.trim="form.name"
            placeholder="Full Name"
          ></BaseInput>
        </div>
        <div class="form-group">
          <BaseInput
            :form="form"
            inputType="text"
            field="username"
            v-model.trim="form.username"
            placeholder="Username"
          ></BaseInput>
        </div>
        <div class="form-group">
          <BaseInput
            :form="form"
            inputType="email"
            field="email"
            v-model.trim="form.email"
            placeholder="Email"
          ></BaseInput>
        </div>
        <div class="form-group">
          <BaseInput
            :form="form"
            inputType="password"
            field="password"
            v-model.trim="form.password"
            placeholder="Password"
          ></BaseInput>
        </div>
        <div class="form-group">
          <BaseInput
            :form="form"
            inputType="password"
            field="password_confirmation"
            v-model.trim="form.password_confirmation"
            placeholder="Confirm Password"
          ></BaseInput>
        </div>

        <div class="text-right">
          <BaseButton :loading="form.busy">Register</BaseButton>
        </div>
        <div class="mt-4 mb-4 clearfix">
          <p class="font-16 fw-500 mt-2 mb-2">Register with</p>
          <SocialLogin />
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          Already have an account?
          <nuxt-link :to="{ name: 'login' }" class="color-blue"
            >Login</nuxt-link
          >
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import SocialLogin from '@/components/SocialLogin';
import { mapGetters } from 'vuex';
import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'
export default {
  middleware: ['guest'],
  name: 'register',
  components: { SocialLogin, BaseInput, BaseButton },
  data() {
    return {
      form: this.$vform({
        username: '',
        name: '',
        email: '',
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
    errorMessage(){
      return this.$route.query.message ? this.$route.query.message : '';
    }
  },

  methods: {
    submit() {
      this.form
        .post(`/register`)
        .then((res) => {
          const id = res.data.id;
          this.$store.dispatch('unlogged/saveUnloggedUserInfo', id )
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
