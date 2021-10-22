<template>
  <section class="authentication">
    <div></div>
    <div class="auth-body">
      <div></div>
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">Login</h1>
      <form class="auth-form" @submit.prevent="submit">
        <div class="alert alert-danger" v-if="errorMessage != ''">
          {{ errorMessage }}
        </div>
        <alert-error v-if="form.errors.has('message')" :form="form">
          {{ form.errors.get('message') }}
          <nuxt-link :to="{ name: 'verification.resend' }"
            >Resend verification email</nuxt-link
          >
        </alert-error>
        <div class="form-group">
          <BaseInput
            :form="form"
            field="email"
            v-model="form.email"
            placeholder="Email"
          ></BaseInput>
        </div>
        <div class="form-group">
          <BaseInput
            :form="form"
            field="password"
            inputType="password"
            v-model="form.password"
            placeholder="Password"
          ></BaseInput>
        </div>
        <div class="mt-4 mb-4 clearfix">
          <nuxt-link
            to="/password/email"
            class="forgot-pass color-blue font-14 fw-400"
          >
            Forgot password?
          </nuxt-link>
        </div>
        <div class="text-right">
          <BaseButton :loading="form.busy"> Login </BaseButton>
        </div>
        <div class="mt-4 mb-4 clearfix">
          <p class="font-16 fw-500 mt-2 mb-2">Login with</p>
          <SocialLogin />
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          Don't have an account yet?
          <nuxt-link :to="{ name: 'register' }" class="color-blue">
            Create an account
          </nuxt-link>
        </p>
      </form>
      <div></div>
    </div>
    <div></div>
  </section>
</template>

<script>
import SocialLogin from '@/components/SocialLogin';
import { mapGetters } from 'vuex';
import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'
export default {
  middleware: ['guest'],
  name: 'login',
  components: { SocialLogin, BaseButton, BaseInput },
  data() {
    return {
      form: this.$vform({
        email: '',
        password: '',
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
      this.$auth
        .loginWith('local', {
          data: this.form,
        })
        .then((res) => {
          // this.form.reset();
          // console.log(res)
          const route = localStorage.getItem('privacy-redirect-route');
          this.$store.dispatch('unlogged/saveUnloggedUserInfo', this.$auth.user.id )

          if(route){
            localStorage.removeItem('privacy-redirect-route');
            this.$router.push({name:route, params: {username:this.$auth.user.username}})
          }
        })
        .catch((e) => {
          this.form.errors.set(e.response.data.errors);
        });
    },
  },
};
</script>

<style></style>
