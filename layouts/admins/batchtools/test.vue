<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="threadsAssignToUsertag">
      <div class="form-group row">
        <label for="assign_user_tag" class="col-sm-4 col-form-label"
          >assign items to specific user every thread, if tag contains</label
        >
        <div class="col-sm-3">
          <base-input
            :form="assign_tag"
            size="form-control-sm"
            field="assign_user_tag"
            inputType="text"
            v-model="assign_tag.assign_user_tag"
            id="assign_user_tag"
            placeholder="Enter tag text"
          ></base-input>
        </div>
        <div class="col-sm-3">
          <base-input
            :form="assign_tag"
            size="form-control-sm"
            field="assign_user_tag_username"
            inputType="text"
            v-model="assign_tag.assign_user_tag_username"
            id="assign_user_tag_username"
            placeholder="Enter username"
          ></base-input>
        </div>
        <div class="col-sm-2">
          <base-button :loading="assign_tag.busy" size="sm" type="dark">
            Assign User
          </base-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assign_tag: this.$vform({
        assign_user_tag: '',
        assign_user_tag_username: '',
      }),
    };
  },
  methods: {
    async threadsAssignToUsertag(){
      try {
        await this.assign_tag.post(`admin/batch-tool/threads/assign-to-user-threads-tag`, this.assign_tag);
        this.assign_tag.assign_user_tag = '';
        this.assign_tag.assign_user_tag_username = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Assign Successfully',
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


