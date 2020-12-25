<template>
  <div class="">
      <SetAgeThirteen />
      <SetAgeEighteen />
    <ReplaceText />
    <DeleteThreads />
    <AddTag />
    <ModifyTag />
    <AddEmoji />
    <AddFamous />
    <RelaceSource />
    <AssignToUer />
  </div>
</template>

<script>
import SetAgeThirteen from '@/layouts/admins/batchtools/SetAgeThirteen'
import SetAgeEighteen from '@/layouts/admins/batchtools/SetAgeEighteen'
import ReplaceText from '@/layouts/admins/batchtools/ReplaceText'
import DeleteThreads from '@/layouts/admins/batchtools/DeleteThreads'
import AddTag from '@/layouts/admins/batchtools/AddTag'
import ModifyTag from '@/layouts/admins/batchtools/ModifyTag'
import AddEmoji from '@/layouts/admins/batchtools/AddEmoji'
import AddFamous from '@/layouts/admins/batchtools/AddFamous'
import RelaceSource from '@/layouts/admins/batchtools/ReplaceSource'
import AssignToUer from '@/layouts/admins/batchtools/AssignToUser'
export default {
  components:{
    SetAgeThirteen,
    SetAgeEighteen,
    ReplaceText,
    DeleteThreads,
    AddTag,
    ModifyTag,
    AddEmoji,
    AddFamous,
    RelaceSource,
    AssignToUer
  }
};
</script>

<style lang="scss" scoped>

</style>


