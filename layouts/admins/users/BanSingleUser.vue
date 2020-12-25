<template>
  <div class=" mt-2">
    <form @submit.prevent="banSingleUser">
      <div class="form-group row">
        <label for="ban_user_username" class="col-sm-3 col-form-label"
          >Ban single user	</label
        >
        <div class="col-sm-2">
          <base-input
            :form="ban_single_user"
            size="form-control-sm"
            field="ban_user_username"
            inputType="text"
            v-model="ban_single_user.ban_user_username"
            id="ban_user_username"
            placeholder="Enter username"
          ></base-input>
        </div>
        <div class="col-sm-3">
          <select name="" id="" class="form-control form-control-sm" v-model="ban_single_user.ban_user_type" :class="[{ 'is-invalid':ban_single_user.errors.has('ban_user_type') }]">
            <option value="">Select Type</option>
            <option value="2">Temporary</option>
            <option value="1">Permanent</option>
          </select>
          <has-error :form="ban_single_user" field="ban_user_type"></has-error>
        </div>
        <div class="col-sm-2">
          <base-input
            :form="ban_single_user"
            size="form-control-sm"
            field="ban_user_days"
            inputType="number"
            v-model="ban_single_user.ban_user_days"
            id="ban_user_days"
            placeholder="Enter Day"
            :disabled="isTitleDayDisabled"
          ></base-input>
        </div>

        <div class="col-sm-2">
          <base-button :loading="ban_single_user.busy" size="sm" type="danger">
            Ban User
          </base-button>
        </div>
      </div>
    </form>

    <form @submit.prevent="unBanSingleUser">
      <div class="form-group row">
        <label class="col-sm-6 col-form-label" for="unban_user_username"
          >Un-Ban single user	</label
        >
        <div class="col-sm-3">
           <base-input
            :form="un_banned_single_user"
            size="form-control-sm"
            field="unban_user_username"
            inputType="text"
            v-model="un_banned_single_user.unban_user_username"
            id="unban_user_username"
            placeholder="Enter username"
          ></base-input>
        </div>
        <div class="col-sm-3">
          <base-button :loading="un_banned_single_user.busy" size="sm" type="warning">
            Unbanned user
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
      ban_single_user: this.$vform({
        ban_user_username: '',
        ban_user_type: '',
        ban_user_days: '',
      }),
      un_banned_single_user: this.$vform({
        unban_user_username: '',
      }),
    };
  },
  computed:{
    isTitleDayDisabled(){
      return this.ban_single_user.ban_user_type != 2;
    },
  },
  methods: {
    async banSingleUser(){
      try {
        const res = await this.ban_single_user.post(`admin/manage-users/threads/ban-single-user`, this.ban_single_user);
        console.log(res)

         this.ban_single_user.ban_user_username = '';
         this.ban_single_user.ban_user_type = '';
         this.ban_single_user.ban_user_days = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'User Ban Successfully',
        });
      } catch (e) {}
    },

    async unBanSingleUser(){
      try {
        const res = await this.un_banned_single_user.post(`admin/manage-users/threads/unban-single-user`, this.un_banned_single_user);
        this.un_banned_single_user.unban_user_username
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'User unbanned Successfully',
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


