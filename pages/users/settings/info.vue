<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label">Full name</label>
          <div class="col-sm-8">
            <BaseInput
              :form="form"
              field="name"
              inputType="text"
              v-model="form.name"
              id="name"
              placeholder="Enter Full Name"
            ></BaseInput>
          </div>
        </div>
        <div class="form-group row">
          <label for="date_of_birth" class="col-sm-4 col-form-label"
            >Date of Birth</label
          >
          <div class="col-sm-8">
            <BaseInput
              :form="form"
              field="date_of_birth"
              inputType="date"
              v-model="form.date_of_birth"
              id="date_of_birth"
              placeholder="Date of Birth"
            ></BaseInput>
          </div>
        </div>
        <div class="form-group row">
          <label for="formatted_address" class="col-sm-4 col-form-label"
            >Address</label
          >
          <div class="col-sm-8">
            <BaseInput
              :form="form"
              field="formatted_address"
              inputType="text"
              v-model="form.formatted_address"
              id="formatted_address"
              placeholder="Enter your address"
            ></BaseInput>
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label">About</label>
          <div class="col-sm-8">
            <base-textarea
              :form="form"
              field="about"
              v-model="form.about"
              id="about"
            ></base-textarea>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-8 offset-sm-4">
            <BaseButton :loading="form.busy"> Update </BaseButton>
          </div>
        </div>
      </form>
    </div>
    <div class="col-md-12" v-if="!user.is_admin">
      <hr>
      <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label">Delete My Account</label>
          <div class="col-sm-8">
            <form @submit.prevent="deleteInfo">
              <p>This will delete your account and everything in it with the exception of any anecdotes you have posted. Your anecdotes can be deleted from their individual pages. Otherwise, they will be attributed to "Anonymous." </p>
              <br>
              <BaseButton :loading="delete_form.busy" type="danger">Delete My Account</BaseButton>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'
import BaseTextarea from '@/components/form/inputs/BaseTextarea'
import swal from '@/mixins/swal'
export default {
  mixins: [swal],
  components: {BaseButton, BaseInput, BaseTextarea},
  data() {
    return {
      form: this.$vform({
        name: '',
        date_of_birth: '',
        formatted_address: '',
        about: '',
      }),
      delete_form: this.$vform({
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
        const user = await this.form.put(`settings/profile`, this.form);
        await this.$auth.fetchUser();
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Profile Update Successfully',
        });
      } catch (e) {}
    },

    deleteInfo() {
        this.$swal({
          title: 'Are you sure?',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if(willDelete){
            this.delete();
          }
          return;
        });
    },
    async delete(){
      try {
        const user = await this.form.post(`user/${this.$auth.user.username}/delete-info`);
        this.$toast.open({
            type: 'success',
            position: 'top-right',
            message: 'Your account delete successfully.',
          });
        setTimeout(() => {
           this.$router.push({ name: 'index' });
        }, 2000);
      } catch (error) {

      }
    }
  },
  mounted() {
    Object.keys(this.form).forEach((k) => {
      if (this.user.hasOwnProperty(k)) {
        this.form[k] = this.user[k];
      }
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
