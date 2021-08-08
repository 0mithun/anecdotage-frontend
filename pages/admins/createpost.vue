<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="createPost">
        <div class="form-group row">
          <label for="tag_name" class="col-sm-4 col-form-label"
            >Tag Name:</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="tag_name"
              placeholder="Tag Name"
              v-model="form.tag_name"
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-8 offset-sm-4">
            <BaseButton :loading="form.busy"> Create Post </BaseButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/form/buttons/BaseButton'
export default {
  components:{
    BaseButton
  },
  data() {
    return {
      form: this.$vform({
        tag_name: ''
      })
    };
  },
  methods: {
    createPost(){
      //
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
