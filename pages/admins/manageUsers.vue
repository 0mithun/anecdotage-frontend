<template>
  <div>
    <BanAllUsers />
    <BanSingleUser />
  </div>
</template>

<script>
import BanAllUsers from '@/layouts/admins/users/BanAllUsers';
import BanSingleUser from '@/layouts/admins/users/BanSingleUser';
import { mapGetters } from 'vuex';
export default {
  components: {
    BanAllUsers,
    BanSingleUser,
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
  },
};
</script>

<style lang="scss" scoped>
</style>
