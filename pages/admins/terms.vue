<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <div class="col-sm-12">
            <vue-ckeditor v-model="form.tos" :config="config" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-12">
            <BaseButton :loading="form.busy"> Update Terms </BaseButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import updateSettings from '@/mixins/admin/updateSettings'
import BaseButton from '@/components/form/buttons/BaseButton'
export default {
  components:{
    BaseButton
  },
  mixins: [updateSettings],
  data() {
    return {
      form: this.$vform({
        tos: '',
      }),
      message: 'Terms Update Successfully',
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
