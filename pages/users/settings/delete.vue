<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="deleteInfo">
        <div class="form-group row"></div>
        <div class="form-group row">
            <BaseButton :loading="form.busy" type="danger">Delete my anecdotes </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '@/components/form/buttons/BaseButton'
import swal from '@/mixins/swal'
export default {
  mixins: [swal],
  components:{
    BaseButton
  },
  data() {
    return {
      form: this.$vform({

      })
    }
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
        const user = await this.form.post(`user/${this.user.username}/delete-info`);
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

};
</script>

<style lang="scss" scoped>
.form-check {
  padding-left: 0;
}
h3 {
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
