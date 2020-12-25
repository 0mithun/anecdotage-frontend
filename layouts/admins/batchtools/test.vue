<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="un_banned_all_users">
      <div class="form-group row">
        <label class="col-sm-9 col-form-label"
          >Un banned all users	</label
        >
        <div class="col-sm-3">
          <base-button :loading="un_banned_all_users.busy" size="sm" type="info">
            Un Banned
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
      un_banned_all_users: this.$vform({
      }),
    };
  },

  methods: {
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
  .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-6, .col-sm-7{
    padding: 0px 5px;
  }
</style>


