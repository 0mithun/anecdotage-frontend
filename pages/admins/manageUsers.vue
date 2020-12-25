<template>
  <div>
    <BanAllUsers />
    <BanSingleUser />
  </div>
</template>

<script>
import BanAllUsers from '@/layouts/admins/users/BanAllUsers'
import BanSingleUser from '@/layouts/admins/users/BanSingleUser'
  export default {
    components:{
      BanAllUsers,
      BanSingleUser
    }
  }
</script>

<style lang="scss" scoped>

</style>
