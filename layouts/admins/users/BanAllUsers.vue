<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="banAllUsersTitle">
      <div class="form-group row">
        <label for="ban_users_title" class="col-sm-4 col-form-label"
          >Banned all users: if thread title contains	</label
        >
        <div class="col-sm-2">
          <BaseInput
            :form="ban_users_title"
            size="form-control-sm"
            field="ban_users_title"
            inputType="text"
            v-model="ban_users_title.ban_users_title"
            id="ban_users_title"
            placeholder="Enter title text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <select name="" id="" class="form-control form-control-sm" v-model="ban_users_title.ban_users_title_type" :class="[{ 'is-invalid': ban_users_title.errors.has('ban_users_title_type') }]">
            <option value="">Select Type</option>
            <option value="2">Temporary</option>
            <option value="1">Permanent</option>
          </select>
          <has-error :form="ban_users_title" field="ban_users_title_type"></has-error>
        </div>
        <div class="col-sm-2">
          <BaseInput
            :form="ban_users_title"
            size="form-control-sm"
            field="ban_users_title_days"
            inputType="number"
            v-model="ban_users_title.ban_users_title_days"
            id="ban_users_title_days"
            placeholder="Enter Day"
            :disabled="isTitleDayDisabled"
          ></BaseInput>
        </div>

        <div class="col-sm-2">
          <BaseButton :loading="ban_users_title.busy" size="sm" type="danger">
            Ban User
          </BaseButton>
        </div>
      </div>
    </form>
    <form @submit.prevent="banAllUsersBody">
      <div class="form-group row">
        <label for="ban_users_body" class="col-sm-4 col-form-label"
          >Banned all users: if thread body contains	</label
        >
        <div class="col-sm-2">
          <BaseInput
            :form="ban_users_body"
            size="form-control-sm"
            field="ban_users_body"
            inputType="text"
            v-model="ban_users_body.ban_users_body"
            id="ban_users_body"
            placeholder="Enter body text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <select name="" id="" class="form-control form-control-sm" v-model="ban_users_body.ban_users_body_type" :class="[{ 'is-invalid': ban_users_body.errors.has('ban_users_body_type') }]">
            <option value="">Select Type</option>
            <option value="2">Temporary</option>
            <option value="1">Permanent</option>
          </select>
          <has-error :form="ban_users_body" field="ban_users_body_type"></has-error>
        </div>
        <div class="col-sm-2">
          <BaseInput
            :form="ban_users_body"
            size="form-control-sm"
            field="ban_users_body_days"
            inputType="number"
            v-model="ban_users_body.ban_users_body_days"
            id="ban_users_body_days"
            placeholder="Enter Day"
            :disabled="isbodyDayDisabled"
          ></BaseInput>
        </div>

        <div class="col-sm-2">
          <BaseButton :loading="ban_users_body.busy" size="sm" type="danger">
            Ban User
          </BaseButton>
        </div>
      </div>
    </form>
     <form @submit.prevent="banAllUserstag">
      <div class="form-group row">
        <label for="ban_users_tag" class="col-sm-4 col-form-label"
          >Banned all users: if thread tag contains	</label
        >
        <div class="col-sm-2">
          <BaseInput
            :form="ban_users_tag"
            size="form-control-sm"
            field="ban_users_tag"
            inputType="text"
            v-model="ban_users_tag.ban_users_tag"
            id="ban_users_tag"
            placeholder="Enter tag name"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <select name="" id="" class="form-control form-control-sm" v-model="ban_users_tag.ban_users_tag_type" :class="[{ 'is-invalid': ban_users_tag.errors.has('ban_users_tag_type') }]">
            <option value="">Select Type</option>
            <option value="2">Temporary</option>
            <option value="1">Permanent</option>
          </select>
          <has-error :form="ban_users_tag" field="ban_users_tag_type"></has-error>
        </div>
        <div class="col-sm-2">
          <BaseInput
            :form="ban_users_tag"
            size="form-control-sm"
            field="ban_users_tag_days"
            inputType="number"
            v-model="ban_users_tag.ban_users_tag_days"
            id="ban_users_tag_days"
            placeholder="Enter Day"
            :disabled="istagDayDisabled"
          ></BaseInput>
        </div>

        <div class="col-sm-2">
          <BaseButton :loading="ban_users_tag.busy" size="sm" type="danger">
            Ban User
          </BaseButton>
        </div>
      </div>
    </form>
    <form @submit.prevent="unBanAllUsers">
      <div class="form-group row">
        <label class="col-sm-9 col-form-label"
          >Un banned all users	</label
        >
        <div class="col-sm-3">
          <BaseButton :loading="un_banned_all_users.busy" size="sm" type="warning">
            Unbanned all users
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
      ban_users_title: this.$vform({
        ban_users_title: '',
        ban_users_title_type: '',
        ban_users_title_days: '',
      }),
      ban_users_body: this.$vform({
        ban_users_body: '',
        ban_users_body_type: '',
        ban_users_body_days: '',
      }),
      ban_users_tag: this.$vform({
        ban_users_tag: '',
        ban_users_tag_type: '',
        ban_users_tag_days: '',
      }),
      un_banned_all_users: this.$vform({
      }),
    };
  },
  computed:{
    isTitleDayDisabled(){
      return this.ban_users_title.ban_users_title_type != 2;
    },
     isbodyDayDisabled(){
      return this.ban_users_body.ban_users_body_type != 2;
    },
     istagDayDisabled(){
      return this.ban_users_tag.ban_users_tag_type != 2;
    }
  },
  methods: {
    async banAllUsersTitle(){
      try {
        const res = await this.ban_users_title.post(`admin/manage-users/threads/ban-users-title`, this.ban_users_title);
        console.log(res)

         this.ban_users_title.ban_users_title = '';
         this.ban_users_title.ban_users_title_type = '';
         this.ban_users_title.ban_users_title_days = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Users Ban Successfully',
        });
      } catch (e) {}
    },
    async banAllUsersBody(){
      try {
        await this.ban_users_body.post(`admin/manage-users/threads/ban-users-body`, this.ban_users_body);
         this.ban_users_body.ban_users_body = '';
         this.ban_users_body.ban_users_body_type = '';
         this.ban_users_body.ban_users_body_days = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Users Ban Successfully',
        });
      } catch (e) {}
    },
    async banAllUserstag(){
      try {
        await this.ban_users_tag.post(`admin/manage-users/threads/ban-users-tag`, this.ban_users_tag);
         this.ban_users_tag.ban_users_tag = '';
         this.ban_users_tag.ban_users_tag_type = '';
         this.ban_users_tag.ban_users_tag_days = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Users Ban Successfully',
        });
      } catch (e) {}
    },
    async unBanAllUsers(){
      try {
        const res = await this.un_banned_all_users.post(`admin/manage-users/threads/ban-users-title`);
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Users unbanned Successfully',
        });
      } catch (e) {}
    },

  },
};
</script>

<style lang="scss" scoped>
  .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-6, .col-sm-7, .col-sm-9{
    padding: 0px 5px;
  }
</style>


