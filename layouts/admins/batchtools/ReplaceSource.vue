<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="threadsSourceReplace">
      <div class="form-group row">
        <label for="old_source" class="col-sm-4 col-form-label"
          >Source search & replace every thread, in source replace</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="replace_source"
            size="form-control-sm"
            field="old_source"
            inputType="text"
            v-model="replace_source.old_source"
            id="old_source"
            placeholder="Enter Old Source"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="replace_source"
            size="form-control-sm"
            field="new_source"
            inputType="text"
            v-model="replace_source.new_source"
            id="new_source"
            placeholder="Enter New Source"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="replace_source.busy" size="sm" type="info">
            Replace
          </BaseButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'

export default {
  components: {BaseInput, BaseButton},
  data() {
    return {
      replace_source: this.$vform({
        old_source: '',
        new_source: '',
      }),
    };
  },
  methods: {
    async threadsSourceReplace(){
      try {
       await this.replace_source.post(`admin/batch-tool/threads/replace-source`, this.replace_source);
         this.replace_source.old_source = '';
         this.replace_source.new_source = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Source Replace Successfully',
        });
      } catch (e) {}
    },

  },
};
</script>

<style lang="scss" scoped>
  .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-6, .col-sm-7{
    padding: 0px 5px;
  }
</style>


