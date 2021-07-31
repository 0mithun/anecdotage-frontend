<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="threadsAssignToUserTitle">
      <div class="form-group row">
        <label for="assign_user_title" class="col-sm-4 col-form-label"
          >Assign items to specific user every thread, if body contains</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="assign_title"
            size="form-control-sm"
            field="assign_user_title"
            inputType="text"
            v-model="assign_title.assign_user_title"
            id="assign_user_title"
            placeholder="Enter title text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="assign_title"
            size="form-control-sm"
            field="assign_user_title_username"
            inputType="text"
            v-model="assign_title.assign_user_title_username"
            id="assign_user_title_username"
            placeholder="Enter username"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="assign_title.busy" size="sm" type="dark">
            Assign User
          </BaseButton>
        </div>
      </div>
    </form>
    <form @submit.prevent="threadsAssignToUserBody">
      <div class="form-group row">
        <label for="assign_user_body" class="col-sm-4 col-form-label"
          >Assign items to specific user every thread, if body contains</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="assign_body"
            size="form-control-sm"
            field="assign_user_body"
            inputType="text"
            v-model="assign_body.assign_user_body"
            id="assign_user_body"
            placeholder="Enter body text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="assign_body"
            size="form-control-sm"
            field="assign_user_body_username"
            inputType="text"
            v-model="assign_body.assign_user_body_username"
            id="assign_user_body_username"
            placeholder="Enter username"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="assign_body.busy" size="sm" type="primary">
            Assign User
          </BaseButton>
        </div>
      </div>
    </form>
    <form @submit.prevent="threadsAssignToUsertag">
      <div class="form-group row">
        <label for="assign_user_tag" class="col-sm-4 col-form-label"
          >Assign items to specific user every thread, if tag contains</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="assign_tag"
            size="form-control-sm"
            field="assign_user_tag"
            inputType="text"
            v-model="assign_tag.assign_user_tag"
            id="assign_user_tag"
            placeholder="Enter tag text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="assign_tag"
            size="form-control-sm"
            field="assign_user_tag_username"
            inputType="text"
            v-model="assign_tag.assign_user_tag_username"
            id="assign_user_tag_username"
            placeholder="Enter username"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="assign_tag.busy" size="sm" type="success">
            Assign User
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
      assign_title: this.$vform({
        assign_user_title: '',
        assign_user_title_username: '',
      }),
       assign_body: this.$vform({
        assign_user_body: '',
        assign_user_body_username: '',
      }),
      assign_tag: this.$vform({
        assign_user_tag: '',
        assign_user_tag_username: '',
      }),
    };
  },
  methods: {
    async threadsAssignToUserTitle(){
      try {
        await this.assign_title.post(`admin/batch-tool/threads/assign-to-user-threads-title`, this.assign_title);
        this.assign_title.assign_user_title = '';
        this.assign_title.assign_user_title_username = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Assign Successfully',
        });
      } catch (e) {}
    },
    async threadsAssignToUserBody(){
      try {
        await this.assign_body.post(`admin/batch-tool/threads/assign-to-user-threads-body`, this.assign_body);
        this.assign_body.assign_user_body = '';
        this.assign_body.assign_user_body_username = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Assign Successfully',
        });
      } catch (e) {}
    },
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


